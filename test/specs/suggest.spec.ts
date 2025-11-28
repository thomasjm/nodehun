import { fail, strictEqual, deepEqual, notEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('Suggest Tests', (context: TestContext) => {
  describe('#suggest(word)', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, async () => {
      strictEqual(typeof nodehun.suggest, 'function')
    })

    it(`should return a promise`, async () => {
      let success = false

      await nodehun.suggest()
        .then(() => { })
        .catch(() => { })
        .finally(() => { success = true })

      strictEqual(success, true)
    })

    it(`should throw when 0 arguments are given`, async () => {
      try {
        await nodehun.suggest()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, async () => {
      try {
        await nodehun.suggest(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, async () => {
      try {
        await nodehun.suggest(123456)
        fail()
      } catch {
        // success
      }
    })

    it(`should return null when the word is spelled correctly`, async () => {
      strictEqual(await nodehun.suggest('color'), null)
    })

    it(`should return an array when the word is not spelled correctly`, async () => {
      const value = await nodehun.suggest('colour')
      strictEqual(typeof value, 'object')
      strictEqual(typeof value.length, 'number')
    })

    it(`should return appropriate suggestions when a word is spelled incorrectly`, async () => {
      const value = await nodehun.suggest('colour')
      deepEqual(value.splice(0, 3), ['color', 'co lour', 'co-lour'])
    })
  })

  describe('#suggestSync(word)', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, () => {
      strictEqual(typeof nodehun.suggestSync, 'function')
    })

    it(`should throw when 0 arguments are given`, () => {
      try {
        nodehun.suggestSync()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, () => {
      try {
        nodehun.suggestSync(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, () => {
      try {
        nodehun.suggestSync(123456)
        fail()
      } catch {
        // success
      }
    })

    it(`should return null when correct (1)`, () => {
      deepEqual(nodehun.suggestSync('color'), null)
    })

    it(`should return null when correct (2)`, () => {
      deepEqual(
        nodehun.suggestSync('c'),
        null
      )
    })

    it(`should suggest alternatives`, () => {
      deepEqual(
        nodehun.suggestSync('colour').slice(0, 5),
        ['color', 'co lour', 'co-lour', 'col our', 'col-our']
      )
    })

    it(`should suggest alternatives`, () => {
      deepEqual(
        nodehun.suggestSync('propper').slice(0, 5),
        ['proper', 'popper', 'prosper', 'cropper', 'propped']
      )
    })

    it(`should return null for empty values`, () => {
      deepEqual(
        nodehun.suggestSync(' '),
        null
      )
    })

    it(`should return null for non-words`, () => {
      deepEqual(
        nodehun.suggestSync('.'),
        null
      )
    })

    it(`should suggest alternatives for sentence-case`, () => {
      deepEqual(
        nodehun.suggestSync('Colour').slice(0, 5),
        ['Co lour', 'Co-lour', 'Col our', 'Col-our', 'Color']
      )
    })

    it(`should suggest alternatives for upper-case`, () => {
      deepEqual(
        nodehun.suggestSync('COLOUR').slice(0, 5),
        ['COLOR', 'CO LOUR', 'CO-LOUR', 'COL OUR', 'COL-OUR']
      )
    })

    it(`should suggest alternatives for funky-case`, () => {
      deepEqual(
        nodehun.suggestSync('coLOUR').slice(0, 5),
        ['col Our', 'co Lour', 'color', 'co-lour', 'col-our']
      )
    })

    it(`should suggest uppercase versions`, () => {
      deepEqual(
        nodehun.suggestSync('html'),
        ['HTML', 'ht ml', 'ht-ml']
      )
    })

    it(`should suggest removals`, () => {
      deepEqual(
        nodehun.suggestSync('collor').slice(0, 5),
        ['color', 'collar', 'coll or', 'coll-or', 'collator']
      )
    })

    it(`should suggest additions`, () => {
      notEqual(
        nodehun.suggestSync('coor').indexOf('color'),
        -1
      )
    })

    it(`should suggest switches`, () => {
      const suggestions: Array<string> = nodehun.suggestSync('cloor')

      strictEqual(suggestions.includes('color'), true)
    })

    it(`should suggest insertions`, () => {
      const suggestions: Array<string> = nodehun.suggestSync('coor')

      strictEqual(suggestions.includes('color'), true)
    })

    it(`should not suggest alternatives marked with 'NOSUGGEST'`, () => {
      const suggestions: Array<string> = nodehun.suggestSync('bulshit')

      strictEqual(suggestions.includes('bullshit') || suggestions.includes('Bullshit'), false)
    })

    it(`should suggest based on replacements`, () => {
      const suggestions: Array<string> = nodehun.suggestSync('consize')

      strictEqual(suggestions.includes('concise'), true)
    })

    it(`should not overflow on too long values`, () => {
      const word = 'npmnpmnpmnpmnpmnpmnpmnpmnpmnpmnpmnpmnpmnpmnpm'
      deepEqual(nodehun.suggestSync(word), [])
    })
  })
})