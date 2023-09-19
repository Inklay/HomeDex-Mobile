import { load } from 'cheerio'
import { getTranslatedCategory } from './getTranslatedCategory.js'
import { getFetch } from '../../cached_fetch.js'

function createURL (name) {
  switch (name.language) {
    case 'fr':
      return `https://www.pokepedia.fr/${name.name}`
    case 'de':
      return `https://www.pokewiki.de/${name.name}`
    case 'es':
      return `https://www.wikidex.net/wiki/${name.name}`
    case 'it':
      return `https://wiki.pokemoncentral.it/${name.name}`
    case 'ja':
      return `https://wiki.ポケモン.com/wiki/${name.name}`
    case 'zh-Hant':
      return `https://wiki.52poke.com/wiki/${name.name}`
  }
}

export async function getTranslatedData (translatedNames) {
  const data = {}
  for (let i = 0; i < translatedNames.length; i++) {
    const URL = createURL(translatedNames[i])
    if (URL === undefined) {
      continue
    }
    const pageHTML = await (await getFetch(URL)).text()
    const $ = load(pageHTML)
    if (data.category === undefined) {
      data.category = []
    }
    data.category = [
      ...data.category,
      ...await getTranslatedCategory($, translatedNames[i])
    ]
  }
  return data
}
