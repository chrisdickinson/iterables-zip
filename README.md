# @iterables/zip

Combine iterables into a list of tuples, where the Nth tuple is comprised of
the Nth element from each iterable.

```javascript
const zip = require('@iterables/zip')

const iter = zip('abc', [1, 2, 3], 'xyz')

console.log(Array.from(iter)) // [['a', 1, 'x'], ['b', 2, 'y'], ['c', 3, 'z']]

const map = new Map()
map.set('a', 3)
map.set('b', 0)

console.log(...zip(...map)) // ['a', 'b'] [3, 0]
console.log(...zip.longest(9999)([1,2], [1,2,3])) // [1, 1] [2, 2] [9999, 3]
```

## Installation

```
$ npm install --save @iterables/zip
```

## API

### `zip(...iterables) -> Iterator<Array<T>>`

* `iterables`: any `Iterator` — a generator instance, `Array`, `Map`, `String`, or `Set`

Returns a zipped iterator. If `iterables` are of different lengths, the resulting
iterator will be the same length as the **shortest** iterable.

### `zip.longest(fill) -> Generator`

* `fill`: a value to fill 

Returns a zipped iterator. If `iterables` are of different lengths, the resulting
iterator will be the same length as the **longest** iterable. Missing values from
the shorter iterables will be replaced with `fill`.

## License

MIT
