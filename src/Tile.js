import Point from './Point.js'
import * as Comlink from 'comlink';
import balancer from './async_load_balancer.js';

const NUM_THREADS = navigator.hardwareConcurrency || 4;
const workers = Array(NUM_THREADS).fill().map(_ =>
	Comlink.wrap(new Worker("mandelbrot.js")).mandelbrot_pixels
);
const mandelbrot_pixels = balancer(workers, false);

export default class Tile {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.size = Tile.TILE_SIZE;
		this.zoom = 2 ** this.z;
		this.scale = this.size / this.zoom;
		this.position = new Point(this.x, this.y).scale(this.scale);
		this.canvas = null;
	}
	async loadOnCanvas(canvas) {
		if (this.canvas === canvas) return;
		this.canvas = canvas;
		let ctx = canvas.getContext("2d");
		let size = new Point(this.size, this.size);
		let pxs = await mandelbrot_pixels(this.position, this.zoom, size);
		let idata = new ImageData(pxs, size.x, size.y);
		ctx.putImageData(idata, 0, 0);
	}
}
Tile.TILE_SIZE = 256;
