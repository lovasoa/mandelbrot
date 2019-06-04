<script>
  export let tile, position, size;
  let canvas;
  let style;
  $: if (canvas) tile.loadOnCanvas(canvas);
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
  }
</style>

{#if size.x > 1 && size.y > 1}
  <canvas
    class="tile"
    bind:this={canvas}
    {style}
    width={tile.size.x}
    height={tile.size.y} />
{/if}
