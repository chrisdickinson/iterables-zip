'use strict'

const tap = require('tap')

const zip = require('./iterables-zip')

function test (name, testCase) {
  return tap.test(name, assert => {
    testCase(assert)
    return Promise.resolve()
  })
}

test('fails if falsey iterable given', assert => {
  assert.throws(TypeError, () => {
    Array.from(zip(null))
  })
  assert.throws(TypeError, () => {
    Array.from(zip(false))
  })
  assert.throws(TypeError, () => {
    Array.from(zip(0))
  })
})

test('fails if non-iterable given', assert => {
  assert.throws(TypeError, () => {
    Array.from(zip({[Symbol.iterable]: null}))
  })
  assert.throws(TypeError, () => {
    Array.from(zip(true))
  })
  assert.throws(TypeError, () => {
    Array.from(zip(1))
  })
})

test('longest: fails if falsey iterable given', assert => {
  assert.throws(TypeError, () => {
    Array.from(zip.longest('foo')(null))
  })
  assert.throws(TypeError, () => {
    Array.from(zip.longest('foo')(false))
  })
  assert.throws(TypeError, () => {
    Array.from(zip.longest('foo')(0))
  })
})

test('longest: fails if non-iterable given', assert => {
  assert.throws(TypeError, () => {
    Array.from(zip.longest('foo')({[Symbol.iterable]: null}))
  })
  assert.throws(TypeError, () => {
    Array.from(zip.longest('foo')(true))
  })
  assert.throws(TypeError, () => {
    Array.from(zip.longest('foo')(1))
  })
})

test('zip: even', assert => {
  const map = new Map(zip('abc', [1, 2, 3]))

  assert.deepEqual([...map], [
    ['a', 1],
    ['b', 2],
    ['c', 3]
  ])
})

test('zip: uneven', assert => {
  const map0 = new Map(zip('abc', [1, 2, 3, 4]))

  assert.deepEqual([...map0], [
    ['a', 1],
    ['b', 2],
    ['c', 3]
  ])

  const map1 = new Map(zip('abcd', [1, 2, 3]))

  assert.deepEqual([...map1], [
    ['a', 1],
    ['b', 2],
    ['c', 3]
  ])
})

test('zip.longest: even', assert => {
  const map = new Map(zip.longest()('abc', [1, 2, 3]))

  assert.deepEqual([...map], [
    ['a', 1],
    ['b', 2],
    ['c', 3]
  ])
})

test('zip: uneven', assert => {
  const map0 = new Map(zip.longest('x')('abc', [1, 2, 3, 4]))

  assert.deepEqual([...map0], [
    ['a', 1],
    ['b', 2],
    ['c', 3],
    ['x', 4]
  ])

  const map1 = new Map(zip.longest('x')('abcd', [1, 2, 3]))

  assert.deepEqual([...map1], [
    ['a', 1],
    ['b', 2],
    ['c', 3],
    ['d', 'x']
  ])
})

test('zip: undo map', assert => {
  const map = new Map([
    ['a', 3],
    ['b', 4],
    ['c', 5]
  ])

  const [keys, values] = zip(...map)

  assert.deepEqual(keys, 'abc'.split(''))
  assert.deepEqual(values, [3, 4, 5])
})
