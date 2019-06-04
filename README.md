# Mandelbrot viewer

A [svelte](https://svelte.dev/) application to visualize the mandelbrot set.
[Try online](https://mandelbrot-svelte.netlify.com/).

## How to compile

This is a svelte application, it needs to be compiled.

To develop: `npm run dev`.

To build: `npm run build` (the resulting files are in the `public` folder).

## Architecture

The fractal is split into square tiles.

Each tile has a position and a zoom level. Together, they determine which part of the fractal appears in the tile.
There is a factor two between consecutive zoom levels: if a tile at zoom level 1 represents a square of size 1 in the fractal, then a tile at zoom level 2 represents a square of size 0.5, a tile at level 3 a square of size 0.25, and so on.

When the user zooms in, the set of tiles required to view the fractal in full resolution at the new zoom level is determined,and the computation of these tiles is launched in parallel on all available processor cores. Old tiles are not deleted immediately, instead they are scaled according to the new zoom level (which is fast), and displayed before the new tiles are available. When the number of old tiles grows too high, an heuristic is used to determine which one to delete.

All of this allows for a very smooth scrolling and panning experience, which I have seen in no other web based renderer so far.