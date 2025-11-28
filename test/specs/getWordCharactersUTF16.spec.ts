import { strictEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('GetWordCharactersUTF16 Tests', (context: TestContext) => {
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
})
