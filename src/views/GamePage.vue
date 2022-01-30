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
  get winner(): Team | undefined {
    return gameEngine.state.winner;
  }

  restartGame(): void {
    gameEngine.startGame();
  }
}
</script>
