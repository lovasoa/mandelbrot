/**
 * Balances work between several asynchronous functions.
 * Given an array of async functions that make the same computation,
 * returns a single function that has the computation made by
 * the first idle function.
 * 
 * @template T,U
 * @param {((...args:T) => Promise<U>)[]} functions 
 * @param {boolean?} fifo Whether to process the arguments in fifo or lifo
 * @returns {(...args:T) => Promise<U>}
 * 
 * @example
 *  let f = n => (path) => fetch(`//server${n}.com/${path}`)
 *  let balanced = balance([f(1), f(2)]);
 *  balanced("x") // fetches server2.com/x
 *  balanced("y") // fetches server1.com/y
 *  balanced("z") // fetches server1.com/z, or server2.com/z,
 *  // depending on which one of the previous request terminated first
 */
export default function balance(functions, fifo = true) {
    let idle = [...functions];
    let queue = [];

    async function consume() {
        let f = idle.pop();
        if (f === undefined) return; // No idle function
        let obj = queue.pop();
        if (obj === undefined) {
            idle.push(f);
        } else {
            let { accept, reject, args } = obj;
            await f(...args).then(accept).catch(reject);
            idle.push(f);
            consume();
        }
    }

    return function balanced(...args) {
        return new Promise((accept, reject) => {
            let obj = { accept, reject, args };
            if (fifo) queue.unshift(obj);
            else queue.push(obj);
            consume();
        });
    }
}