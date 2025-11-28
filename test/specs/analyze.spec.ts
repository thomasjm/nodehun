import { fail, strictEqual, deepEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('Analyze Tests', (context: TestContext) => {
  describe('Nodehun#analyze(word: string): Promise<string[]>;', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, () => {
      strictEqual(typeof nodehun.analyze, 'function')
    })

    it(`should return a promise`, async () => {
      let success = false
      await nodehun.analyze()
        .then(() => { })
        .catch(() => { })
        .finally(() => { success = true })

      strictEqual(success, true)
    })

    it(`should throw when no arguments are given`, async () => {
      try {
        await nodehun.analyze()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, async () => {
      try {
        await nodehun.analyze(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, async () => {
      try {
        await nodehun.analyze(1)
        fail()
      } catch {
        // success
      }
    })

    it(`should return morphological analysis`, async () => {
      const morphologicalAnalysis = await nodehun.analyze('telling')
      deepEqual(
        morphologicalAnalysis,
        [' st:telling ts:0', ' st:tell ts:0 al:told is:Vg']
      )
    })

    it(`should return an empty array when it isn't available`, async () => {
      deepEqual(
        await nodehun.analyze('npmnpmnpmnpmnpmnpmnpmnpm'),
        []
      )
    })
  })
})