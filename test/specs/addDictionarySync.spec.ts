import { fail, strictEqual, notEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('addDictionarySync Tests', (context: TestContext) => {
  describe('Nodehun#addDictionarySync(dictionary: Buffer): void;', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, () => {
      strictEqual(typeof nodehun.addDictionarySync, 'function')
    })

    it(`should throw when no arguments are given`, () => {
      try {
        nodehun.addDictionarySync()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, () => {
      try {
        nodehun.addDictionarySync(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, () => {
      try {
        nodehun.addDictionarySync(1)
        fail()
      } catch {
        // success
      }
    })

    it(`should mark correct after dictionary is added`, async () => {
      // Use appropriate method and format based on constructor type
      if (context.factory.description.includes('Path')) {
        nodehun.addDictionaryPathSync(context.dictionaries.fr.dictionaryPath)
      } else {
        nodehun.addDictionarySync(context.dictionaries.fr.dictionaryBuffer)
      }
      strictEqual(nodehun.spellSync('bonjour'), true)
    })
  })
})