import { fail, strictEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('Spell Tests', (context: TestContext) => {
  describe('#spell(word)', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, async () => {
      strictEqual(typeof nodehun.spell, 'function')
    })

    it(`should return a promise`, async () => {
      let success = false

      await nodehun.spell()
        .then(() => { })
        .catch(() => { })
        .finally(() => { success = true })

      strictEqual(success, true)
    })

    it(`should throw when 0 arguments are given`, async () => {
      try {
        await nodehun.spell()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, async () => {
      try {
        await nodehun.spell(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, async () => {
      try {
        await nodehun.spell(123456)
        fail()
      } catch {
        // success
      }
    })

    it(`should return true when the word is spelled correctly`, async () => {
      strictEqual(await nodehun.spell('color'), true)
    })

    it(`should return false when the word is not spelled correctly`, async () => {
      strictEqual(await nodehun.spell('colour'), false)
    })

    it(`should not throw when spellchecking emojis ☀`, async () => {
      await nodehun.spell('😀')
      await nodehun.spell('☀')
    })
  })

  describe('#spellSync(word)', () => {
    let nodehun: any
    let nodehunNL: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
      try {
        nodehunNL = context.factory.create('nl')
      } catch {
        // Dutch dictionary may not be available
      }
    })

    it(`should be a function`, async () => {
      strictEqual(typeof nodehun.spellSync, 'function')
    })

    it(`should throw when 0 arguments are given`, () => {
      try {
        nodehun.spellSync()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, () => {
      try {
        nodehun.spellSync(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, () => {
      try {
        nodehun.spellSync(123456)
        fail()
      } catch {
        // success
      }
    })

    it(`should return 'false' when a word is not correctly spelled`, () => {
      strictEqual(nodehun.spellSync('colour'), false)
    })

    it(`should return 'true' when a word is correctly spelled (1)`, () => {
      strictEqual(nodehun.spellSync('color'), true)
    })

    it(`should return 'true' when a word is correctly spelled (2)`, () => {
      strictEqual(nodehun.spellSync('c'), true)
    })

    it(`should return 'true' without word`, () => {
      strictEqual(nodehun.spellSync(' '), true)
    })

    it(`should return 'true' for non-words`, () => {
      strictEqual(nodehun.spellSync('.'), true)
    })

    it(`should check for sentence-case when upper-case (ok)`, () => {
      strictEqual(nodehun.spellSync('ABDUL'), true)
    })

    it(`should check for sentence-case when upper-case (not ok)`, () => {
      strictEqual(nodehun.spellSync('COLOUR'), false)
    })

    it(`should check for lower-case (ok)`, () => {
      strictEqual(nodehun.spellSync('Color'), true)
    })

    it(`should check for lower-case (not ok)`, () => {
      strictEqual(nodehun.spellSync('Colour'), false)
    })

    it(`should check for lower-case (not ok)`, () => {
      strictEqual(nodehun.spellSync('Colour'), false)
    })

    it(`should not check upper-case for sentence-case when KEEPCASE`, () => {
      if (nodehunNL) {
        strictEqual(nodehunNL.spellSync('DVD'), false)
      }
    })

    it(`should not check other casing for lower-case when KEEPCASE`, () => {
      if (nodehunNL) {
        strictEqual(nodehunNL.spellSync('dVd'), false)
      }
    })

    it(`should support ONLYINCOMPOUND (ok)`, () => {
      if (nodehunNL) {
        strictEqual(nodehunNL.spellSync('eierlevendbarend'), true)
      }
    })

    it(`should support ONLYINCOMPOUND (not ok)`, () => {
      if (nodehunNL) {
        strictEqual(nodehunNL.spellSync('eier'), false)
      }
    })

    it(`should support compounds (1)`, () => {
      strictEqual(nodehun.spellSync('21st'), true)
    })

    it(`should support compounds (2)`, () => {
      strictEqual(nodehun.spellSync('20st'), false)
    })

    it(`should support compounds (3)`, () => {
      strictEqual(nodehun.spellSync('20th'), true)
    })

    it(`should support compounds (4)`, () => {
      strictEqual(nodehun.spellSync('23st'), false)
    })

    it(`should support compounds (5)`, () => {
      strictEqual(nodehun.spellSync('23th'), false)
    })

    it(`should support compounds (6)`, () => {
      strictEqual(nodehun.spellSync('23rd'), true)
    })

    it(`should support compounds (7)`, () => {
      strictEqual(nodehun.spellSync('12th'), true)
    })

    it(`should support compounds (8)`, () => {
      strictEqual(nodehun.spellSync('22nd'), true)
    })

    it(`should not throw when spellchecking emojis ☀`, () => {
      nodehun.spellSync('😀')
      nodehun.spellSync('☀')
    })
  })
})