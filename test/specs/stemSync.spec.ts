import { fail, strictEqual, deepEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('StemSync Tests', (context: TestContext) => {
  describe('Nodehun#stemSync(word: string): string[];', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, () => {
      strictEqual(typeof nodehun.stemSync, 'function')
    })

    it(`should throw when no arguments are given`, () => {
      try {
        nodehun.stemSync()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, () => {
      try {
        nodehun.stemSync(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, () => {
      try {
        nodehun.stemSync(1)
        fail()
      } catch {
        // success
      }
    })

    it(`should return roots`, async () => {
      const roots = nodehun.stemSync('telling')
      deepEqual(
        roots,
        ['telling', 'tell']
      )
    })

    it(`should return an empty array when not available`, async () => {
      deepEqual(
        nodehun.stemSync('npmnpmnpmnpmnpmnpmnpmnpm'),
        []
      )
    })
  })
})