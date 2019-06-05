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
		this.size = new Point(Tile.TILE_SIZE, Tile.TILE_SIZE);
		this.zoom = 2 ** this.z;
		this.dimensions = this.size.times(1 / this.zoom);
		this.position = new Point(this.x * this.dimensions.x, this.y * this.dimensions.y);
		this.canvas = null;
		this.rendered = false;
	}
	async loadOnCanvas(canvas) {
		if (this.canvas === canvas) return;
		this.canvas = canvas;
		let ctx = canvas.getContext("2d");
		let pxs = await mandelbrot_pixels(this.position, this.zoom, this.size);
		let idata = new ImageData(pxs, this.size.x, this.size.y);
		ctx.putImageData(idata, 0, 0);
		this.rendered = true;
	}

	screenPosition(pos, zoom, screenSize) {
		return this.position.minus(pos).scale(zoom).add(screenSize.times(.5));
	}

	isVisible(pos, zoom, screenSize) {
		const screenPosition = this.screenPosition(pos, zoom, screenSize);
		const size = this.dimensions.times(zoom);
		return size.x >= 1 &&
			size.y >= 1 &&
			-size.x < screenPosition.x &&
			screenPosition.x < screenSize.x &&
			-size.y < screenPosition.y &&
			screenPosition.y < screenSize.y;
	}
}
Tile.TILE_SIZE = 256;
