import { strictEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('GetDictionaryEncoding Tests', (context: TestContext) => {
  describe('Nodehun#getDictionaryEncoding()', () => {
    let nodehun: any

    beforeEach(() => {
      nodehun = context.factory.create('enUS')
    })

    it(`should return encoding as a string when known`, () => {
      strictEqual(nodehun.getDictionaryEncoding(), 'UTF-8')
    })
  })
})