import { load } from 'cheerio'
import { getFetch } from '../../cached_fetch.js'
import { getDEGameName, getFRGameName } from './TranslateGameName.js'

function getIndexOf (form, array) {
  let index = array.findIndex(f => f.form === form)
  if (index === -1) {
    index = array.push({
      form,
      entries: []
    }) - 1
  }
  return index
}

function getKeyword (keywords, value, defaultFormName, language) {
  if (value.toLowerCase() === defaultFormName) {
    return 'default'
  }
  for (let i = 0; i < keywords.length; i++) {
    if (keywords[i].flavor_texts_keyword === undefined) {
      continue
    }
    const keyword = keywords[i].flavor_texts_keyword.find(text => text.language === language)
    if (keyword !== undefined && keyword.name === value) {
      return keywords[i].flavor_texts_keyword.find(text => text.language === 'en').name
    }
  }
}

async function getFRPokedexEntries ($, keywords, name) {
  const data = []
  const currentGen = 9
  const startGen = currentGen - $('span[id="Descriptions_du_Pokédex"]').parent().next().children('tbody').children('tr').children('td').length + 2
  let games
  for (let gen = startGen; gen < currentGen; gen++) {
    let $gen
    if (gen === currentGen - 1) {
      $gen = $
    } else {
      const URL = `https://www.pokepedia.fr/${name.name}/Génération_${gen}`
      const pageHTML = await (await getFetch(URL)).text()
      $gen = load(pageHTML)
    }
    let elem = $gen('span[id="Descriptions_du_Pokédex"]').parent().next('table')
    let skip = false
    let form = 'default'
    if ($gen(elem).length === 0) {
      continue
    }
    elem = $gen(elem).next()
    while ($gen(elem)[0].name !== 'h2') {
      if ($gen(elem)[0].name === 'h3' || $gen(elem)[0].name === 'h4') {
        form = getKeyword(keywords, $gen(elem).text().replace('[modifier]', ''), 'forme normale', 'fr')
        if (form === undefined) {
          skip = true
        }
      } else if ($gen(elem)[0].name === 'dl' && !skip) {
        let entry = $gen(elem).children('dt').first()
        do {
          const text = $gen(entry).text().replace('\n', '')
          if ($gen(entry)[0].name === 'dt') {
            games = getFRGameName(text)
          } else if ($gen(entry)[0].name === 'dd') {
            for (let i = 0; i < games.length; i++) {
              const index = getIndexOf(form, data)
              data[index].entries.push({
                game: games[i],
                texts: [
                  {
                    name: text,
                    language: 'fr'
                  }
                ]
              })
            }
          }
          entry = $gen(entry).next()
        } while ($gen(entry).length !== 0)
      }
      elem = $gen(elem).next()
    }
  }
  return data
}

function getDEPokedexEntries ($, keywords) {
  const data = []
  let elem = $('span[id="Pokédex-Einträge"]').parent().next()
  let form = 'default'
  let skip = false
  let isFirstForm = true
  while ($(elem)[0].name !== 'h3') {
    if ($(elem)[0].name === 'dl') {
      if (!skip && isFirstForm) {
        isFirstForm = false
      } else {
        form = getKeyword(keywords, $(elem).text(), 'normalform', 'de')
        skip = form === undefined
      }
    } else if ($(elem)[0].name === 'div' && !skip) {
      $(elem).children('div').each((genIndex, gen) => {
        if (genIndex === 0) {
          return
        }
        let games
        $(gen).children('div').each((index, value) => {
          if (index === 0) {
            return
          }
          if (index % 2 === 1) {
            const DEgames = []
            $(value).children('span').children('a').each((__, game) => {
              DEgames.push($(game).children('span').attr('title'))
            })
            games = getDEGameName(DEgames)
          } else {
            for (let i = 0; i < games.length; i++) {
              const index = getIndexOf(form, data)
              data[index].entries.push({
                game: games[i],
                texts: [
                  {
                    name: $(value).text(),
                    language: 'de'
                  }
                ]
              })
            }
          }
        })
      })
    }
    elem = $(elem).next()
  }
  return data
}

function getITPokedexEntries ($, keywords) {
  const data = []
  return data
}

function getESPokedexEntries ($, keywords) {
  const data = []
  return data
}

function getJAPokedexEntries ($, keywords) {
  const data = []
  return data
}

function getZHHANTPokedexEntries ($, keywords) {
  const data = []
  return data
}

export async function getTranslatedPokedexEntries ($, name, keywords) {
  switch (name.language) {
    case 'fr':
      return await getFRPokedexEntries($, keywords, name)
    case 'de':
      return getDEPokedexEntries($, keywords)
    case 'it':
      return getITPokedexEntries($, keywords)
    case 'es':
      return getESPokedexEntries($, keywords)
    case 'ja':
      return getJAPokedexEntries($, keywords)
    case 'zh-Hant':
      return getZHHANTPokedexEntries($, keywords)
  }
  return []
}
