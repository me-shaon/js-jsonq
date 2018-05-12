/*
Example of find() API
---------------------
You just need to pass a path string to the find()
API to get the desired result.
If you want to traverse to multi-level hierarchy,
just separate the properties by '.'.
*/
const JsJsonQ = require('../index.js');
let Q = new JsJsonQ(__dirname + '/data.json');

//To get a direct property 'cities' from Json
const products = Q.find('cities');
console.log('-------- Printing Prodcuts---------');
console.log(products);

// Resetting the instance to initial state
// because the previous find() query changed it internal state
Q = Q.reset();

const firstProductsName = Q.find('cities.0.name');
console.log('-------- Printing First Prodcuts Name ---------');
console.log(firstProductsName);
