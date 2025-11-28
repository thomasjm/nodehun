import { fail, strictEqual, notEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('Dictionary Management Tests', (context: TestContext) => {
  describe('Nodehun#add(word)', () => {
    let nodehun: any

    beforeEach(() => {
      // clear changes before each test
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, async () => {
      strictEqual(typeof nodehun.add, 'function')
    })

    it(`should return a promise`, async () => {
      let success = false

      await nodehun.add()
        .then(() => { })
        .catch(() => { })
        .finally(() => { success = true })

      strictEqual(success, true)
    })

    it(`should throw when 0 arguments are given`, async () => {
      try {
        await nodehun.add()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, async () => {
      try {
        await nodehun.add(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, async () => {
      try {
        await nodehun.add(123456)
        fail()
      } catch {
        // success
      }
    })

    it(`should now mark as correct`, async () => {
      const word = 'npm'
      strictEqual(await nodehun.spell(word), false)
      await nodehun.add('npm')
      strictEqual(await nodehun.spell(word), true)
    })

    it(`should no longer receive suggestions`, async () => {
      const word = 'npm'

      notEqual(await nodehun.suggest(word), null)
      await nodehun.add(word)
      strictEqual(await nodehun.suggest(word), null)
    })
  })

  describe('Nodehun#addSync(value)', () => {
    let nodehun: any

    beforeEach(() => {
      // clear changes before each test
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, () => {
      strictEqual(typeof nodehun.addSync, 'function')
    })

    it(`should throw when 0 arguments are given`, () => {
      try {
        nodehun.addSync()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, () => {
      try {
        nodehun.addSync(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, () => {
      try {
        nodehun.addSync(123456)
        fail()
      } catch {
        // success
      }
    })

    it(`should now mark as correct`, () => {
      const word = 'npm'

      strictEqual(nodehun.spellSync(word), false)
      nodehun.addSync(word)
      strictEqual(nodehun.spellSync(word), true)
    })

    it(`should no longer receive suggestions`, () => {
      const word = 'npm'

      notEqual(nodehun.suggestSync(word), null)
      nodehun.addSync(word)
      strictEqual(nodehun.suggestSync(word), null)
    })
  })

  describe('Nodehun#remove(word)', () => {
    let nodehun: any

    beforeEach(() => {
      // clear changes before each test
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, async () => {
      strictEqual(typeof nodehun.remove, 'function')
    })

    it(`should return a promise`, async () => {
      let success = false

      await nodehun.remove()
        .then(() => { })
        .catch(() => { })
        .finally(() => { success = true })

      strictEqual(success, true)
    })

    it(`should throw when 0 arguments are given`, async () => {
      try {
        await nodehun.remove()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, async () => {
      try {
        await nodehun.remove(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, async () => {
      try {
        await nodehun.remove(123456)
        fail()
      } catch {
        // success
      }
    })

    it(`should now mark as correct`, async () => {
      const word = 'npm'

      await nodehun.add(word)
      strictEqual(await nodehun.spell(word), true)
      await nodehun.remove('npm')
      strictEqual(await nodehun.spell(word), false)
    })

    it(`should no longer receive suggestions`, async () => {
      const word = 'npm'

      await nodehun.add(word)
      strictEqual(await nodehun.suggest(word), null)
      await nodehun.remove(word)
      notEqual(await nodehun.suggest(word), null)
    })
  })

  describe('Nodehun#removeSync(value)', () => {
    let nodehun: any

    beforeEach(() => {
      // clear changes before each test
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, () => {
      strictEqual(typeof nodehun.removeSync, 'function')
    })

    it(`should throw when 0 arguments are given`, () => {
      try {
        nodehun.removeSync()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, () => {
      try {
        nodehun.removeSync(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, () => {
      try {
        nodehun.removeSync(123456)
        fail()
      } catch {
        // success
      }
    })

    it(`should now mark as correct`, () => {
      const word = 'npm'

      nodehun.addSync(word)
      strictEqual(nodehun.spellSync(word), true)
      nodehun.removeSync(word)
      strictEqual(nodehun.spellSync(word), false)
    })

    it(`should no longer receive suggestions`, () => {
      const word = 'npm'

      nodehun.addSync(word)
      strictEqual(nodehun.suggestSync(word), null)
      nodehun.removeSync(word)
      notEqual(nodehun.suggestSync(word), null)
    })
  })

  describe('Nodehun#addDictionary(dictionary: Buffer): Promise<void>;', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, () => {
      strictEqual(typeof nodehun.addDictionary, 'function')
    })

    it(`should return a promise`, async () => {
      let success = false
      await nodehun.addDictionary()
        .then(() => { })
        .catch(() => { })
        .finally(() => { success = true })

      strictEqual(success, true)
    })

    it(`should throw when no arguments are given`, async () => {
      try {
        await nodehun.addDictionary()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, async () => {
      try {
        await nodehun.addDictionary(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, async () => {
      try {
        await nodehun.addDictionary(1)
        fail()
      } catch {
        // success
      }
    })

    it(`should mark correct after dictionary is added`, async () => {
      // Use appropriate method and format based on constructor type
      if (context.factory.description.includes('Path')) {
        await nodehun.addDictionaryPath(context.dictionaries.fr.dictionaryPath)
      } else {
        await nodehun.addDictionary(context.dictionaries.fr.dictionaryBuffer)
      }
      strictEqual(await nodehun.spell('bonjour'), true)
    })
  })

  describe('Nodehun#addDictionarySync(dictionary: Buffer): void;', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, () => {
      strictEqual(typeof nodehun.addDictionarySync, 'function')
    })

    it(`should throw when no arguments are given`, () => {
      try {
        nodehun.addDictionarySync()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 2 arguments are given`, () => {
      try {
        nodehun.addDictionarySync(1, 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, () => {
      try {
        nodehun.addDictionarySync(1)
        fail()
      } catch {
        // success
      }
    })

    it(`should mark correct after dictionary is added`, async () => {
      // Use appropriate method and format based on constructor type
      if (context.factory.description.includes('Path')) {
        nodehun.addDictionaryPathSync(context.dictionaries.fr.dictionaryPath)
      } else {
        nodehun.addDictionarySync(context.dictionaries.fr.dictionaryBuffer)
      }
      strictEqual(nodehun.spellSync('bonjour'), true)
    })
  })

  describe('Nodehun#addWithAffix(word: string, example: string): Promise<void>;', () => {
    let nodehun: any

    beforeEach(() => {
      // clear changes before every test
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, () => {
      strictEqual(typeof nodehun.addWithAffix, 'function')
    })

    it(`should return a promise`, async () => {
      let success = false
      await nodehun.addWithAffix()
        .then(() => { })
        .catch(() => { })
        .finally(() => { success = true })

      strictEqual(success, true)
    })

    it(`should throw when no arguments are given`, async () => {
      try {
        await nodehun.addWithAffix()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 3 arguments are given`, async () => {
      try {
        await nodehun.addWithAffix(1, 2, 3)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, async () => {
      try {
        await nodehun.addWithAffix(1)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the second argument isn't a string`, async () => {
      try {
        await nodehun.addWithAffix('abc', 1)
        fail()
      } catch {
        // success
      }
    })

    it(`should mark correct`, async () => {
      await nodehun.addWithAffix('colour', 'color')
      const result = await nodehun.spell('colouring')
      strictEqual(result, true)
    })
  })

  describe('Nodehun#addWithAffixSync(word: string, example: string): void;', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should be a function`, () => {
      strictEqual(typeof nodehun.addWithAffixSync, 'function')
    })

    it(`should throw when no arguments are given`, () => {
      try {
        nodehun.addWithAffixSync()
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when 3 arguments are given`, () => {
      try {
        nodehun.addWithAffixSync(1, 2, 3)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the first argument isn't a string`, () => {
      try {
        nodehun.addWithAffixSync(1)
        fail()
      } catch {
        // success
      }
    })

    it(`should throw when the second argument isn't a string`, () => {
      try {
        nodehun.addWithAffixSync('abc', 2)
        fail()
      } catch {
        // success
      }
    })

    it(`should mark correct`, async () => {
      nodehun.addWithAffixSync('colour', 'color')
      strictEqual(nodehun.spellSync('colouring'), true)
    })
  })
})
