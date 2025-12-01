import { fail, strictEqual, notEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('remove Tests', (context: TestContext) => {
  describe('Nodehun#remove(word)', () => {
    let nodehun: any

    beforeEach(() => {
      // clear changes before each test
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, async () => {
      strictEqual(typeof nodehun.remove, 'function')
    })

    it(`should return a promise`, async () => {
      let success = false

      await nodehun.remove()
        .then(() => { })
        .catch(() => { })
        .finally(() => { success = true })

      strictEqual(success, true)
    })

    it(`should throw when 0 arguments are given`, async () => {
      try {
        await nodehun.remove()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, async () => {
      try {
        await nodehun.remove(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, async () => {
      try {
        await nodehun.remove(123456)
        fail()
      } catch {
        // success
      }
    })

    it(`should now mark as correct`, async () => {
      const word = 'npm'

      await nodehun.add(word)
      strictEqual(await nodehun.spell(word), true)
      await nodehun.remove('npm')
      strictEqual(await nodehun.spell(word), false)
    })

    it(`should no longer receive suggestions`, async () => {
      const word = 'npm'

      await nodehun.add(word)
      strictEqual(await nodehun.suggest(word), null)
      await nodehun.remove(word)
      notEqual(await nodehun.suggest(word), null)
    })
  })
})