<template>
  <Board v-if="!winner" :height="boardHeight" :width="boardWidth" />
  <div v-else>
    <span>Game over. Congratulations to {{ winner }}</span>
    <button @click="restartGame">Play again</button>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import Board from "@/components/board/Board.vue";
import { gameEngine } from "@/models/GameEngine";
import { Team } from "@/types";
import { WindowSizeListener } from "@/mixins/WindowSizeListener";

const DEFAULT_BOARD_HEIGHT = 1200;
const DEFAULT_BOARD_WIDTH = 1050;
const WIDTH_TO_HEIGHT_RATIO = DEFAULT_BOARD_WIDTH / DEFAULT_BOARD_HEIGHT;
const HEIGHT_TO_WIDTH_RATIO = DEFAULT_BOARD_HEIGHT / DEFAULT_BOARD_WIDTH;

@Component({
  components: {
    Board,
  },
})
export default class Game extends WindowSizeListener {
  boardHeight = DEFAULT_BOARD_HEIGHT;
  boardWidth = DEFAULT_BOARD_WIDTH;

  get winner(): Team | undefined {
    return gameEngine.state.winner;
  }

  restartGame(): void {
    gameEngine.startGame();
  }

  calculateHeightFromWidth(width: number): number {
    return width * HEIGHT_TO_WIDTH_RATIO;
  }

  setFromWidth(width: number): void {
    const useWidth = width - 100;
    if (useWidth < 100) return;
    this.boardWidth = useWidth;
    this.boardHeight = this.calculateHeightFromWidth(useWidth);
  }

  calculateWidthFromHeight(height: number): number {
    return height * WIDTH_TO_HEIGHT_RATIO;
  }

  setFromHeight(height: number): void {
    const useHeight = height - 200;
    if (useHeight < 200) return;
    this.boardHeight = useHeight;
    this.boardWidth = this.calculateWidthFromHeight(useHeight);
  }

  @Watch("windowSize")
  onWindowSizeChanged(): void {
    if (this.boardWidth > this.windowSize.width) {
      this.setFromWidth(this.windowSize.width);
    } else if (this.boardHeight > this.windowSize.height) {
      this.setFromHeight(this.windowSize.height);
    } else if (
      this.windowSize.height > this.boardHeight &&
      this.calculateWidthFromHeight(this.windowSize.height) <
        this.windowSize.width
    ) {
      this.setFromHeight(this.windowSize.height);
    } else if (
      this.windowSize.width > this.boardWidth &&
      this.calculateHeightFromWidth(this.windowSize.width) <
        this.windowSize.height
    ) {
      this.setFromWidth(this.windowSize.width);
    }
  }
}
</script>
