import { load } from 'cheerio'

const baseURL = 'https://bulbapedia.bulbagarden.net'

async function getPokemonURLList () {
  const list = []
  const URL = `${baseURL}/wiki/List_of_Pokémon_by_National_Pokédex_number`
  const pageHTML = await (await fetch(URL)).text()
  const $ = load(pageHTML)
  // Get all tables with class roundy (one for each generation)
  $('table.roundy').each((__, tbody) => {
    // Get all links in the third column of each table row (link to pokemon page)
    $('tbody tr td:nth-child(3) a', tbody).each((__, pokemonLink) => {
      const link = $(pokemonLink).attr('href')
      // Skip different forms
      if (link.search('(type)') !== -1) {
        return
      }
      list.push(link)
    })
  })
  return list
}

function isVisible ($, element) {
  if ($(element).attr('style') === undefined) {
    return true
  }
  if ($(element).attr('style').search('display:none') !== -1) {
    return false
  }
  if ($(element).attr('style').search('display: none') !== -1) {
    return false
  }
  return true
}

function getTypeNumber (type) {
  switch (type) {
    case 'Fighting':
      return 2
    case 'Flying':
      return 3
    case 'Poison':
      return 4
    case 'Ground':
      return 5
    case 'Rock':
      return 6
    case 'Bug':
      return 7
    case 'Ghost':
      return 8
    case 'Steel':
      return 9
    case 'Fire':
      return 10
    case 'Water':
      return 11
    case 'Grass':
      return 12
    case 'Electric':
      return 13
    case 'Psychic':
      return 14
    case 'Ice':
      return 15
    case 'Dragon':
      return 16
    case 'Dark':
      return 17
    case 'Fairy':
      return 18
    default:
      return 1
  }
}

function processType ($, pokemonName) {
  const types = []
  $('table.roundy > tbody > tr > td.roundy > b > a[title=\'Type\']')
    .parent()
    .parent()
    .children('table.roundy')
    .children('tbody')
    .children('tr')
    .children('td').each((__, element) => {
      types.push()
      if (!isVisible($, element)) {
        return
      }
      // Get form name for those types
      let formName = $(element).children('small').text()
      const formTypes = []
      $(element)
        .children('table')
        .children('tbody')
        .children('tr')
        .children('td').each((__, typeElement) => {
          if (!isVisible($, typeElement)) {
            return
          }
          formTypes.push(getTypeNumber($(typeElement).children('a').attr('title').replace(' (type)', '')))
        })
      // If the pokemon has only one form, put default name
      if (formName === '') {
        formName = pokemonName
      }
      types.push(
        {
          name: formName,
          types: formTypes
        }
      )
    })
  return types
}

function processDexNumbers ($) {
  const dexNumbers = {
    nat: parseInt($('table.roundy > tbody > tr > td > table > tbody > tr > th > big > big > a > span').text().replace('#', ''))
  }
  return dexNumbers
}

function processForms ($) {
  const forms = []
  $('table.roundy > tbody > tr > td > table > tbody > tr > td > big')
    .parent()
    .parent()
    .parent()
    .parent()
    .parent()
    .parent()
    .next()
    .children('td')
    .children('table')
    .children('tbody')
    .children('tr').each((index, element) => {
      // Index 3 is just a link to the Bulbagarden archive
      if (index === 3) {
        return
      }
      if (!isVisible($, element)) {
        return
      }
      // Index 0 is always the base form
      if (index === 0) {
        forms.push({
          names: [
            {
              name: $('table.roundy > tbody > tr > td > table > tbody > tr > td > big> big > b').text(),
              language: 'en'
            }
          ],
          form_name: 'default'
        })
        return
      }
      // Oher forms
      $(element).children('td').each((__, formElement) => {
        if (!isVisible($, formElement)) {
          return
        }
        // Get form name for filtering
        const fullName = $(formElement).children('small').text()
        const lowerCaseName = fullName.toLowerCase()
        let formName = 'other'
        if (lowerCaseName.includes('mega')) {
          formName = 'mega'
        } else if (lowerCaseName.includes('gigantamax')) {
          formName = 'gmax'
        } else if (lowerCaseName.includes('alola')) {
          formName = 'alola'
        } else if (lowerCaseName.includes('galar')) {
          formName = 'galar'
        } else if (lowerCaseName.includes('hisui')) {
          formName = 'hisui'
        } else if (lowerCaseName.includes('paldea')) {
          formName = 'paldea'
        }
        forms.push({
          names: [
            {
              name: fullName,
              language: 'en'
            }
          ],
          form_name: formName
        })
      })
    })
  return forms
}

async function getPokemonData (pokemonURL) {
  const URL = `${baseURL}${pokemonURL}`
  const pageHTML = await (await fetch(URL)).text()
  const $ = load(pageHTML)
  const pokemons = processForms($)
  const dexNumbers = processDexNumbers($)
  const types = processType($, pokemons[0].names[0].name)
  for (let i = 0; i < pokemons.length; i++) {
    pokemons[i].dex_numbers = dexNumbers
    let formTypes = types.find(type => type.name === pokemons[i].names[0].name)
    // If the form has the same type as the base form
    if (formTypes === undefined) {
      formTypes = types[0]
    }
    pokemons[i].types = formTypes.types
  }
}

const pokemonURLList = await getPokemonURLList()

await getPokemonData(pokemonURLList[0])
await getPokemonData(pokemonURLList[1])
await getPokemonData(pokemonURLList[3])
await getPokemonData(pokemonURLList[5])
await getPokemonData(pokemonURLList[24])
await getPokemonData(pokemonURLList[51])
await getPokemonData(pokemonURLList[129])
await getPokemonData(pokemonURLList[799])
await getPokemonData(pokemonURLList[1005])

/*
const pokemonData = []

for (let i = 0; i < pokemonURLList.length; i++) {
  pokemonData.push(await getPokemonData(pokemonURLList[i]))
}

*/
