/*
Example of max() API
---------------------
You need to pass a property name in max()
API to get the maximum of the values of that property.
*/
const jsonQ = require('../index.js');
let Q = new jsonQ(__dirname + '/data.json');

const maxPrice = Q.from('products').max('price');
console.log('-------- Printing maxPrice ---------');
console.log(maxPrice);

// Resetting the instance to initial state
// because the previous query changed it internal state
Q = Q.reset();

// If the data is plain array, you don't need to pass the 'property' parameter
const arrayMax = Q.from('arr').max();

console.log('-------- Printing Max ---------');
console.log(arrayMax);
