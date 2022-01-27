<template>
  <div
    class="board"
    :style="{
      width: width + 'px',
      height: height + 'px',
    }"
  >
    <template v-for="x in X_AXIS">
      <template v-for="y in Y_AXIS">
        <BoardPoint
          v-if="isBoardPoint(x - 1, y - 1)"
          :key="`point-${x},${y}`"
          :x="x - 1"
          :y="y - 1"
          :width="pointWidth"
          :height="pointHeight"
          :showHighlight="isAvailableMove(x - 1, y - 1)"
          @click="onPointClicked"
        />
      </template>
    </template>
    <template v-for="piece in pieces">
      <Piece
        :key="`piece-${piece.id}`"
        :piece="piece"
        :pointHeight="pointHeight"
        :pointWidth="pointWidth"
        @click="onPieceClicked"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  X_AXIS_LENGTH,
  Y_AXIS_LENGTH,
  BOARD_COORDS,
} from "@/constants/board-consts";
import BoardPoint from "./BoardPoint.vue";
import Piece from "@/components/Piece.vue";
import { IMove, IPiece } from "@/types";
import { Position } from "vue-router/types/router";
import { gameEngine } from "@/models/GameEngine";
import { isMoveAllowed, newMove } from "@/utils/move-utils";

@Component({
  name: "Board",
  components: {
    BoardPoint,
    Piece,
  },
})
export default class Board extends Vue {
  @Prop({ required: true })
  width!: number;

  @Prop({ required: true })
  height!: number;

  X_AXIS = X_AXIS_LENGTH + 1;
  Y_AXIS = Y_AXIS_LENGTH + 1;

  selectedPiece: IPiece | null = null;

  get pieces(): IPiece[] {
    return gameEngine.state.pieces;
  }

  get pointWidth(): number {
    return (this.width / this.X_AXIS) * 1.8465;
  }

  get pointHeight(): number {
    return (this.height / this.Y_AXIS) * 1.095;
  }

  get allAvailableMoves(): IMove[] {
    return gameEngine.getAllAvailableMoves();
  }

  get selectedAvailableMoves(): IMove[] {
    return this.allAvailableMoves.filter(
      (piece) => piece.pieceId === this.selectedPiece?.id
    );
  }

  isAvailableMove(x: number, y: number): boolean {
    return this.selectedAvailableMoves.some(
      (move) => move.to.x === x && move.to.y === y
    );
  }

  isBoardPoint(x: number, y: number): boolean {
    return BOARD_COORDS.some(([rx, ry]) => rx === x && ry === y);
  }

  async onPointClicked(position: Position): Promise<void> {
    let selectedPiece: IPiece = this.selectedPiece || ({} as IPiece);
    const isAllowed =
      this.selectedPiece &&
      isMoveAllowed(position, this.selectedPiece, gameEngine.state.pieces);
    if (isAllowed) {
      const move = newMove(
        selectedPiece,
        position,
        gameEngine.getPieceAtPosition(isAllowed.capture)
      );
      await gameEngine.makeMove(selectedPiece, move);
      this.selectedPiece = null;
    }
  }

  onPieceClicked(piece: IPiece): void {
    if (gameEngine.state.currentTeam === piece.team) {
      this.selectedPiece = piece;
    }
  }

  mounted(): void {
    gameEngine.startGame();
  }
}
</script>

<style lang="scss">
.board {
  margin: 0 auto;
  position: relative;

  .piece {
    position: absolute;
  }
}
</style>
