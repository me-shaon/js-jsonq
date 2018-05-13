/*
Example of Chunk() API
---------------------
You just need to pass integer number to chunk 
API your desired result.
*/

const jsonQ = require('../index.js');
let Q = new jsonQ(require('./data.json'));

const chunking = Q.from('users')
    .where('location', '=', 'Barisal')
    .chunk(4);

console.log('-------- Printing Result of chunk ---------');
console.log(chunking);