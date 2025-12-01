import { fail, strictEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('AddWithAffix Tests', (context: TestContext) => {
  describe('Nodehun#addWithAffix(word: string, example: string)', () => {
    let nodehun: any

    beforeEach(() => {
      // clear changes before every test
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, () => {
      strictEqual(typeof nodehun.addWithAffix, 'function')
    })

    it(`should return a promise`, async () => {
      let success = false
      await nodehun.addWithAffix()
        .then(() => { })
        .catch(() => { })
        .finally(() => { success = true })

      strictEqual(success, true)
    })

    it(`should throw when no arguments are given`, async () => {
      try {
        await nodehun.addWithAffix()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 3 arguments are given`, async () => {
      try {
        await nodehun.addWithAffix(1, 2, 3)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, async () => {
      try {
        await nodehun.addWithAffix(1)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the second argument isn't a string`, async () => {
      try {
        await nodehun.addWithAffix('abc', 1)
        fail()
      } catch {
        // success
      }
    })

    it(`should mark correct`, async () => {
      await nodehun.addWithAffix('colour', 'color')
      const result = await nodehun.spell('colouring')
      strictEqual(result, true)
    })
  })
})
