import { fail, strictEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('AddWithAffixSync Tests', (context: TestContext) => {
  describe('Nodehun#addWithAffixSync(word: string, example: string): void;', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, () => {
      strictEqual(typeof nodehun.addWithAffixSync, 'function')
    })

    it(`should throw when no arguments are given`, () => {
      try {
        nodehun.addWithAffixSync()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 3 arguments are given`, () => {
      try {
        nodehun.addWithAffixSync(1, 2, 3)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, () => {
      try {
        nodehun.addWithAffixSync(1)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the second argument isn't a string`, () => {
      try {
        nodehun.addWithAffixSync('abc', 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should mark correct`, async () => {
      nodehun.addWithAffixSync('colour', 'color')
      strictEqual(nodehun.spellSync('colouring'), true)
    })
  })
})