import { fail, strictEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('Spell Tests', (context: TestContext) => {
  describe('#spell(word)', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, async () => {
      strictEqual(typeof nodehun.spell, 'function')
    })

    it(`should return a promise`, async () => {
      let success = false

      await nodehun.spell()
        .then(() => { })
        .catch(() => { })
        .finally(() => { success = true })

      strictEqual(success, true)
    })

    it(`should throw when 0 arguments are given`, async () => {
      try {
        await nodehun.spell()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, async () => {
      try {
        await nodehun.spell(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, async () => {
      try {
        await nodehun.spell(123456)
        fail()
      } catch {
        // success
      }
    })

    it(`should return true when the word is spelled correctly`, async () => {
      strictEqual(await nodehun.spell('color'), true)
    })

    it(`should return false when the word is not spelled correctly`, async () => {
      strictEqual(await nodehun.spell('colour'), false)
    })

    it(`should not throw when spellchecking emojis ☀`, async () => {
      await nodehun.spell('😀')
      await nodehun.spell('☀')
    })
  })
})