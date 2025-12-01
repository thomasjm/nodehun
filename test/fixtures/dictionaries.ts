import * as fs from 'fs'
import * as path from 'path'

export interface DictionaryConfig {
  name: string
  affixPath?: string
  dictionaryPath: string
  affixBuffer?: Buffer
  dictionaryBuffer: Buffer
}

// Dictionary paths
const basePath = path.resolve(__dirname, '../../test/dictionaries')

// Helper functions to load files
function loadAffix(path: string): Buffer {
  return fs.readFileSync(path)
}

function loadDictionary(path: string): Buffer {
  return fs.readFileSync(path)
}

export const DICTIONARIES = {
  enUS: {
    name: 'English (US)',
    affixPath: path.join(basePath, 'en_us.aff'),
    dictionaryPath: path.join(basePath, 'en_us.dic'),
    affixBuffer: loadAffix(path.join(basePath, 'en_us.aff')),
    dictionaryBuffer: loadDictionary(path.join(basePath, 'en_us.dic'))
  },
  enGB: {
    name: 'English (GB)',
    affixPath: path.join(basePath, 'en_gb.aff'),
    dictionaryPath: path.join(basePath, 'en_gb.dic'),
    affixBuffer: loadAffix(path.join(basePath, 'en_gb.aff')),
    dictionaryBuffer: loadDictionary(path.join(basePath, 'en_gb.dic'))
  },
  fr: {
    name: 'French',
    dictionaryPath: path.join(basePath, 'fr.dic'),
    dictionaryBuffer: loadDictionary(path.join(basePath, 'fr.dic'))
  },
  nl: {
    name: 'Dutch',
    affixPath: path.join(basePath, 'nl.aff'),
    dictionaryPath: path.join(basePath, 'nl.dic'),
    affixBuffer: loadAffix(path.join(basePath, 'nl.aff')),
    dictionaryBuffer: loadDictionary(path.join(basePath, 'nl.dic'))
  }
}

export type DictionaryKey = keyof typeof DICTIONARIES
