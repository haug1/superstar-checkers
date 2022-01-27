<template>
  <div
    :key="`piece-${piece.id}`"
    class="piece"
    :style="{
      background: piece.team,
      top: piece.position.y * topSkew + heightOffset + 'px',
      left: piece.position.x * leftSkew + widthOffset + 'px',
      width: width + 'px',
      height: height + 'px',
      borderRadius: '100px',
    }"
    @click="onClick"
  />
</template>

<script lang="ts">
import { IPiece } from "@/types";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "Piece",
})
export default class Piece extends Vue {
  @Prop({ required: true })
  piece!: IPiece;
  @Prop({ required: true })
  pointWidth!: number;
  @Prop({ required: true })
  pointHeight!: number;

  get height(): number {
    return this.pointHeight - this.heightOffset * 2;
  }

  get width(): number {
    return this.pointWidth - this.widthOffset * 2;
  }

  get widthOffset(): number {
    return this.pointWidth / 20;
  }

  get heightOffset(): number {
    return this.pointHeight / 20;
  }

  get leftSkew(): number {
    return this.pointWidth / 1.9;
  }

  get topSkew(): number {
    return this.pointHeight / 1.1;
  }

  onClick(): void {
    this.$emit("click", this.piece);
  }
}
</script>
