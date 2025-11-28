import { fail, strictEqual, deepEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('Generate Tests', (context: TestContext) => {
  describe('Nodehun#generate(word: string, example: string): Promise<string[]>;', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, () => {
      strictEqual(typeof nodehun.generate, 'function')
    })

    it(`should return a promise`, async () => {
      let success = false
      await nodehun.generate()
        .then(() => { })
        .catch(() => { })
        .finally(() => { success = true })

      strictEqual(success, true)
    })

    it(`should throw when no arguments are given`, async () => {
      try {
        await nodehun.generate()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 3 arguments are given`, async () => {
      try {
        await nodehun.generate(1, 2, 3)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, async () => {
      try {
        await nodehun.generate(1)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the second argument isn't a string`, async () => {
      try {
        await nodehun.generate('abc', 1)
        fail()
      } catch {
        // success
      }
    })

    it(`should return variations based on example`, async () => {
      deepEqual(
        await nodehun.generate('telling', 'ran'),
        ['told']
      )
    })

    it(`should return variations based on example (2)`, async () => {
      deepEqual(
        await nodehun.generate('told', 'run'),
        ['tell']
      )
    })

    it(`should return an empty array when not computable`, async () => {
      deepEqual(
        await nodehun.generate('told', 'npmnpmnpmnpm'),
        []
      )
    })

    it(`should return an empty array when not computable (2)`, async () => {
      deepEqual(
        await nodehun.generate('npmnpmnpmnpm', 'npmnpmnpmnpm'),
        []
      )
    })

    it(`should return an empty array when not computable (3)`, async () => {
      deepEqual(
        await nodehun.generate('npmnpmnpmnpm', 'run'),
        []
      )
    })
  })
})