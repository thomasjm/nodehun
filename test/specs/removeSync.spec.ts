import { fail, strictEqual, notEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('removeSync Tests', (context: TestContext) => {
  describe('Nodehun#removeSync(value)', () => {
    let nodehun: any

    beforeEach(() => {
      // clear changes before each test
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, () => {
      strictEqual(typeof nodehun.removeSync, 'function')
    })

    it(`should throw when 0 arguments are given`, () => {
      try {
        nodehun.removeSync()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, () => {
      try {
        nodehun.removeSync(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, () => {
      try {
        nodehun.removeSync(123456)
        fail()
      } catch {
        // success
      }
    })

    it(`should now mark as correct`, () => {
      const word = 'npm'

      nodehun.addSync(word)
      strictEqual(nodehun.spellSync(word), true)
      nodehun.removeSync(word)
      strictEqual(nodehun.spellSync(word), false)
    })

    it(`should no longer receive suggestions`, () => {
      const word = 'npm'

      nodehun.addSync(word)
      strictEqual(nodehun.suggestSync(word), null)
      nodehun.removeSync(word)
      notEqual(nodehun.suggestSync(word), null)
    })
  })
})