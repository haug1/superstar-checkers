<template>
  <Board :height="1200" :width="1050" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Board from "@/components/board/Board.vue";

@Component({
  components: {
    Board,
  },
})
export default class Game extends Vue {}
</script>
