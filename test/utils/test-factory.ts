import { DICTIONARIES, DictionaryKey } from '../fixtures/dictionaries'

const Nodehun = require('bindings')('Nodehun')

export interface NodehunFactory {
  create(dict: DictionaryKey): any
  description: string
}

export interface TestContext {
  factory: NodehunFactory
  dictionaries: typeof DICTIONARIES
}

// Buffer-based constructor factory
export const bufferFactory: NodehunFactory = {
  description: 'Buffer Constructor',
  create(dict: DictionaryKey) {
    const config = DICTIONARIES[dict]
    if ('affixBuffer' in config) {
      return new Nodehun(config.affixBuffer, config.dictionaryBuffer)
    } else {
      // For dictionaries without affix files (like French)
      return new Nodehun(config.dictionaryBuffer, config.dictionaryBuffer)
    }
  }
}

// Path-based constructor factory  
export const pathFactory: NodehunFactory = {
  description: 'Path Constructor',
  create(dict: DictionaryKey) {
    const config = DICTIONARIES[dict]
    if ('affixPath' in config) {
      return new Nodehun(config.affixPath, config.dictionaryPath)
    } else {
      // For dictionaries without affix files (like French)
      return new Nodehun(config.dictionaryPath, config.dictionaryPath)
    }
  }
}

// All constructor types to test
export const CONSTRUCTOR_TYPES = [bufferFactory, pathFactory]

// Helper function to create test contexts
export function createTestContext(factory: NodehunFactory): TestContext {
  return {
    factory,
    dictionaries: DICTIONARIES
  }
}

// Test runner function that executes a test suite with all constructor types
export function runWithAllConstructors(
  suiteName: string, 
  testFn: (context: TestContext) => void
) {
  CONSTRUCTOR_TYPES.forEach(factory => {
    describe(`${suiteName} (${factory.description})`, () => {
      const context = createTestContext(factory)
      testFn(context)
    })
  })
}