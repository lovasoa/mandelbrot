<script>
  import PanZoom from "./PanZoom.svelte";
  import Point from "./Point.js";
  import Tile from "./Tile.js";
  import TileElement from "./Tile.svelte";
  import About from "./About.svelte";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { readHash, setHash } from "./url_hash.js";

  const MIN_ZOOM = 250;
  const MAX_ZOOM = 1e16;

  let zoom = MIN_ZOOM;
  let pos = new Point(-0.5, 0); // Current position
  let size = new Point(0, 0); // Display size in pixels
  let el;

  function updateHash() {
    ({ pos, zoom } = readHash() || { pos, zoom });
  }
  updateHash();
  $: setHash(pos, zoom);

  function onPanZoom({ detail: { x, y, dx, dy, dz } }) {
    const oldZoom = zoom;
    zoom *= 1 - dz / 100;
    zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom));

    const p = new Point(x, y)
      .minus(size.times(1 / 2))
      .scale(1 / oldZoom - 1 / zoom);
    let delta = new Point(dx, dy).scale(-1 / zoom).add(p);
    pos = pos.add(delta);
  }

  const MAX_TILES = 2048;
  function updateTiles(tiles, zoom, pos, size) {
    const newIdxs = [];
    const z = Math.max(0, Math.ceil(Math.log2(zoom)));
    let min = pos
      .minus(size.times(1 / (2 * zoom)))
      .scale(2 ** z / Tile.TILE_SIZE);
    let max = pos
      .plus(size.times(1 / (2 * zoom)))
      .scale(2 ** z / Tile.TILE_SIZE);
    for (let i = Math.floor(min.x); i < max.x; i++) {
      for (let j = Math.floor(min.y); j < max.y; j++) {
        let idx = `${z},${i},${j}`;
        let tile = tiles.get(idx) || new Tile(i, j, z);
        tiles.set(idx, tile);
        newIdxs.push(idx);
      }
    }
    const allIdxs = Array.from(tiles)
      .filter(([idx, tile]) => tile.rendered)
      .map(([idx, tile]) => idx);
    allIdxs.splice(0, allIdxs.length + newIdxs.length - MAX_TILES);
    allIdxs.push(...newIdxs);
    allIdxs.sort(
      (a, b) => parseInt(a.split(",", 1)[0]) - parseInt(b.split(",", 1)[0])
    );
    return new Map(allIdxs.map(i => [i, tiles.get(i)]));
  }

  let tiles = new Map();

  $: tiles = updateTiles(tiles, zoom, pos, size);
</script>

<style>
  :global(body) {
    padding: 0;
    margin: 0;
  }
</style>

<PanZoom on:panzoom={onPanZoom} bind:size>
  {#each Array.from(tiles.entries()) as [idx, tile] (tile)}
    <TileElement
      {tile}
      x={(tile.position.x - pos.x) * zoom + size.x / 2}
      y={(tile.position.y - pos.y) * zoom + size.y / 2}
      w={tile.scale * zoom}
      h={tile.scale * zoom} />
  {/each}
</PanZoom>

<About />

<svelte:head>
  <meta
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0,
    user-scalable=no"
    name="viewport" />
  <title>Mandelbrot</title>
</svelte:head>

<svelte:window on:hashchange={updateHash} />
