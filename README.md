# Mandelbrot viewer

A [svelte](https://svelte.dev/) application to visualize the mandelbrot set.
[Try online](https://mandelbrot-svelte.netlify.com/).

## Screenshots

<table>
<tr><td>
<img width="100" height="100" alt="Screenshot 2019-06-04 at 23 08 55" src="https://user-images.githubusercontent.com/552629/58944904-053f2280-8783-11e9-942a-4e48783c6910.png">
<img width="100" height="100" alt="Screenshot 2019-06-04 at 23 10 12" src="https://user-images.githubusercontent.com/552629/58944441-294e3400-8782-11e9-91d4-2d0f659c637a.png">
<img width="100" height="100" alt="Screenshot 2019-06-04 at 23 18 36" src="https://user-images.githubusercontent.com/552629/58944442-294e3400-8782-11e9-8e32-bd6697a6ca51.png">
<img width="100" height="100" alt="Screenshot 2019-06-04 at 23 20 41" src="https://user-images.githubusercontent.com/552629/58944443-294e3400-8782-11e9-8e3c-12aed1099195.png">
<img width="100" height="100" alt="Screenshot 2019-06-04 at 23 22 21" src="https://user-images.githubusercontent.com/552629/58944444-29e6ca80-8782-11e9-8d07-3595244d691a.png">
<img width="100" height="100" alt="Screenshot 2019-06-04 at 23 28 11" src="https://user-images.githubusercontent.com/552629/58944445-29e6ca80-8782-11e9-9a17-e8abb81a9928.png">
<img width="100" height="100" alt="Screenshot 2019-06-04 at 23 34 01" src="https://user-images.githubusercontent.com/552629/58944446-29e6ca80-8782-11e9-9324-349e73b1809e.png">
<img width="100" height="100" alt="Screenshot 2019-06-04 at 23 35 46" src="https://user-images.githubusercontent.com/552629/58944447-29e6ca80-8782-11e9-891a-2f4101d32072.png">
<imgwidth="100" height="100" alt="Screenshot 2019-06-04 at 23 38 48" src="https://user-images.githubusercontent.com/552629/58944448-2a7f6100-8782-11e9-818a-3bd0a45c7c55.png">
<img width="100" height="100" alt="Screenshot 2019-06-05 at 00 01 02" src="https://user-images.githubusercontent.com/552629/58944449-2a7f6100-8782-11e9-8f59-fcc9485e1653.png">
<img width="100" height="100" alt="Screenshot 2019-06-05 at 00 13 24" src="https://user-images.githubusercontent.com/552629/58944453-2b17f780-8782-11e9-8518-0085b53feb4b.png">
<img width="100" height="100" alt="Screenshot 2019-06-05 at 00 14 13" src="https://user-images.githubusercontent.com/552629/58944454-2b17f780-8782-11e9-9ff6-68dffc5f8f06.png">
<img width="100" height="100" alt="Screenshot 2019-06-05 at 00 15 56" src="https://user-images.githubusercontent.com/552629/58944455-2b17f780-8782-11e9-8dad-89d7ad032f1e.png">
<img width="100" height="100" alt="Screenshot 2019-06-05 at 00 25 14" src="https://user-images.githubusercontent.com/552629/58944456-2bb08e00-8782-11e9-9da5-d9f6053837d3.png">
</tr>
</table>

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
