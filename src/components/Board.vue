<template>
  <div class="board-root">
    <template v-for="(xPoints, y) in board">
      <div
        class="y-container"
        :key="y"
        :style="{
          width: `${6.25 * xPoints.length}%`,
          margin: 'auto',
        }"
      >
        <template v-for="x in xPoints">
          <div
            class="board-point"
            :key="`${x},${y}`"
            :id="`${x},${y}`"
            :style="{
              width: `${100 / xPoints.length}%`,
              opacity: isAvailableMove(x, y) ? 0.5 : 1,
            }"
            @click="() => onPointClicked({ x, y })"
          >
            <div
              v-if="uiPieces[y] && uiPieces[y][x]"
              class="piece"
              :style="{ background: uiPieces[y][x].team }"
              @click="() => onPieceClicked(uiPieces[y][x])"
            />
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IMove, IPiece, IUIPieces, Team } from "@/types";
import { gameEngine } from "@/models/GameEngine";
import { isMoveAllowed, newMove } from "@/utils/move-utils";
import { Position } from "vue-router/types/router";
import { BOARD_COORDS } from "@/constants";

@Component
export default class NewBoard extends Vue {
  board = BOARD_COORDS;
  selectedPiece: IPiece | null = null;

  get uiPieces(): IUIPieces {
    const result: IUIPieces = {};
    gameEngine.state.pieces.forEach((piece) => {
      if (!result[piece.position.y]) result[piece.position.y] = {};
      result[piece.position.y][piece.position.x] = piece;
    });
    return result;
  }

  get allAvailableMoves(): IMove[] {
    return gameEngine.getAllAvailableMoves();
  }

  get selectedAvailableMoves(): IMove[] {
    return this.allAvailableMoves.filter(
      (m) => m.piece.id === this.selectedPiece?.id
    );
  }

  get currentTeam(): Team {
    return gameEngine.state.currentTeam;
  }

  isAvailableMove(x: number, y: number): boolean {
    return this.selectedAvailableMoves.some(
      (move) => move.to.x === x && move.to.y === y
    );
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
    if (!gameEngine.state.gameStarted) {
      gameEngine.startGame();
    }
  }
}
</script>

<style lang="scss" scoped>
.y-container {
  display: flex;
  flex-direction: row;
  margin: auto;
  gap: 0.5%;
}

.board-point {
  border: 0.2vh solid black;
  background: rgb(46, 46, 46);
  aspect-ratio: 1 / 1;
  max-height: 4vh;
  border-radius: 100%;
}

.piece {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

@media only screen and (min-width: 1200px) {
  .board-root {
    margin: 0 auto;
    width: 90%;
  }
}

@media only screen and (min-width: 1400px) {
  .board-root {
    margin: 0 auto;
    width: 75%;
  }
}

@media only screen and (min-width: 1800px) {
  .board-root {
    margin: 0 auto;
    width: 50%;
  }
}
</style>
