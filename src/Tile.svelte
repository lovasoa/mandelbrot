<script>
  export let tile, x, y, w, h;
  let canvas;
  $: if (canvas) tile.loadOnCanvas(canvas);
</script>

<style>
  .tile {
    position: absolute;
  }
</style>

<canvas
  bind:this={canvas}
  style=" left: {Math.floor(x)}px; top: {Math.floor(y)}px; width: {Math.ceil(w)}px;
  height: {Math.ceil(h)}px; "
  class="tile"
  width={tile.size}
  height={tile.size} />
