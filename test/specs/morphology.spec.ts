import { strictEqual, fail, deepEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('Morphology Tests', (context: TestContext) => {
  let nodehun: any

  beforeEach(() => {
    nodehun = context.factory.create('enUS')
  })

  describe('#analyze(word)', () => {
    it('should be a function', () => {
      strictEqual(typeof nodehun.analyze, 'function')
    })

    it('should return a promise', () => {
      const result = nodehun.analyze('hello')
      strictEqual(typeof result.then, 'function')
    })

    it('should throw when no arguments are given', async () => {
      try {
        await nodehun.analyze()
        fail()
      } catch {
        // success
      }
    })

    it('should throw when 2 arguments are given', async () => {
      try {
        await nodehun.analyze('hello', 'world')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the first argument isn\'t a string', async () => {
      try {
        await nodehun.analyze(1)
        fail()
      } catch {
        // success
      }
    })

    it('should return morphological analysis', async () => {
      const result = await nodehun.analyze('cars')
      strictEqual(Array.isArray(result), true)
    })

    it('should return an empty array when it isn\'t available', async () => {
      const result = await nodehun.analyze('aaaa')
      strictEqual(Array.isArray(result), true)
      strictEqual(result.length, 0)
    })
  })

  describe('#analyzeSync(word)', () => {
    it('should be a function', () => {
      strictEqual(typeof nodehun.analyzeSync, 'function')
    })

    it('should throw when no arguments are given', () => {
      try {
        nodehun.analyzeSync()
        fail()
      } catch {
        // success
      }
    })

    it('should throw when 2 arguments are given', () => {
      try {
        nodehun.analyzeSync('hello', 'world')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the first argument isn\'t a string', () => {
      try {
        nodehun.analyzeSync(1)
        fail()
      } catch {
        // success
      }
    })

    it('should return morphological analysis', () => {
      const result = nodehun.analyzeSync('cars')
      strictEqual(Array.isArray(result), true)
    })

    it('should return an empty array when it isn\'t available', () => {
      const result = nodehun.analyzeSync('aaaa')
      strictEqual(Array.isArray(result), true)
      strictEqual(result.length, 0)
    })
  })

  describe('#stem(word)', () => {
    it('should be a function', () => {
      strictEqual(typeof nodehun.stem, 'function')
    })

    it('should return a promise', () => {
      const result = nodehun.stem('hello')
      strictEqual(typeof result.then, 'function')
    })

    it('should throw when no arguments are given', async () => {
      try {
        await nodehun.stem()
        fail()
      } catch {
        // success
      }
    })

    it('should throw when 2 arguments are given', async () => {
      try {
        await nodehun.stem('hello', 'world')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the first argument isn\'t a string', async () => {
      try {
        await nodehun.stem(1)
        fail()
      } catch {
        // success
      }
    })

    it('should return roots', async () => {
      const result = await nodehun.stem('cars')
      strictEqual(Array.isArray(result), true)
      strictEqual(result.includes('car'), true)
    })

    it('should return an empty array when not available', async () => {
      const result = await nodehun.stem('aaaa')
      strictEqual(Array.isArray(result), true)
      strictEqual(result.length, 0)
    })
  })

  describe('#stemSync(word)', () => {
    it('should be a function', () => {
      strictEqual(typeof nodehun.stemSync, 'function')
    })

    it('should throw when no arguments are given', () => {
      try {
        nodehun.stemSync()
        fail()
      } catch {
        // success
      }
    })

    it('should throw when 2 arguments are given', () => {
      try {
        nodehun.stemSync('hello', 'world')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the first argument isn\'t a string', () => {
      try {
        nodehun.stemSync(1)
        fail()
      } catch {
        // success
      }
    })

    it('should return roots', () => {
      const result = nodehun.stemSync('cars')
      strictEqual(Array.isArray(result), true)
      strictEqual(result.includes('car'), true)
    })

    it('should return an empty array when not available', () => {
      const result = nodehun.stemSync('aaaa')
      strictEqual(Array.isArray(result), true)
      strictEqual(result.length, 0)
    })
  })

  describe('#generate(word, example)', () => {
    it('should be a function', () => {
      strictEqual(typeof nodehun.generate, 'function')
    })

    it('should return a promise', () => {
      const result = nodehun.generate('hello', 'world')
      strictEqual(typeof result.then, 'function')
    })

    it('should throw when no arguments are given', async () => {
      try {
        await nodehun.generate()
        fail()
      } catch {
        // success
      }
    })

    it('should throw when 3 arguments are given', async () => {
      try {
        await nodehun.generate('hello', 'world', 'test')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the first argument isn\'t a string', async () => {
      try {
        await nodehun.generate(1, 'world')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the second argument isn\'t a string', async () => {
      try {
        await nodehun.generate('hello', 2)
        fail()
      } catch {
        // success
      }
    })

    it('should return variations based on example', async () => {
      const result = await nodehun.generate('drink', 'drinks')
      strictEqual(Array.isArray(result), true)
    })

    it('should return variations based on example (2)', async () => {
      const result = await nodehun.generate('cat', 'cats')
      strictEqual(Array.isArray(result), true)
    })

    it('should return an empty array when not computable', async () => {
      const result = await nodehun.generate('aaaa', 'bbbb')
      strictEqual(Array.isArray(result), true)
      strictEqual(result.length, 0)
    })

    it('should return an empty array when not computable (2)', async () => {
      const result = await nodehun.generate('hello', 'bbbb')
      strictEqual(Array.isArray(result), true)
      strictEqual(result.length, 0)
    })

    it('should return an empty array when not computable (3)', async () => {
      const result = await nodehun.generate('aaaa', 'world')
      strictEqual(Array.isArray(result), true)
      strictEqual(result.length, 0)
    })
  })

  describe('#generateSync(word, example)', () => {
    it('should be a function', () => {
      strictEqual(typeof nodehun.generateSync, 'function')
    })

    it('should throw when no arguments are given', () => {
      try {
        nodehun.generateSync()
        fail()
      } catch {
        // success
      }
    })

    it('should throw when 3 arguments are given', () => {
      try {
        nodehun.generateSync('hello', 'world', 'test')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the first argument isn\'t a string', () => {
      try {
        nodehun.generateSync(1, 'world')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the second argument isn\'t a string', () => {
      try {
        nodehun.generateSync('hello', 2)
        fail()
      } catch {
        // success
      }
    })

    it('should return variations based on example', () => {
      const result = nodehun.generateSync('drink', 'drinks')
      strictEqual(Array.isArray(result), true)
    })

    it('should return variations based on example (2)', () => {
      const result = nodehun.generateSync('cat', 'cats')
      strictEqual(Array.isArray(result), true)
    })

    it('should return an empty array when not computable', () => {
      const result = nodehun.generateSync('aaaa', 'bbbb')
      strictEqual(Array.isArray(result), true)
      strictEqual(result.length, 0)
    })

    it('should return an empty array when not computable (2)', () => {
      const result = nodehun.generateSync('hello', 'bbbb')
      strictEqual(Array.isArray(result), true)
      strictEqual(result.length, 0)
    })

    it('should return an empty array when not computable (3)', () => {
      const result = nodehun.generateSync('aaaa', 'world')
      strictEqual(Array.isArray(result), true)
      strictEqual(result.length, 0)
    })
  })
})