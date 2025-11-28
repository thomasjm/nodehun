import { fail, strictEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

const Nodehun = require('bindings')('Nodehun')

runWithAllConstructors('Constructor Tests', (context: TestContext) => {
  it('should export a function', () => {
    strictEqual(typeof Nodehun, 'function')
  })

  it('should throw when "new" operator isn\'t used', () => {
    try {
      Nodehun()
      fail()
    } catch {
      // success
    }
  })

  it('should throw when no arguments are given', () => {
    try {
      new Nodehun()
      fail()
    } catch {
      // success
    }
  })

  it('should throw when 1 argument is given', () => {
    try {
      new Nodehun(1)
      fail()
    } catch {
      // success
    }
  })

  it('should throw when 3 arguments are given', () => {
    try {
      new Nodehun(1, 2, 3)
      fail()
    } catch {
      // success
    }
  })

  if (context.factory.description.includes('Buffer')) {
    it('should throw when the first argument isn\'t a buffer', () => {
      try {
        new Nodehun(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the second argument isn\'t a buffer', () => {
      try {
        new Nodehun(context.dictionaries.enUS.affixBuffer, 2)
        fail()
      } catch {
        // success
      }
    })

    it('should successfully construct an object when two buffers are given', () => {
      context.factory.create('enUS')
    })

    it('should throw when mixing buffers and strings', () => {
      try {
        new Nodehun('/path/to/affix', context.dictionaries.enUS.dictionaryBuffer)
        fail()
      } catch {
        // success
      }
      try {
        new Nodehun(context.dictionaries.enUS.affixBuffer, '/path/to/dict')
        fail()
      } catch {
        // success
      }
    })
  }

  if (context.factory.description.includes('Path')) {
    it('should throw when the first argument isn\'t a string', () => {
      try {
        new Nodehun(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the second argument isn\'t a string', () => {
      try {
        new Nodehun('/path/to/affix', 2)
        fail()
      } catch {
        // success
      }
    })

    it('should successfully construct an object when two file paths are given', () => {
      context.factory.create('enUS')
    })

    it('should throw when mixing strings and buffers', () => {
      try {
        new Nodehun('/path/to/affix', context.dictionaries.enUS.dictionaryBuffer)
        fail()
      } catch {
        // success
      }
      try {
        new Nodehun(context.dictionaries.enUS.affixBuffer, '/path/to/dict')
        fail()
      } catch {
        // success
      }
    })
  }
})