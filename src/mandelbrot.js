import gpalette from 'google-palette';
import * as Comlink from 'comlink';

function mandelbrot(cx, cy, maxIters) {
    if (testBulb(cx, cy) || testCardioid(cx, cy)) return maxIters;
    let i, xs = cx * cx, ys = cy * cy, x = cx, y = cy;
    for (i = 0; i < maxIters && xs + ys < 4; i++) {
        let x0 = x;
        x = xs - ys + cx;
        y = 2 * x0 * y + cy;
        xs = x * x;
        ys = y * y;
    }
    return i;
}

function testCardioid(x, y) {
    const a = (x - 1 / 4);
    const q = a * a + y * y;
    return q * (q + a) <= .25 * y * y;
}

function testBulb(x, y) {
    const a = x + 1;
    return a * a + y * y <= 1 / 16;
}

const PALETTE_SIZE = 256;
const palette = new Uint8ClampedArray(
    gpalette('tol-dv', PALETTE_SIZE)
        .flatMap(c =>
            c.match(/../g)
                .map(s => parseInt(s, 16))
                .concat(255) // alpha channel
        )
);

export function mandelbrot_pixels(point, zoom, size) {
    const maxIter = PALETTE_SIZE - 1;
    const pxs = new Uint8ClampedArray(size.x * size.y * 4);
    const ratio_x = 1 / zoom;
    const ratio_y = 1 / zoom;
    for (let i = 0; i < pxs.length; i += 4) {
        let idx = i / 4 | 0;
        let x = idx % size.x;
        let y = idx / size.x | 0;
        let px = point.x + x * ratio_x;
        let py = point.y + y * ratio_y;
        let n = mandelbrot(px, py, maxIter);
        n = (n * 4) % palette.length;
        pxs.set(palette.subarray(n, n + 4), i);
    }
    return Comlink.transfer(pxs, [pxs.buffer]);
}

Comlink.expose({ mandelbrot_pixels });