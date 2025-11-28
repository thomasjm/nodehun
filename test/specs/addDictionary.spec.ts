import { fail, strictEqual, notEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('addDictionary Tests', (context: TestContext) => {
  describe('Nodehun#addDictionary(dictionary: Buffer): Promise<void>;', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, () => {
      strictEqual(typeof nodehun.addDictionary, 'function')
    })

    it(`should return a promise`, async () => {
      let success = false
      await nodehun.addDictionary()
        .then(() => { })
        .catch(() => { })
        .finally(() => { success = true })

      strictEqual(success, true)
    })

    it(`should throw when no arguments are given`, async () => {
      try {
        await nodehun.addDictionary()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, async () => {
      try {
        await nodehun.addDictionary(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, async () => {
      try {
        await nodehun.addDictionary(1)
        fail()
      } catch {
        // success
      }
    })

    it(`should mark correct after dictionary is added`, async () => {
      // Use appropriate method and format based on constructor type
      if (context.factory.description.includes('Path')) {
        await nodehun.addDictionaryPath(context.dictionaries.fr.dictionaryPath)
      } else {
        await nodehun.addDictionary(context.dictionaries.fr.dictionaryBuffer)
      }
      strictEqual(await nodehun.spell('bonjour'), true)
    })
  })
})