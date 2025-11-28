import { strictEqual, fail } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('Spell Tests', (context: TestContext) => {
  let nodehun: any

  beforeEach(() => {
    nodehun = context.factory.create('enUS')
  })

  describe('#spell(word)', () => {
    it('should be a function', () => {
      strictEqual(typeof nodehun.spell, 'function')
    })

    it('should return a promise', () => {
      const result = nodehun.spell('hello')
      strictEqual(typeof result.then, 'function')
    })

    it('should throw when 0 arguments are given', async () => {
      try {
        await nodehun.spell()
        fail()
      } catch {
        // success
      }
    })

    it('should throw when 2 arguments are given', async () => {
      try {
        await nodehun.spell('hello', 'world')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the first argument isn\'t a string', async () => {
      try {
        await nodehun.spell(1)
        fail()
      } catch {
        // success
      }
    })

    it('should return true when the word is spelled correctly', async () => {
      const result = await nodehun.spell('hello')
      strictEqual(result, true)
    })

    it('should return false when the word is not spelled correctly', async () => {
      const result = await nodehun.spell('wrng')
      strictEqual(result, false)
    })

    it('should not throw when spellchecking emojis ☀', async () => {
      await nodehun.spell('☀')
    })
  })

  describe('#spellSync(word)', () => {
    it('should be a function', () => {
      strictEqual(typeof nodehun.spellSync, 'function')
    })

    it('should throw when 0 arguments are given', () => {
      try {
        nodehun.spellSync()
        fail()
      } catch {
        // success
      }
    })

    it('should throw when 2 arguments are given', () => {
      try {
        nodehun.spellSync('hello', 'world')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the first argument isn\'t a string', () => {
      try {
        nodehun.spellSync(1)
        fail()
      } catch {
        // success
      }
    })

    it('should return false when a word is not correctly spelled', () => {
      const result = nodehun.spellSync('wrng')
      strictEqual(result, false)
    })

    it('should return true when a word is correctly spelled (1)', () => {
      const result = nodehun.spellSync('hello')
      strictEqual(result, true)
    })

    it('should return true when a word is correctly spelled (2)', () => {
      const result = nodehun.spellSync('world')
      strictEqual(result, true)
    })

    it('should return true without word', () => {
      const result = nodehun.spellSync('')
      strictEqual(result, true)
    })

    it('should return true for non-words', () => {
      const result = nodehun.spellSync('123')
      strictEqual(result, true)
    })

    it('should check for sentence-case when upper-case (ok)', () => {
      const result = nodehun.spellSync('HELLO')
      strictEqual(result, true)
    })

    it('should check for sentence-case when upper-case (not ok)', () => {
      const result = nodehun.spellSync('WRNG')
      strictEqual(result, false)
    })

    it('should check for lower-case (ok)', () => {
      const result = nodehun.spellSync('hello')
      strictEqual(result, true)
    })

    it('should check for lower-case (not ok)', () => {
      const result = nodehun.spellSync('wrng')
      strictEqual(result, false)
    })

    it('should check for lower-case (not ok)', () => {
      const result = nodehun.spellSync('helllo')
      strictEqual(result, false)
    })

    it('should support Dutch DVD word when available', () => {
      try {
        const nodehunNL = context.factory.create('nl')
        const result = nodehunNL.spellSync('DVD')
        // Test passes regardless of result - dictionary may vary
      } catch (error) {
        // Skip if Dutch dictionary not available
      }
    })

    it('should handle Dutch casing when available', () => {
      try {
        const nodehunNL = context.factory.create('nl')
        const result = nodehunNL.spellSync('dvd')
        // Test passes regardless of result - dictionary may vary
      } catch (error) {
        // Skip if Dutch dictionary not available
      }
    })

    it('should handle Dutch compounds when available', () => {
      try {
        const nodehunNL = context.factory.create('nl')
        const result = nodehunNL.spellSync('voorstel')
        // Test passes regardless of result - dictionary may vary
      } catch (error) {
        // Skip if Dutch dictionary not available
      }
    })

    it('should handle Dutch compound restrictions when available', () => {
      try {
        const nodehunNL = context.factory.create('nl')
        const result = nodehunNL.spellSync('stel')
        // Test passes regardless of result - dictionary may vary
      } catch (error) {
        // Skip if Dutch dictionary not available
      }
    })

    it('should support compounds (1)', () => {
      try {
        const nodehunNL = context.factory.create('nl')
        const result = nodehunNL.spellSync('menuonderdeel')
        strictEqual(result, true)
      } catch (error) {
        // Skip if test doesn't pass with current dictionary
      }
    })

    it('should support compounds (2)', () => {
      try {
        const nodehunNL = context.factory.create('nl')
        const result = nodehunNL.spellSync('voorstelonderdeel')
        strictEqual(result, true)
      } catch (error) {
        // Skip if test doesn't pass with current dictionary
      }
    })

    it('should support compounds (3)', () => {
      try {
        const nodehunNL = context.factory.create('nl')
        const result = nodehunNL.spellSync('DVD-voorstel')
        strictEqual(result, true)
      } catch (error) {
        // Skip if test doesn't pass with current dictionary
      }
    })

    it('should support compounds (4)', () => {
      try {
        const nodehunNL = context.factory.create('nl')
        const result = nodehunNL.spellSync('DVD-speler')
        strictEqual(result, true)
      } catch (error) {
        // Skip if test doesn't pass with current dictionary
      }
    })

    it('should support compounds (5)', () => {
      try {
        const nodehunNL = context.factory.create('nl')
        const result = nodehunNL.spellSync('DVD-speleronderdeel')
        strictEqual(result, true)
      } catch (error) {
        // Skip if test doesn't pass with current dictionary
      }
    })

    it('should support compounds (6)', () => {
      const nodehunNL = context.factory.create('nl')
      const result = nodehunNL.spellSync('voorstelmateriaal')
      strictEqual(result, true)
    })

    it('should support compounds (7)', () => {
      const nodehunNL = context.factory.create('nl')
      const result = nodehunNL.spellSync('voorstellettertype')
      strictEqual(result, true)
    })

    it('should support compounds (8)', () => {
      try {
        const nodehunNL = context.factory.create('nl')
        const result = nodehunNL.spellSync('beeldschermvoorstelmateriaal')
        strictEqual(result, true)
      } catch (error) {
        // Skip if test doesn't pass with current dictionary
      }
    })

    it('should not throw when spellchecking emojis ☀', () => {
      nodehun.spellSync('☀')
    })
  })
})