'use strict'
/* eslint-disable no-labels */

module.exports = Object.assign(zip, {longest})

function * zip () {
  const iterators = Array.from(arguments)
  for (var i = 0; i < iterators.length; ++i) {
    if (!iterators[i] || typeof iterators[i][Symbol.iterator] !== 'function') {
      throw new TypeError(`expected argument ${i} to be an iterable`)
    }
    iterators[i] = iterators[i][Symbol.iterator]()
  }

  let active = true
  loop:
  while (active) {
    const tuple = new Array(iterators.length)
    for (const idx of iterators.keys()) {
      const iter = iterators[idx]
      const cursor = iter.next()
      if (cursor.done) {
        active = false
        break loop
      }

      tuple[idx] = cursor.value
    }

    yield tuple
  }
}

function longest (fill) {
  return ziplongest

  function * ziplongest () {
    const iterators = Array.from(arguments)
    for (var i = 0; i < iterators.length; ++i) {
      if (!iterators[i] || typeof iterators[i][Symbol.iterator] !== 'function') {
        throw new TypeError(`expected argument ${i} to be an iterable`)
      }
      iterators[i] = iterators[i][Symbol.iterator]()
    }

    let active = iterators.length
    loop:
    while (active) {
      const tuple = new Array(iterators.length)
      for (const idx of iterators.keys()) {
        const iter = iterators[idx]
        if (iter === null) {
          tuple[idx] = fill
          continue
        }

        const cursor = iter.next()
        if (cursor.done) {
          --active
          iterators[idx] = null
          tuple[idx] = fill

          if (!active) {
            break loop
          }
        } else {
          tuple[idx] = cursor.value
        }
      }
      yield tuple
    }
  }
}
