import Vue from "vue";
import Component from "vue-class-component";

@Component
export class WindowSizeListener extends Vue {
  windowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  onResize(): void {
    this.windowSize = { height: window.innerHeight, width: window.innerWidth };
  }

  mounted(): void {
    this.$nextTick(() => window.addEventListener("resize", this.onResize));
  }

  beforeDestroy(): void {
    window.removeEventListener("resize", this.onResize);
  }
}
