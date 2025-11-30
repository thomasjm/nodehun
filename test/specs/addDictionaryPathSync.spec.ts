import { fail, strictEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('addDictionaryPathSync Tests', (context: TestContext) => {
  describe('Nodehun#addDictionaryPathSync(dictionaryPath: string): void;', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, () => {
      strictEqual(typeof nodehun.addDictionaryPathSync, 'function')
    })

    it(`should throw when no arguments are given`, () => {
      try {
        nodehun.addDictionaryPathSync()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, () => {
      try {
        nodehun.addDictionaryPathSync(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, () => {
      try {
        nodehun.addDictionaryPathSync(1)
        fail()
      } catch {
        // success
      }
    })

    it(`should mark correct after dictionary is added`, async () => {
      nodehun.addDictionaryPathSync(context.dictionaries.fr.dictionaryPath)
      strictEqual(nodehun.spellSync('bonjour'), true)
    })
  })
})
