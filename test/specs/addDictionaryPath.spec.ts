import { fail, strictEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('addDictionaryPath Tests', (context: TestContext) => {
  describe('Nodehun#addDictionaryPath(dictionaryPath: string)', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, () => {
      strictEqual(typeof nodehun.addDictionaryPath, 'function')
    })

    it(`should return a promise`, () => {
      const result = nodehun.addDictionaryPath('test')
      strictEqual(typeof result.then, 'function')
    })

    it(`should throw when no arguments are given`, async () => {
      try {
        await nodehun.addDictionaryPath()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, async () => {
      try {
        await nodehun.addDictionaryPath(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, async () => {
      try {
        await nodehun.addDictionaryPath(1)
        fail()
      } catch {
        // success
      }
    })

    it(`should mark correct after dictionary is added`, async () => {
      await nodehun.addDictionaryPath(context.dictionaries.fr.dictionaryPath)
      strictEqual(await nodehun.spell('bonjour'), true)
    })
  })
})
