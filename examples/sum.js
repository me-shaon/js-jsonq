/*
Example of sum() API
---------------------
You need to pass a property name in sum()
API to get the summation of the values of that property.
*/
const jsonQ = require('../index.js');
let Q = new jsonQ(__dirname + '/data.json');

//To get a direct property 'users' from Json
const prices = Q.from('products').sum('price');
console.log('-------- Printing Prices ---------');
console.log(prices);

// Resetting the instance to initial state
// because the previous query changed it internal state
Q = Q.reset();

// If the data is plain array, you don't need to pass the 'property' parameter
const arraySum = Q.from('arr').sum();

console.log('-------- Printing Sum ---------');
console.log(arraySum);
