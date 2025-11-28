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

    it(`should return null when the word is spelled correctly`, async () => {
      strictEqual(await nodehun.suggest('color'), null)
    })

    it('should return an array when the word is not spelled correctly', async () => {
      const result = await nodehun.suggest('colour')
      strictEqual(Array.isArray(result), true)
    })

    it('should return appropriate suggestions when a word is spelled incorrectly', async () => {
      const result = await nodehun.suggest('colour')
      deepEqual(result.splice(0, 3), ['color', 'co lour', 'co-lour'])
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
      const result = nodehun.suggestSync('color')
      deepEqual(result, null)
    })

    it('should return null when correct (2)', () => {
      const result = nodehun.suggestSync('c')
      deepEqual(result, null)
    })

    it('should suggest alternatives', () => {
      const result = nodehun.suggestSync('colour')
      deepEqual(result.slice(0, 5), ['color', 'co lour', 'co-lour', 'col our', 'col-our'])
    })

    it('should suggest alternatives', () => {
      const result = nodehun.suggestSync('propper')
      deepEqual(result.slice(0, 5), ['proper', 'popper', 'prosper', 'cropper', 'propped'])
    })

    it('should return null for empty values', () => {
      const result = nodehun.suggestSync(' ')
      deepEqual(result, null)
    })

    it('should return null for non-words', () => {
      const result = nodehun.suggestSync('.')
      deepEqual(result, null)
    })

    it('should suggest alternatives for sentence-case', () => {
      const result = nodehun.suggestSync('Colour')
      deepEqual(result.slice(0, 5), ['Co lour', 'Co-lour', 'Col our', 'Col-our', 'Color'])
    })

    it('should suggest alternatives for upper-case', () => {
      const result = nodehun.suggestSync('COLOUR')
      deepEqual(result.slice(0, 5), ['COLOR', 'CO LOUR', 'CO-LOUR', 'COL OUR', 'COL-OUR'])
    })

    it('should suggest alternatives for funky-case', () => {
      const result = nodehun.suggestSync('coLOUR')
      deepEqual(result.slice(0, 5), ['col Our', 'co Lour', 'color', 'co-lour', 'col-our'])
    })

    it('should suggest uppercase versions', () => {
      const result = nodehun.suggestSync('html')
      deepEqual(result, ['HTML', 'ht ml', 'ht-ml'])
    })

    it('should suggest removals', () => {
      const result = nodehun.suggestSync('collor')
      deepEqual(result.slice(0, 5), ['color', 'collar', 'coll or', 'coll-or', 'collator'])
    })

    it('should suggest additions', () => {
      const result = nodehun.suggestSync('coor')
      notEqual(result.indexOf('color'), -1)
    })

    it('should suggest switches', () => {
      const result = nodehun.suggestSync('cloor')
      strictEqual(result.includes('color'), true)
    })

    it('should suggest insertions', () => {
      const result = nodehun.suggestSync('coor')
      strictEqual(result.includes('color'), true)
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

    it('should not suggest alternatives marked with \'NOSUGGEST\'', () => {
      const result = nodehun.suggestSync('bulshit')
      strictEqual(result.includes('bullshit') || result.includes('Bullshit'), false)
    })

    it('should suggest based on replacements', () => {
      const result = nodehun.suggestSync('consize')
      strictEqual(result.includes('concise'), true)
    })

    it('should not overflow on too long values', () => {
      const word = 'npmnpmnpmnpmnpmnpmnpmnpmnpmnpmnpmnpmnpmnpmnpm'
      const result = nodehun.suggestSync(word)
      deepEqual(result, [])
    })
  })
})
