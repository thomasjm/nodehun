import { fail, strictEqual, deepEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('Suggest Tests', (context: TestContext) => {
  describe('#suggest(word)', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, async () => {
      strictEqual(typeof nodehun.suggest, 'function')
    })

    it(`should return a promise`, async () => {
      let success = false

      await nodehun.suggest()
        .then(() => { })
        .catch(() => { })
        .finally(() => { success = true })

      strictEqual(success, true)
    })

    it(`should throw when 0 arguments are given`, async () => {
      try {
        await nodehun.suggest()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, async () => {
      try {
        await nodehun.suggest(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, async () => {
      try {
        await nodehun.suggest(123456)
        fail()
      } catch {
        // success
      }
    })

    it(`should return null when the word is spelled correctly`, async () => {
      strictEqual(await nodehun.suggest('color'), null)
    })

    it(`should return an array when the word is not spelled correctly`, async () => {
      const value = await nodehun.suggest('colour')
      strictEqual(typeof value, 'object')
      strictEqual(typeof value.length, 'number')
    })

    it(`should return appropriate suggestions when a word is spelled incorrectly`, async () => {
      const value = await nodehun.suggest('colour')
      deepEqual(value.splice(0, 3), ['color', 'co lour', 'co-lour'])
    })
  })
})
