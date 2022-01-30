<template>
  <Board v-if="!winner" />
  <div v-else>
    <span>Game over. Congratulations to {{ winner }}</span>
    <button @click="restartGame">Play again</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Board from "@/components/Board.vue";
import { gameEngine } from "@/state/GameEngine";
import { Team } from "@/types";

@Component({
  components: {
    Board,
  },
})
export default class Game extends Vue {
  get winner(): string | undefined {
    if (gameEngine.state.winner) {
      switch (gameEngine.state.winner) {
        case Team.BOTTOM:
          return "blue";
        case Team.LEFT_BOTTOM:
          return "red";
        case Team.LEFT_TOP:
          return "purple";
        case Team.TOP:
          return "white";
        case Team.RIGHT_TOP:
          return "yellow";
        case Team.RIGHT_BOTTOM:
          return "green";
      }
    }
    return undefined;
  }

  restartGame(): void {
    gameEngine.startGame();
  }
}
</script>
