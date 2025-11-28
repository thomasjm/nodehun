import { fail, strictEqual, deepEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('Stem Tests', (context: TestContext) => {
  describe('Nodehun#stem(word: string): Promise<string[]>;', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, () => {
      strictEqual(typeof nodehun.stem, 'function')
    })

    it(`should return a promise`, async () => {
      let success = false
      await nodehun.stem()
        .then(() => { })
        .catch(() => { })
        .finally(() => { success = true })

      strictEqual(success, true)
    })

    it(`should throw when no arguments are given`, async () => {
      try {
        await nodehun.stem()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, async () => {
      try {
        await nodehun.stem(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, async () => {
      try {
        await nodehun.stem(1)
        fail()
      } catch {
        // success
      }
    })

    it(`should return roots`, async () => {
      const roots = await nodehun.stem('telling')
      deepEqual(
        roots,
        ['telling', 'tell']
      )
    })

    it(`should return an empty array when not available`, async () => {
      deepEqual(
        await nodehun.stem('npmnpmnpmnpmnpmnpmnpmnpm'),
        []
      )
    })
  })
})