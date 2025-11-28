import { fail, strictEqual, deepEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('Morphology Tests', (context: TestContext) => {
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

    it(`should throw when 3 arguments are given`, async () => {
      try {
        nodehun.generateSync(1, 2, 3)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, async () => {
      try {
        nodehun.generateSync(1)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the second argument isn't a string`, async () => {
      try {
        nodehun.generateSync('abc', 1)
        fail()
      } catch {
        // success
      }
    })

    it(`should return variations based on example`, async () => {
      deepEqual(
        nodehun.generateSync('telling', 'ran'),
        ['told']
      )
    })

    it(`should return variations based on example (2)`, async () => {
      deepEqual(
        nodehun.generateSync('told', 'run'),
        ['tell']
      )
    })

    it(`should return an empty array when not computable`, async () => {
      deepEqual(
        nodehun.generateSync('told', 'npmnpmnpmnpm'),
        []
      )
    })

    it(`should return an empty array when not computable (2)`, async () => {
      deepEqual(
        nodehun.generateSync('npmnpmnpmnpm', 'npmnpmnpmnpm'),
        []
      )
    })

    it(`should return an empty array when not computable (3)`, async () => {
      deepEqual(
        nodehun.generateSync('npmnpmnpmnpm', 'run'),
        []
      )
    })
  })
})