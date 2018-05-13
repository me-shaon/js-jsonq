/*
Example of sort() API
---------------------
You can pass the 'order' parameter to define the ordering.
If you skip the 'order' property the data will be by default
ordered as **ascending**. You need to pass **'desc'** as the
'order' parameter to sort the data in **descending** order.
Also, you can pass a compare function in 'order' parameter
to define your own logic to order the data.
*/
const jsonQ = require('../index.js');
let Q = new jsonQ(__dirname + '/data.json');

const ascSorted = Q.from('arr')
    .sort()
    .fetch();
console.log('-------- Printing Ascending ordered data ---------');
console.log(ascSorted);

Q = Q.reset();

const descSorted = Q.from('arr')
    .sort('desc')
    .fetch();
console.log('-------- Printing Descending ordered data ---------');
console.log(descSorted);

Q = Q.reset();

const customSorted = Q.from('arr')
    .sort(function(a, b) {
        return a - b;
    })
    .fetch();
console.log('-------- Printing Custom ordered data ---------');
console.log(customSorted);
