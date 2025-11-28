import { strictEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('Getter Tests', (context: TestContext) => {
  describe('Nodehun#getWordCharacters()', () => {
    let nodehun: any
    let nodehunGB: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
      nodehunGB = context.factory.create('enGB')
    })

    it(`should return the defined word-characters`, () => {
      strictEqual(nodehun.getWordCharacters(), `0123456789'.-’`)
    })

    it(`should return 'undefined' when not defined`, () => {
      strictEqual(nodehunGB.getWordCharacters(), undefined)
    })
  })

  describe('Nodehun#getWordCharactersUTF16()', () => {
    let nodehun: any
    let nodehunGB: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
      nodehunGB = context.factory.create('enGB')
    })

    it(`should return the defined word-characters`, () => {
      strictEqual(nodehun.getWordCharactersUTF16(), `'-.0123456789’`)
    })

    it(`should return 'undefined' when not defined`, () => {
      strictEqual(nodehunGB.getWordCharactersUTF16(), undefined)
    })
  })

  describe('Nodehun#getDictionaryEncoding()', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should return encoding as a string when known`, () => {
      strictEqual(nodehun.getDictionaryEncoding(), 'UTF-8')
    })
  })

  describe('Nodehun#getVersion()', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should return 'undefined' when not defined`, () => {
      strictEqual(nodehun.getVersion(), undefined)
    })
  })
})
