/*
Example of min() API
---------------------
You need to pass a property name in min()
API to get the summation of the values of that property.
*/
const jsonQ = require('../index.js');
let Q = new jsonQ(__dirname + '/data.json');

//To get a direct property 'users' from Json
const minPrice = Q.from('products').min('price');
console.log('-------- Printing minPrice ---------');
console.log(minPrice);

// Resetting the instance to initial state
// because the previous query changed it internal state
Q = Q.reset();

// If the data is plain array, you don't need to pass the 'property' parameter
const arrayMin = Q.from('arr').min();

console.log('-------- Printing Min ---------');
console.log(arrayMin);
