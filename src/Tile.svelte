<script>
  export let tile, pos, zoom, screenSize;
  let canvas;
  let position;
  let size;
  let rendered = false;
  let visible = false;

  $: position = tile.screenPosition(pos, zoom, screenSize);
  $: size = tile.dimensions.times(zoom);
  $: visible = rendered && tile.isVisible(pos, zoom, screenSize);

  $: if (canvas) {
    tile.loadOnCanvas(canvas).then(() => {
      rendered = true;
    });
  }

  let style = "";
  $: style = !visible
    ? ""
    : [
        `left:${Math.floor(position.x)}px`,
        `top:${Math.floor(position.y)}px`,
        `width:${Math.ceil(size.x)}px`,
        `height:${Math.ceil(size.y)}px`
      ].join(";");
</script>

<style>
  .tile {
    position: absolute;
    display: none;
  }
  .tile.visible {
    display: block;
  }
</style>

<canvas
  class="tile"
  class:visible
  bind:this={canvas}
  {style}
  width={tile.size.x}
  height={tile.size.y} />
