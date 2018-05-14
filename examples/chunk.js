/*
Example of Chunk() API
---------------------
You need to pass an integer number to chunk method to get your desired result.
*/

const jsonQ = require('../index.js');
let Q = new jsonQ(__dirname + '/data.json');

const chunking = Q.from('users')
    .where('location', '=', 'Barisal')
    .chunk(4);

console.log('-------- Printing Result of chunk ---------');
console.log(chunking);

Q = Q.reset();


const transformedChunk = Q.from('users')
    .where('location', '=', 'Barisal')
    .chunk(4, (chunk) => {
        return chunk.map((data) => {{ id: data.id}});
    });
