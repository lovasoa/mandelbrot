export default class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	plus(other) { return this.copy().add(other) }
	minus(other) { return this.copy().sub(other) }
	times(r) { return this.copy().scale(r) }
	add(other) {
		this.x += other.x;
		this.y += other.y;
		return this;
	}
	sub(other) {
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}
	scale(r) {
		this.x *= r;
		this.y *= r;
		return this;
	}
	copy() {
		return new Point(this.x, this.y)
	}
}