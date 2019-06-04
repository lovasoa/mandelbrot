import Point from './Point.js';

export function readHash() {
    try {
        let params = decodeURIComponent(location.hash.slice(1));
        if (params) {
            let p = JSON.parse(params);
            p.pos = new Point(p.pos.x, p.pos.y);
            return p;
        }
    } catch (e) {
        console.log(e);
    }
}


let setHashTimeout = null;
export function setHash(pos, zoom) {
    clearTimeout(setHashTimeout);
    setHashTimeout = setTimeout(_ => {
        window.location.hash = JSON.stringify({ pos, zoom });
    }, 100);
}