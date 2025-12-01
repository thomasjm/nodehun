import { fail, strictEqual, deepEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('AnalyzeSync Tests', (context: TestContext) => {
  describe('Nodehun#analyzeSync(word: string): string[];', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, () => {
      strictEqual(typeof nodehun.analyzeSync, 'function')
    })

    it(`should throw when no arguments are given`, () => {
      try {
        nodehun.analyzeSync()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, () => {
      try {
        nodehun.analyzeSync(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, () => {
      try {
        nodehun.analyzeSync(1)
        fail()
      } catch {
        // success
      }
    })

    it(`should return morphological analysis`, async () => {
      const morphologicalAnalysis = nodehun.analyzeSync('telling')
      deepEqual(
        morphologicalAnalysis,
        [' st:telling ts:0', ' st:tell ts:0 al:told is:Vg']
      )
    })

    it(`should return an empty array when it isn't available`, async () => {
      deepEqual(
        nodehun.analyzeSync('npmnpmnpmnpmnpmnpmnpmnpm'),
        []
      )
    })
  })
})