# JSJsonQ

JSJsonQ is a simple, elegant Javascript package to Query over any type of Json Data.

This package is inspired from the awesome [jsonq](https://github.com/nahid/jsonq) package.

## Installation

## Usage

Just import/require the package before start using it.

```javascript
const JsJsonQ = require('JSJsonQ');
```

You can start using this package right away by importing your Json data from a file:

```javascript
const Q = new JsJsonQ('data.json');
```

Or from a Json String:

```javascript
const Q = new JsJsonQ('{"id": 1, "name": "shaon"}');
```

Or from a Json Object:

```javascript
const Q = new JsJsonQ({ id: 1, name: 'shaon' });
```

You can start Query your data using the various query methods such as **find**, **where**, **orWhere**, **whereIn**, **whereStartsWith**, **whereEndsWith**, **whereContains** and so on. Also you can aggregate your data after query using **sum**, **count**, **groupBy**, **max**, **min** etc.

Let's see a quick example:

```javascript
// sample Json data
const JsonObject = {
    products: [
        {
            id: 1,
            city: 'bsl',
            name: 'iPhone',
            cat: 1,
            price: 80000.5
        },
        {
            id: 2,
            city: null,
            name: 'macbook pro',
            cat: 1,
            price: 150000
        },
        {
            id: 3,
            city: 'dhk',
            name: 'Redmi 3S Prime',
            cat: 2,
            price: 12000
        },
        {
            id: 4,
            city: 'bsl',
            name: 'macbook air',
            cat: 2,
            price: 110000
        }
    ]
};

const Q = new JsJsonQ(JsonObject);
const res = Q.from('products')
    .where('cat', '=', 2)
    .fetch();
console.log(res);

//This will print
/*
[
    {
        id: 3,
        city: 'dhk',
        name: 'Redmi 3S Prime',
        cat: 2,
        price: 12000
    },
    {
        id: 4,
        city: 'bsl',
        name: 'macbook air',
        cat: 2,
        price: 110000
    }
]
*/
```

Let's say we want to get the Summation of _price_ of the Queried result. We can do it easily by calling the **sum()** method instead of **fetch()**:

```Javascript
const res = Q.from('products')
    .where('cat', '=', 2)
    .sum('price');
console.log(res);
//It will print:
/*
122000
*/
```

Pretty neat, huh?

Let's explore the full API to see what else magic this library can do for you.
Shall we?

## API

### `find(path)`

* `path` -- the path hierarchy of the data you want to find.

    **example:**

    Let's say you want to get the value of _'cities'_ property of your Json Data. You can do it like this:

    ```Javascript
    const Q = new JsJsonQ(JsonObject).find('cities');
    ```

    If you want to traverse to more deep in hierachy, you can do it like:

    ```Javascript
    const Q = new JsJsonQ(JsonObject).find('cities.1.name');
    ```

    See a detail example [here](./examples/find.js).

## Bugs and Issues

If you encounter any bugs or issues, feel free to [open an issue at
github](https://github.com/me-shaon/JJsJsonQ/issues).

Also, you can shoot me an email to
<mailto:shaon.cse81@gmail.com> for hugs or bugs.

## Credit

Speical thanks to [Nahid Bin Azhar](https://github.com/nahid) for the inspiration and guidance for the package.
