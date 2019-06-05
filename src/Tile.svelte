<script>
  export let tile, position, size;
  let canvas;
  let rendered = false;
  $: if (canvas) {
    tile.loadOnCanvas(canvas).then(() => {
      rendered = true;
    });
  }
  let style;
  $: style = [
    `left:${Math.floor(position.x)}px`,
    `top:${Math.floor(position.y)}px`,
    `width:${Math.ceil(size.x)}px`,
    `height:${Math.ceil(size.y)}px`
  ].join(";");
</script>

<style>
  .tile {
    position: absolute;
    display:none;
  }
  .tile.rendered {
    display: block;
  }
</style>

{#if size.x > 1 && size.y > 1}
  <canvas
    class="tile"
    class:rendered
    bind:this={canvas}
    {style}
    width={tile.size.x}
    height={tile.size.y} />
{/if}
