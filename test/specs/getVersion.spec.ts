import { strictEqual } from 'assert'
import { TestContext, runWithAllConstructors } from '../utils/test-factory'

runWithAllConstructors('GetVersion Tests', (context: TestContext) => {
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