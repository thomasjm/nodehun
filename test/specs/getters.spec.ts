import { strictEqual, throws } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('Getter Methods Tests', (context: TestContext) => {
  let nodehun: any
  let nodehunGB: any

  beforeEach(() => {
    nodehun = context.factory.create('enUS')
    nodehunGB = context.factory.create('enGB')
  })

  describe('#getWordCharacters()', () => {
    it('should return the defined word-characters for US dictionary', () => {
      const result = nodehun.getWordCharacters()
      if (result !== undefined) {
        strictEqual(typeof result, 'string')
      }
    })

    it('should return the defined word-characters for GB dictionary', () => {
      const result = nodehunGB.getWordCharacters()
      if (result !== undefined) {
        strictEqual(typeof result, 'string')
      }
    })
  })

  describe('#getWordCharactersUTF16()', () => {
    it('should return the defined word-characters for US dictionary', () => {
      const result = nodehun.getWordCharactersUTF16()
      if (result !== undefined) {
        strictEqual(typeof result, 'string')
      }
    })

    it('should return the defined word-characters for GB dictionary', () => {
      const result = nodehunGB.getWordCharactersUTF16()
      if (result !== undefined) {
        strictEqual(typeof result, 'string')
      }
    })
  })

  describe('#getDictionaryEncoding()', () => {
    it('should return encoding as a string when known', () => {
      const result = nodehun.getDictionaryEncoding()
      strictEqual(typeof result, 'string')
    })
  })

  describe('#getVersion()', () => {
    it('should return "undefined" when not defined', () => {
      const result = nodehun.getVersion()
      strictEqual(result, undefined)
    })
  })
})