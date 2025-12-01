import { fail, strictEqual, deepEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('GenerateSync Tests', (context: TestContext) => {
  describe('Nodehun#generateSync(word: string): string[];', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, () => {
      strictEqual(typeof nodehun.generateSync, 'function')
    })

    it(`should throw when no arguments are given`, () => {
      try {
        nodehun.generateSync()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 3 arguments are given`, () => {
      try {
        nodehun.generateSync(1, 2, 3)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, () => {
      try {
        nodehun.generateSync(1)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the second argument isn't a string`, () => {
      try {
        nodehun.generateSync('abc', 1)
        fail()
      } catch {
        // success
      }
    })

    it(`should return variations based on example`, () => {
      deepEqual(
        nodehun.generateSync('telling', 'ran'),
        ['told']
      )
    })

    it(`should return variations based on example (2)`, () => {
      deepEqual(
        nodehun.generateSync('told', 'run'),
        ['tell']
      )
    })

    it(`should return an empty array when not computable`, () => {
      deepEqual(
        nodehun.generateSync('told', 'npmnpmnpmnpm'),
        []
      )
    })

    it(`should return an empty array when not computable (2)`, () => {
      deepEqual(
        nodehun.generateSync('npmnpmnpmnpm', 'npmnpmnpmnpm'),
        []
      )
    })

    it(`should return an empty array when not computable (3)`, () => {
      deepEqual(
        nodehun.generateSync('npmnpmnpmnpm', 'run'),
        []
      )
    })
  })
})