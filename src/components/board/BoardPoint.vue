<template>
  <div
    class="point"
    :style="{
      width: width + 'px',
      height: height + 'px',
      top: y * topSkew + 'px',
      left: x * leftSkew + 'px',
      background: showHighlight ? 'rgba(165, 54, 54, 0.568)' : 'black',
    }"
    @click="onClicked"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "BoardPoint",
  props: {
    x: Number,
    y: Number,
    height: Number,
    width: Number,
  },
})
export default class BoardPoint extends Vue {
  @Prop({ required: true })
  x!: number;
  @Prop({ required: true })
  y!: number;
  @Prop({ required: true })
  height!: number;
  @Prop({ required: true })
  width!: number;
  @Prop({ default: false, required: false })
  showHighlight!: boolean;

  get leftSkew(): number {
    return this.width / 1.9;
  }

  get topSkew(): number {
    return this.height / 1.1;
  }

  onClicked(): void {
    this.$emit("click", {
      x: this.x,
      y: this.y,
      height: this.height,
      width: this.width,
    });
  }
}
</script>

<style scoped lang="scss">
.point {
  position: absolute;
  color: white;
  border-radius: 1000px;
}
</style>
