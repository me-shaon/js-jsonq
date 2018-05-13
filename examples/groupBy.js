/*
Example of groupBy() API
---------------------
You need to pass the 'property' parameter by which
you want to group the collection data
*/
const jsonQ = require('../index.js');
let Q = new jsonQ(__dirname + '/data.json');

const group = Q.from('users')
    .groupBy('location')
    .fetch();
console.log('-------- Printing Grouped data ---------');
console.log(group);
