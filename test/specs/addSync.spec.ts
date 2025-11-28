import { fail, strictEqual, notEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('AddSync Tests', (context: TestContext) => {
  describe('Nodehun#addSync(value)', () => {
    let nodehun: any

    beforeEach(() => {
      // clear changes before each test
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, () => {
      strictEqual(typeof nodehun.addSync, 'function')
    })

    it(`should throw when 0 arguments are given`, () => {
      try {
        nodehun.addSync()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, () => {
      try {
        nodehun.addSync(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, () => {
      try {
        nodehun.addSync(123456)
        fail()
      } catch {
        // success
      }
    })

    it(`should now mark as correct`, () => {
      const word = 'npm'

      strictEqual(nodehun.spellSync(word), false)
      nodehun.addSync(word)
      strictEqual(nodehun.spellSync(word), true)
    })

    it(`should no longer receive suggestions`, () => {
      const word = 'npm'

      notEqual(nodehun.suggestSync(word), null)
      nodehun.addSync(word)
      strictEqual(nodehun.suggestSync(word), null)
    })
  })
})