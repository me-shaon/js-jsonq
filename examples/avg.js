/*
Example of avg() API
---------------------
You need to pass a property name in avg()
API to get the summation of the values of that property.
*/
const jsonQ = require('../index.js');
let Q = new jsonQ(__dirname + '/data.json');

//To get a direct property 'users' from Json
const average = Q.from('products').avg('price');
console.log('-------- Printing average ---------');
console.log(average);

// Resetting the instance to initial state
// because the previous query changed it internal state
Q = Q.reset();

// If the data is plain array, you don't need to pass the 'property' parameter
const arrayAvg = Q.from('arr').avg();

console.log('-------- Printing Array Average ---------');
console.log(arrayAvg);
