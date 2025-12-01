import { fail, strictEqual } from 'assert'
import { DICTIONARIES } from '../fixtures/dictionaries'

const Nodehun = require('bindings')('Nodehun')

describe('Constructor Tests', () => {
  it(`should export a function`, () => {
    strictEqual(typeof Nodehun, 'function')
  })

  it(`should throw when 'new' operator isn't used`, () => {
    try {
      Nodehun()
      fail()
    } catch {
      // success
    }
  })

  it(`should throw when no arguments are given`, () => {
    try {
      new Nodehun()
      fail()
    } catch {
      // success
    }
  })

  it(`should throw when 1 arguments are given`, () => {
    try {
      new Nodehun(1)
      fail()
    } catch {
      // success
    }
  })

  it(`should throw when 3 arguments are given`, () => {
    try {
      new Nodehun(1, 2, 3)
      fail()
    } catch {
      // success
    }
  })

  describe('Buffer Constructor', () => {
    it(`should throw when the first argument isn't a buffer`, () => {
      try {
        new Nodehun(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the second argument isn't a buffer`, () => {
      try {
        new Nodehun(DICTIONARIES.enUS.affixBuffer, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should successfully construct an object when two buffers are given`, () => {
      new Nodehun(DICTIONARIES.enUS.affixBuffer, DICTIONARIES.enUS.dictionaryBuffer)
    })
  })

  describe('Path Constructor', () => {
    it(`should throw when the first argument isn't a string`, () => {
      try {
        new Nodehun(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the second argument isn't a string`, () => {
      try {
        new Nodehun('/path/to/affix', 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should successfully construct an object when two file paths are given`, () => {
      new Nodehun(DICTIONARIES.enUS.affixPath, DICTIONARIES.enUS.dictionaryPath)
    })
  })
})