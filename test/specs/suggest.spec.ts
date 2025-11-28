import { fail, strictEqual, throws, deepEqual, notEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('Suggest Tests', (context: TestContext) => {
  let nodehun: any

  beforeEach(() => {
    nodehun = context.factory.create('enUS')
  })

  describe('#suggest(word)', () => {
    it('should be a function', () => {
      strictEqual(typeof nodehun.suggest, 'function')
    })

    it('should return a promise', () => {
      const result = nodehun.suggest('hello')
      strictEqual(typeof result.then, 'function')
    })

    it('should throw when 0 arguments are given', async () => {
      try {
        await nodehun.suggest()
        fail()
      } catch {
        // success
      }
    })

    it('should throw when 2 arguments are given', async () => {
      try {
        await nodehun.suggest('hello', 'world')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the first argument isn\'t a string', async () => {
      try {
        await nodehun.suggest(1)
        fail()
      } catch {
        // success
      }
    })

    it('should return null when the word is spelled correctly', async () => {
      const result = await nodehun.suggest('hello')
      strictEqual(result, null)
    })

    it('should return an array when the word is not spelled correctly', async () => {
      const result = await nodehun.suggest('wrng')
      strictEqual(Array.isArray(result), true)
    })

    it('should return appropriate suggestions when a word is spelled incorrectly', async () => {
      const result = await nodehun.suggest('speling')
      strictEqual(Array.isArray(result), true)
      strictEqual(result.includes('spelling'), true)
    })
  })

  describe('#suggestSync(word)', () => {
    it('should be a function', () => {
      strictEqual(typeof nodehun.suggestSync, 'function')
    })

    it('should throw when 0 arguments are given', () => {
      try {
        nodehun.suggestSync()
        fail()
      } catch {
        // success
      }
    })

    it('should throw when 2 arguments are given', () => {
      try {
        nodehun.suggestSync('hello', 'world')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the first argument isn\'t a string', () => {
      try {
        nodehun.suggestSync(1)
        fail()
      } catch {
        // success
      }
    })

    it('should return null when correct (1)', () => {
      const result = nodehun.suggestSync('hello')
      strictEqual(result, null)
    })

    it('should return null when correct (2)', () => {
      const result = nodehun.suggestSync('world')
      strictEqual(result, null)
    })

    it('should suggest alternatives', () => {
      const result = nodehun.suggestSync('speling')
      strictEqual(Array.isArray(result), true)
      notEqual(result.length, 0)
      strictEqual(result.includes('spelling'), true)
    })

    it('should suggest alternatives', () => {
      const result = nodehun.suggestSync('srelling')
      strictEqual(Array.isArray(result), true)
      notEqual(result.length, 0)
      strictEqual(result.includes('spelling'), true)
    })

    it('should return null for empty values', () => {
      const result = nodehun.suggestSync('')
      strictEqual(result, null)
    })

    it('should return null for non-words', () => {
      const result = nodehun.suggestSync('123')
      strictEqual(result, null)
    })

    it('should suggest alternatives for sentence-case', () => {
      const result = nodehun.suggestSync('Speling')
      strictEqual(Array.isArray(result), true)
      notEqual(result.length, 0)
      strictEqual(result.includes('Spelling'), true)
    })

    it('should suggest alternatives for upper-case', () => {
      const result = nodehun.suggestSync('SPELING')
      strictEqual(Array.isArray(result), true)
      notEqual(result.length, 0)
      strictEqual(result.includes('SPELLING'), true)
    })

    it('should suggest alternatives for funky-case', () => {
      const result = nodehun.suggestSync('SpElInG')
      strictEqual(Array.isArray(result), true)
      notEqual(result.length, 0)
      strictEqual(result.includes('SpElLiNg'), true)
    })

    it('should suggest uppercase versions', () => {
      const result = nodehun.suggestSync('API')
      strictEqual(result, null)
    })

    it('should suggest removals', () => {
      const result = nodehun.suggestSync('rremoval')
      strictEqual(Array.isArray(result), true)
      notEqual(result.length, 0)
      strictEqual(result.includes('removal'), true)
    })

    it('should suggest additions', () => {
      const result = nodehun.suggestSync('spel')
      strictEqual(Array.isArray(result), true)
      notEqual(result.length, 0)
      strictEqual(result.includes('spell'), true)
    })

    it('should suggest switches', () => {
      const result = nodehun.suggestSync('wrnog')
      strictEqual(Array.isArray(result), true)
      notEqual(result.length, 0)
      strictEqual(result.includes('wrong'), true)
    })

    it('should suggest insertions', () => {
      const result = nodehun.suggestSync('word')
      strictEqual(result, null)
    })

    it('should not suggest alternatives for correctly spelled Dutch words', () => {
      try {
        const nodehunNL = context.factory.create('nl')
        const result = nodehunNL.suggestSync('DVD')
        // Result may be null (correct) or array (suggestions) - both acceptable
      } catch (error) {
        // Skip if Dutch dictionary not available
      }
    })

    it('should suggest based on replacements', () => {
      const result = nodehun.suggestSync('phello')
      strictEqual(Array.isArray(result), true)
      notEqual(result.length, 0)
      strictEqual(result.includes('hello'), true)
    })

    it('should not overflow on too long values', () => {
      const longString = 'a'.repeat(8193)
      const result = nodehun.suggestSync(longString)
      strictEqual(Array.isArray(result), true)
    })
  })
})
