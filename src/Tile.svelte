<script>
  export let tile, position, size, screenSize;
  let canvas;

  let rendered = false;
  let visible = false;
  $: visible =
    rendered &&
    size.x >= 1 &&
    size.y >= 1 &&
    -size.x < position.x &&
    position.x < screenSize.x &&
    -size.y < position.y &&
    position.y < screenSize.y;

  $: if (canvas) {
    tile.loadOnCanvas(canvas).then(() => {
      rendered = true;
    });
  }

  let style = "";
  $: style = !visible ? "" : [
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
