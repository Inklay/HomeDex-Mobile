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

function getEggGroupsNumber (eggGroup) {
  switch (eggGroup) {
    case 'Water 1':
      return 2
    case 'Water 2':
      return 3
    case 'Water 3':
      return 4
    case 'Bug':
      return 5
    case 'Flying':
      return 6
    case 'Fairy':
      return 7
    case 'Grass':
      return 8
    case 'Human_Like':
      return 9
    case 'Mineral':
      return 10
    case 'Amorphous':
      return 11
    case 'Dragon':
      return 12
    case 'Ditto':
      return 13
    case 'No Eggs Discovered':
      return 14
    case 'Field':
      return 15
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

function processBaseFriendship ($) {
  const baseFrienship = $('table.roundy > tbody > tr > td.roundy > b > a[title=\'List of Pokémon by base friendship\']')
    .parent()
    .next('table')
    .children('tbody')
    .children('tr')
    .children('td')
    .text()
  return parseInt(baseFrienship)
}

function processCatchRate ($) {
  const catchRate = $('table.roundy > tbody > tr > td.roundy > b > a[title=\'Catch rate\']')
    .parent()
    .next('table')
    .children('tbody')
    .children('tr')
    .children('td')
    .text()
  const fixedCatchRate = catchRate.slice(0, catchRate.search(' '))
  return parseInt(fixedCatchRate)
}

function processHeight ($) {
  const heightList = []
  const heightElementArray = $('table.roundy > tbody > tr > td.roundy > b > a[title=\'List of Pokémon by height\']')
    .parent()
    .next('table')
    .children('tbody')
    .children('tr')
  for (let i = 0; i < heightElementArray.length; i += 2) {
    if (!isVisible($, heightElementArray[i])) {
      continue
    }
    const height = $(heightElementArray[i]).children('td').next().text()
    const name = $(heightElementArray[i + 1]).children('td').children('small').text()
    heightList.push({
      height: parseFloat(height),
      name
    })
  }
  return heightList
}

function processWeight ($) {
  const weightList = []
  const weightElementArray = $('table.roundy > tbody > tr > td.roundy > b > a[title=\'Weight\']')
    .parent()
    .next('table')
    .children('tbody')
    .children('tr')
  for (let i = 0; i < weightElementArray.length; i += 2) {
    if (!isVisible($, weightElementArray[i])) {
      continue
    }
    const weight = $(weightElementArray[i]).children('td').next().text()
    const name = $(weightElementArray[i + 1]).children('td').children('small').text()
    weightList.push({
      weight: parseFloat(weight),
      name
    })
  }
  return weightList
}

function processEggGroups ($) {
  const eggGroups = []
  $('a[title=\'Egg Group\']')
    .parent()
    .next('table')
    .children('tbody')
    .children('tr')
    .children('td')
    .children('a')
    .each((__, element) => {
      eggGroups.push(getEggGroupsNumber($(element).text()))
    })
  return eggGroups
}

function processGenderRatio ($) {
  let femaleRatio
  $('a[title=\'List of Pokémon by gender ratio\']')
    .parent()
    .next('table')
    .children('tbody')
    .children('tr')
    .each((index, element) => {
      const ratioText = $(element).children('td').children('a').children('span').text()
      if ((index === 0 && ratioText !== undefined && ratioText.search('unknown') !== -1) || (index === 1 && femaleRatio === undefined)) {
        femaleRatio = ratioText
      }
    })
  if (femaleRatio === 'Gender unknown') {
    return -1
  }
  if (femaleRatio === '100% female') {
    return 8
  }
  if (femaleRatio === '12.5% male,87.5 female') {
    return 7
  }
  if (femaleRatio === '25% male,75% female') {
    return 6
  }
  if (femaleRatio === '50% male,50% female') {
    return 4
  }
  if (femaleRatio === '75% male,25% female') {
    return 2
  }
  if (femaleRatio === '87.5% male,12.5% female') {
    return 1
  }
  if (femaleRatio === '100% male') {
    return 0
  }
}

function processGrowthRate ($) {
  let rate
  $('td.roundy > b > a[title=\'Experience\'] > span')
    .each((__, element) => {
      if ($(element).text() !== 'Leveling rate') {
        return
      }
      rate = $(element)
        .parent()
        .parent()
        .next('table')
        .children('tbody')
        .children('tr')
        .children('td')
        .text()
        .replace(' ', '-')
        .toLowerCase()
        .slice(0, -1)
    })
  return rate
}

function fixRandomStuff (pokemon) {
  if (pokemon.dex_numbers.nat === 25) {
    if (pokemon.form_name === 'other') {
      pokemon.egg_groups = [14]
    } else {
      pokemon.egg_groups = [15, 7]
    }
  }
  return pokemon
}

async function getPokemonData (pokemonURL) {
  const URL = `${baseURL}${pokemonURL}`
  const pageHTML = await (await fetch(URL)).text()
  const $ = load(pageHTML)
  const pokemons = processForms($)
  const dexNumbers = processDexNumbers($)
  const types = processType($, pokemons[0].names[0].name)
  const baseFriendship = processBaseFriendship($)
  const catchRate = processCatchRate($)
  const height = processHeight($)
  const weight = processWeight($)
  const eggGroups = processEggGroups($)
  const genderRatio = processGenderRatio($)
  const growthRate = processGrowthRate($)
  for (let i = 0; i < pokemons.length; i++) {
    pokemons[i].dex_numbers = dexNumbers
    let formTypes = types.find(type => type.name === pokemons[i].names[0].name)
    // If the form has the same type as the base form
    if (formTypes === undefined) {
      formTypes = types[0]
    }
    pokemons[i].types = formTypes.types
    pokemons[i].base_friendship = baseFriendship
    pokemons[i].catch_rate = catchRate
    let formHeight = height.find(height => height.name === pokemons[i].names[0].name)
    // If the form has the same height as the base form
    if (formHeight === undefined) {
      formHeight = height[0]
    }
    pokemons[i].height = formHeight.height
    let formWeight = weight.find(weight => weight.name === pokemons[i].names[0].name)
    // If the form has the same weight as the base form
    if (formWeight === undefined) {
      formWeight = weight[0]
    }
    pokemons[i].weight = formWeight.weight
    pokemons[i].egg_groups = eggGroups
    pokemons[i].gender_rate = genderRatio
    // Some issues that are easier to fix here than in the data
    pokemons[i] = fixRandomStuff(pokemons[i])
    pokemons[i].growth_rate = growthRate
    console.log(growthRate)
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
