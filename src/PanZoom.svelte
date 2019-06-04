<script>
  import panzoom from "pan-zoom/index.js";
  import Point from "./Point.js";
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  let el;
  export let size = new Point(0, 0);

  const dispatch = createEventDispatcher();

  onMount(_ => {
    return panzoom(el, e => {
      dispatch("panzoom", e);
    });
  });
</script>

<style>
  div {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    margin: auto;
    border: 0.5px solid grey;
  }
</style>

<div
  bind:this={el}
  draggable={false}
  bind:clientWidth={size.x}
  bind:clientHeight={size.y}>
  <slot />
</div>
