import { strictEqual, fail, notEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('Dictionary Management Tests', (context: TestContext) => {
  let nodehun: any

  beforeEach(() => {
    nodehun = context.factory.create('enUS')
  })

  describe('#addDictionary(dictionary)', () => {
    it('should be a function', () => {
      strictEqual(typeof nodehun.addDictionary, 'function')
    })

    it('should return a promise', () => {
      const result = nodehun.addDictionary(context.dictionaries.fr.dictionaryBuffer)
      strictEqual(typeof result.then, 'function')
    })

    it('should throw when no arguments are given', async () => {
      try {
        await nodehun.addDictionary()
        fail()
      } catch {
        // success
      }
    })

    it('should throw when 2 arguments are given', async () => {
      try {
        await nodehun.addDictionary(context.dictionaries.fr.dictionaryBuffer, 'extra')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the first argument isn\'t a buffer', async () => {
      try {
        await nodehun.addDictionary('string')
        fail()
      } catch {
        // success
      }
    })

    it('should mark correct after dictionary is added', async () => {
      await nodehun.addDictionary(context.dictionaries.fr.dictionaryBuffer)
      strictEqual(await nodehun.spell('bonjour'), true)
    })
  })

  describe('#addDictionarySync(dictionary)', () => {
    it('should be a function', () => {
      strictEqual(typeof nodehun.addDictionarySync, 'function')
    })

    it('should throw when no arguments are given', () => {
      try {
        nodehun.addDictionarySync()
        fail()
      } catch {
        // success
      }
    })

    it('should throw when 2 arguments are given', () => {
      try {
        nodehun.addDictionarySync(context.dictionaries.fr.dictionaryBuffer, 'extra')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the first argument isn\'t a buffer', () => {
      try {
        nodehun.addDictionarySync('string')
        fail()
      } catch {
        // success
      }
    })

    it('should mark correct after dictionary is added', () => {
      const before = nodehun.spellSync('bonjour')
      nodehun.addDictionarySync(context.dictionaries.fr.dictionaryBuffer)
      const after = nodehun.spellSync('bonjour')
      strictEqual(before, false)
      strictEqual(after, true)
    })
  })

  describe('#add(word)', () => {
    it('should be a function', () => {
      strictEqual(typeof nodehun.add, 'function')
    })

    it('should return a promise', () => {
      const result = nodehun.add('testword')
      strictEqual(typeof result.then, 'function')
    })

    it('should throw when no arguments are given', async () => {
      try {
        await nodehun.add()
        fail()
      } catch {
        // success
      }
    })

    it('should throw when 2 arguments are given', async () => {
      try {
        await nodehun.add('hello', 'world')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the first argument isn\'t a string', async () => {
      try {
        await nodehun.add(1)
        fail()
      } catch {
        // success
      }
    })

    it('should now mark as correct', async () => {
      const before = nodehun.spellSync('testword')
      await nodehun.add('testword')
      const after = nodehun.spellSync('testword')
      strictEqual(before, false)
      strictEqual(after, true)
    })

    it('should no longer receive suggestions', async () => {
      const word = 'npm'
      notEqual(await nodehun.suggest(word), null)  // Initially gets suggestions
      await nodehun.add(word)
      strictEqual(await nodehun.suggest(word), null)  // No longer gets suggestions
    })
  })

  describe('#addSync(word)', () => {
    it('should be a function', () => {
      strictEqual(typeof nodehun.addSync, 'function')
    })

    it('should throw when no arguments are given', () => {
      try {
        nodehun.addSync()
        fail()
      } catch {
        // success
      }
    })

    it('should throw when 2 arguments are given', () => {
      try {
        nodehun.addSync('hello', 'world')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the first argument isn\'t a string', () => {
      try {
        nodehun.addSync(1)
        fail()
      } catch {
        // success
      }
    })

    it('should now mark as correct', () => {
      const before = nodehun.spellSync('testword2')
      nodehun.addSync('testword2')
      const after = nodehun.spellSync('testword2')
      strictEqual(before, false)
      strictEqual(after, true)
    })

    it('should no longer receive suggestions', () => {
      const word = 'npm'
      notEqual(nodehun.suggestSync(word), null)  // Initially gets suggestions
      nodehun.addSync(word)
      strictEqual(nodehun.suggestSync(word), null)  // No longer gets suggestions
    })
  })

  describe('#addWithAffix(word, example)', () => {
    it('should be a function', () => {
      strictEqual(typeof nodehun.addWithAffix, 'function')
    })

    it('should return a promise', () => {
      const result = nodehun.addWithAffix('test', 'hello')
      strictEqual(typeof result.then, 'function')
    })

    it('should throw when no arguments are given', async () => {
      try {
        await nodehun.addWithAffix()
        fail()
      } catch {
        // success
      }
    })

    it('should throw when 3 arguments are given', async () => {
      try {
        await nodehun.addWithAffix('hello', 'world', 'test')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the first argument isn\'t a string', async () => {
      try {
        await nodehun.addWithAffix(1, 'world')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the second argument isn\'t a string', async () => {
      try {
        await nodehun.addWithAffix('hello', 2)
        fail()
      } catch {
        // success
      }
    })

    it('should mark correct', async () => {
      const before = nodehun.spellSync('testword4')
      await nodehun.addWithAffix('testword4', 'hello')
      const after = nodehun.spellSync('testword4')
      strictEqual(before, false)
      strictEqual(after, true)
    })
  })

  describe('#addWithAffixSync(word, example)', () => {
    it('should be a function', () => {
      strictEqual(typeof nodehun.addWithAffixSync, 'function')
    })

    it('should throw when no arguments are given', () => {
      try {
        nodehun.addWithAffixSync()
        fail()
      } catch {
        // success
      }
    })

    it('should throw when 3 arguments are given', () => {
      try {
        nodehun.addWithAffixSync('hello', 'world', 'test')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the first argument isn\'t a string', () => {
      try {
        nodehun.addWithAffixSync(1, 'world')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the second argument isn\'t a string', () => {
      try {
        nodehun.addWithAffixSync('hello', 2)
        fail()
      } catch {
        // success
      }
    })

    it('should mark correct', () => {
      const before = nodehun.spellSync('testword5')
      nodehun.addWithAffixSync('testword5', 'hello')
      const after = nodehun.spellSync('testword5')
      strictEqual(before, false)
      strictEqual(after, true)
    })
  })

  describe('#remove(word)', () => {
    let testNodehun: any

    beforeEach(() => {
      testNodehun = context.factory.create('enUS')
    })

    it('should be a function', () => {
      strictEqual(typeof testNodehun.remove, 'function')
    })

    it('should return a promise', () => {
      const result = testNodehun.remove('hello')
      strictEqual(typeof result.then, 'function')
    })

    it('should throw when no arguments are given', async () => {
      try {
        await testNodehun.remove()
        fail()
      } catch {
        // success
      }
    })

    it('should throw when 2 arguments are given', async () => {
      try {
        await testNodehun.remove('hello', 'world')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the first argument isn\'t a string', async () => {
      try {
        await testNodehun.remove(1)
        fail()
      } catch {
        // success
      }
    })

    it('should now mark as correct', async () => {
      const before = testNodehun.spellSync('hello')
      await testNodehun.remove('hello')
      const after = testNodehun.spellSync('hello')
      strictEqual(before, true)
      strictEqual(after, false)
    })

    it('should no longer receive suggestions', async () => {
      const word = 'npm'
      await testNodehun.add(word)  // Add it first
      strictEqual(await testNodehun.suggest(word), null)  // No suggestions after adding
      await testNodehun.remove(word)
      notEqual(await testNodehun.suggest(word), null)  // Gets suggestions again after removing
    })
  })

  describe('#removeSync(word)', () => {
    let testNodehun: any

    beforeEach(() => {
      testNodehun = context.factory.create('enUS')
    })

    it('should be a function', () => {
      strictEqual(typeof testNodehun.removeSync, 'function')
    })

    it('should throw when no arguments are given', () => {
      try {
        testNodehun.removeSync()
        fail()
      } catch {
        // success
      }
    })

    it('should throw when 2 arguments are given', () => {
      try {
        testNodehun.removeSync('hello', 'world')
        fail()
      } catch {
        // success
      }
    })

    it('should throw when the first argument isn\'t a string', () => {
      try {
        testNodehun.removeSync(1)
        fail()
      } catch {
        // success
      }
    })

    it('should now mark as correct', () => {
      const before = testNodehun.spellSync('hello')
      testNodehun.removeSync('hello')
      const after = testNodehun.spellSync('hello')
      strictEqual(before, true)
      strictEqual(after, false)
    })

    it('should no longer receive suggestions', () => {
      const word = 'npm'
      testNodehun.addSync(word)  // Add it first
      strictEqual(testNodehun.suggestSync(word), null)  // No suggestions after adding
      testNodehun.removeSync(word)
      notEqual(testNodehun.suggestSync(word), null)  // Gets suggestions again after removing
    })
  })
})