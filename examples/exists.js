/*
Example of exists() API
---------------------
It will return **true** if the element is not 'empty'
or not 'null' or not an 'empty array' or not an 'empty object'

*/
const jsonQ = require('../index.js');
let Q = new jsonQ([]);
let exist = Q.exists();
console.log(exist); //prints false

Q = new jsonQ({});
exist = Q.exists();
console.log(exist); //prints false

Q = new jsonQ({ id: 1, name: '', city: null });
exist = Q.at('id').exists();
console.log(exist); //prints true

Q = Q.reset();
exist = Q.at('name').exists();
console.log(exist); //prints false

Q = Q.reset();
exist = Q.at('city').exists();
console.log(exist); //prints false
