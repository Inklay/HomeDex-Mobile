import { load } from 'cheerio'
import { fetchBuilder, FileSystemCache } from 'node-fetch-cache'
import { getOtherNames } from './utils.js'
import { createAlolanNames, createGalarianNames, createGigantamaxNames, createHisuianNames, createPaldeanNames } from './pokemon/translation/getTranslatedFormNames.js'
import fs from 'fs'
import { getTranslatedData } from './pokemon/translation/getTranslatedData.js'
import { getCategory } from './pokemon/getCategories.js'

const baseURL = 'https://bulbapedia.bulbagarden.net'
const manualData = JSON.parse(fs.readFileSync('manual_data.json'))

export async function getPokemonURLList () {
  const weekTimeMS = 7 * 24 * 60 * 60 * 1000
  const fetchCache = fetchBuilder.withCache(new FileSystemCache({ cacheDirectory: './cache', ttl: weekTimeMS }))
  const list = []
  const URL = `${baseURL}/wiki/List_of_Pokémon_by_National_Pokédex_number`
  const pageHTML = await (await fetchCache(URL)).text()
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

function romanToInt (romanNumber) {
  switch (romanNumber) {
    case 'I':
      return 1
    case 'II':
      return 2
    case 'III':
      return 3
    case 'IV':
      return 4
    case 'V':
      return 5
    case 'VI':
      return 6
    case 'VII':
      return 7
    case 'VIII':
      return 8
    case 'IX':
      return 9
  }
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

function NaNToMinusOne (value) {
  if (isNaN(value)) {
    return -1
  }
  return value
}

function getTypeNumber (type) {
  switch (type) {
    case 'Normal':
      return 1
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
      return -1
  }
}

function getEggGroupsNumber (eggGroup) {
  switch (eggGroup) {
    case 'Monster':
      return 1
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
      return -1
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

function processNatDexNumbers ($) {
  const dexNumbers = {
    nat: NaNToMinusOne(parseInt($('table.roundy > tbody > tr > td > table > tbody > tr > th > big > big > a > span').text().replace('#', '')))
  }
  return dexNumbers
}

function pushForm (forms, fullName, spriteURL, formType, baseName, isDefault, formName) {
  fullName = fullName.replaceAll(String.fromCharCode(160), ' ')
  if (formName === undefined) {
    formName = fullName
  }
  if (isDefault) {
    formType = 'default'
    fullName = baseName
  } else if (formType === 'default' && isDefault !== undefined) {
    formType = fullName
  }
  if (!fullName.includes(baseName)) {
    fullName = `${baseName} ${fullName}`
  }
  if (fullName.slice(fullName.length - 1) === ' ') {
    fullName = fullName.slice(0, fullName.length - 1)
  }
  if (spriteURL !== undefined) {
    spriteURL = spriteURL.replace('/thumb', '')
    spriteURL = spriteURL.slice(0, spriteURL.search('.png') + 4)
  }
  const form = {
    names: [
      {
        name: fullName,
        language: 'en'
      }
    ],
    form_type: formType,
    form_name: formName,
    sprites: [
      {
        name: 'artwork',
        url: `https:${spriteURL}`,
        shiny_url: undefined
      }
    ]
  }
  forms.push(form)
}

function getManualFormsInfo (fullName) {
  let tableId = ''
  let hasArrow = false
  let hasDiv = false
  let nameHasLink = false
  let hasDivBefore = false
  let isFurfrou = false
  let replaceDefault = false
  let hasP = false
  switch (fullName) {
    case 'Cosplay Pikachu':
      tableId = 'Cosplay_Pikachu_2'
      hasArrow = true
      hasP = true
      break
    case 'Pikachu in a cap':
      tableId = 'Pikachu_in_a_cap'
      hasDiv = true
      nameHasLink = true
      break
    case 'Unown':
    case 'Vivillon':
      tableId = 'Forms'
      replaceDefault = true
      hasP = true
      break
    case 'Furfrou':
      isFurfrou = true
      tableId = 'Forms'
      replaceDefault = true
      break
    case 'Core':
      tableId = 'Forms'
      hasDivBefore = true
      break
  }
  return {
    tableId,
    hasArrow,
    hasDiv,
    nameHasLink,
    hasDivBefore,
    isFurfrou,
    replaceDefault,
    hasP
  }
}

function addManualForms ($, fullName, spriteURL, formType, baseName) {
  const forms = []
  const formInfo = getManualFormsInfo(fullName)
  if (formInfo.tableId !== '' && formInfo.hasArrow) {
    $(`span#${formInfo.tableId}`)
      .parent()
      .next('p')
      .next('table')
      .next('p')
      .next('p')
      .next('div')
      .children('table')
      .children('tbody')
      .children('tr')
      .children('td')
      .each((index, element) => {
        if (index % 2 !== 0) {
          return
        }
        if (index === 0) {
          return
        }
        $(element)
          .children('table')
          .children('tbody')
          .children('tr')
          .each((rowIndex, row) => {
            if (rowIndex === 1) {
              spriteURL = $(row).children('td').children('a').children('img').attr('src')
            } else if (rowIndex === 2) {
              pushForm(forms, $(row).children('td').children('small').text(), spriteURL, formType, baseName, undefined, fullName)
            }
          })
      })
  } else if (formInfo.tableId !== '' && !formInfo.hasArrow) {
    let table = $(`span#${formInfo.tableId}`).parent()
    const names = []
    if (formInfo.hasDiv) {
      table = table
        .next('p')
        .next('p')
        .next('p')
        .next('div')
        .children('table')
    } else if (formInfo.hasDivBefore) {
      table = table
        .next('p')
        .next('p')
        .next('div')
        .next('table')
    } else if (formInfo.isFurfrou) {
      table = table
        .next('p')
        .next('p')
        .next('table')
    } else if (formInfo.hasP) {
      table = table
        .next('p')
        .next('table')
    } else {
      table = table.next()
    }
    $(table)
      .children('tbody')
      .children('tr')
      .each((index, element) => {
        if ($(element).children('td').length === 1) {
          return
        }
        $(element)
          .children('td')
          .each((rowIndex, row) => {
            if (index % 2 === 0) {
              if (formInfo.nameHasLink) {
                names.push($(row).children('a').children('span').text())
              } else {
                names.push($(row).text().replace('\n', ''))
                // Minior
                if ($(row).children('a').length !== 0 && $(row).children('a').attr('class') === 'image') {
                  pushForm(forms, names[rowIndex], $(row).children('a').children('img').attr('src'), formType, baseName,
                    (index === 1 && rowIndex === 0 && formInfo.replaceDefault), names[rowIndex])
                }
              }
            } else if (index % 2 === 1) {
              pushForm(forms, names[rowIndex], $(row).children('a').children('img').attr('src'), formType, baseName,
                (index === 1 && rowIndex === 0 && formInfo.replaceDefault), names[rowIndex])
            }
          })
        if (index % 2 === 1) {
          names.length = 0
        }
      })
  } else {
    pushForm(forms, fullName, spriteURL, formType, baseName)
  }
  return forms
}

function processForms ($) {
  let forms = []
  const baseName = $('td > a[href=\'/wiki/Pok%C3%A9mon_category\']')
    .parent()
    .children('big')
    .children('big')
    .children('b')
    .text()
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
      $(element).children('td').each((__, formElement) => {
        if (!isVisible($, formElement)) {
          return
        }
        const spriteURL = $(formElement).children('a').children('img').attr('src')
        // Get form name for filtering
        let fullName = $(formElement).children('small').text()
        if (fullName === '' || fullName === 'Ultimate Mode' || fullName === 'Apex Build' || fullName === 'Full Belly Mode') {
          fullName = baseName
        }
        const lowerCaseName = fullName.toLowerCase()
        let formType = 'other'
        if (lowerCaseName.includes('mega')) {
          formType = 'mega'
        } else if (lowerCaseName.includes('gigantamax')) {
          formType = 'gmax'
        } else if (lowerCaseName.includes('alola')) {
          formType = 'alola'
        } else if (lowerCaseName.includes('galar')) {
          formType = 'galar'
        } else if (lowerCaseName.includes('hisui')) {
          formType = 'hisui'
        } else if (lowerCaseName.includes('paldea')) {
          formType = 'paldea'
        } else if (index === 0) {
          formType = 'default'
        }
        forms = [...forms, ...addManualForms($, fullName, spriteURL, formType, baseName)]
      })
    })
  return forms
}

function processBaseFriendship ($) {
  return NaNToMinusOne(parseInt($('table.roundy > tbody > tr > td.roundy > b > a[title=\'List of Pokémon by base friendship\']')
    .parent()
    .next('table')
    .children('tbody')
    .children('tr')
    .children('td')
    .text()))
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
  return NaNToMinusOne(parseInt(fixedCatchRate))
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
    const height = NaNToMinusOne(parseFloat($(heightElementArray[i]).children('td').next().text()))
    const name = $(heightElementArray[i + 1]).children('td').children('small').text()
    heightList.push({
      height,
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
    const weight = NaNToMinusOne(parseFloat($(weightElementArray[i]).children('td').next().text()))
    const name = $(weightElementArray[i + 1]).children('td').children('small').text()
    weightList.push({
      weight,
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
  if (femaleRatio === '100% female') {
    return 8
  }
  if (femaleRatio === '12.5% male,87.5% female') {
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
  if (femaleRatio === 'Gender unknown') {
    return 10
  }
  return -1
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

function getDexName (generationNumber, name) {
  switch (generationNumber) {
    case 1:
      return 'RBY'
    case 2:
      return 'GSC'
    case 3:
      if (name === 'Kanto') {
        return 'FRLF'
      } else {
        return 'RSE'
      }
    case 4:
      if (name === 'Sinnoh') {
        return 'DPPt'
      } else {
        return 'HGSS'
      }
    case 5:
      if (name === 'UnovaBW:') {
        return 'BW'
      } else {
        return 'B2W2'
      }
    case 6:
      if (name === 'KalosCentral') {
        return 'XYCentral'
      } else if (name === 'KalosCoastal') {
        return 'XYCoastal'
      } else if (name === 'KalosMountain') {
        return 'XYMountain'
      } else {
        return 'ORAS'
      }
    case 7:
      if (name === 'AlolaSM:') {
        return 'SM'
      } else if (name === 'AlolaUSUM:') {
        return 'USUM'
      } else {
        return 'LGPE'
      }
    case 8:
      if (name === 'Galar') {
        return 'SWSH'
      } else if (name === 'GalarIsle of Armor') {
        return 'IOA'
      } else if (name === 'GalarCrown Tundra') {
        return 'CT'
      } else if (name === 'Sinnoh') {
        return 'BDSP'
      } else {
        return 'LPA'
      }
    case 9:
      if (name === 'Paldea') {
        return 'SV'
      } else if (name === 'Kitakami') {
        return 'TTM'
      }
  }
}

function processRegionalDex ($, flavorTextId, dexNumbers) {
  let element = $(`span${flavorTextId}`).parent()
  if (element[0] === undefined) {
    return
  }
  while ($(element)[0].name !== 'table') {
    element = $(element).next()
  }
  let generationNumber
  $(element)
    .children('tbody')
    .children('tr')
    .each((__, generation) => {
      $(generation)
        .children('td')
        .children('table')
        .children('tbody')
        .children('tr')
        .children('th')
        .each((dexIndex, dex) => {
          if (dexIndex === 0) {
            generationNumber = romanToInt($(dex).children('small').text().split(' ')[1])
            return
          }
          const dexContent = $(dex).children('small').text()
          const numberStart = dexContent.search(' #')
          const dexName = getDexName(generationNumber, dexContent.slice(0, numberStart))
          const dexNumber = dexContent.slice(numberStart + 2)
          if (dexNumber !== '—') {
            dexNumbers[dexName] = parseInt(dexNumber)
          }
        })
    })
}

function getFlavorTextFormName (form) {
  if (form === 'Original Cap Pikachu') {
    return 'Pikachu Original Cap'
  } else if (form === 'Partner Cap Pikachu') {
    return 'Pikachu Partner Cap'
  } else if (form === 'World Cap Pikachu') {
    return 'Pikachu World Cap'
  }
  return form
}

function processCapPikachuFlavorText (game, text, flavorText) {
  const regions = ['Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola']
  for (const region of regions) {
    const formIndex = flavorText.push({
      form: `Pikachu ${region} Cap`,
      entries: []
    }) - 1
    flavorText[formIndex].entries.push({
      game,
      texts: [
        {
          name: text.replace('Hoenn/Sinnoh/Unova/Kalos/Alola', region),
          language: 'en'
        }
      ]
    })
  }
}

function processMiniorFlavorText (game, text, flavorText) {
  const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']
  for (const color of colors) {
    if (flavorText.find(form => form.form === `Minior ${color} Core`) !== undefined) {
      const formIndex = flavorText.findIndex(form => form.form === `Minior ${color} Core`)
      flavorText[formIndex].entries.push({
        game,
        texts: [
          {
            name: text,
            language: 'en'
          }
        ]
      })
    } else {
      const formIndex = flavorText.push({
        form: `Minior ${color} Core`,
        entries: []
      }) - 1
      flavorText[formIndex].entries.push({
        game,
        texts: [
          {
            name: text,
            language: 'en'
          }
        ]
      })
    }
  }
}

function processFlavorText ($, flavorTextId) {
  const flavorText = []
  let form = 'default'
  let oldText
  let formIndex
  let element = $(`span${flavorTextId}`)
    .parent()
    .next('')
  if (element[0] === undefined) {
    return [{ form: 'default', entries: [] }]
  }
  while ($(element)[0].name !== 'table') {
    element = $(element).next()
  }
  $(element)
    .children('tbody')
    .children('tr')
    .each((__, generation) => {
      form = 'default'
      formIndex = 0
      $(generation)
        .children('td')
        .children('table')
        .children('tbody')
        .children('tr:nth-child(2)')
        .children('td')
        .children('table')
        .children('tbody')
        .children('tr')
        .each((__, game) => {
          if ($(game).children('th').children('a').length === 0) {
            if (flavorText.find(f => f.form === 'default') === undefined) {
              form = 'default'
            } else {
              form = getFlavorTextFormName($(game).children('th').text().replace('\n', ''))
            }
            return
          }
          if (flavorText.find(f => f.form === form) === undefined) {
            formIndex = flavorText.push({
              form,
              entries: []
            }) - 1
          } else {
            formIndex = flavorText.findIndex(f => f.form === form)
          }
          if ($(game).children('td').length !== 0) {
            oldText = $(game).children('td').text()
          }
          if (!$(game).children('th').text().includes('Stadium') && !$(game).children('th').text().includes('This')) {
            let gameName = $(game).children('th').text().replace('\n', '')
            if (gameName.slice(gameName.length - 1) === ' ') {
              gameName = gameName.slice(0, -1)
            }
            if (form === 'Hoenn, Sinnoh, Unova, Kalos, and Alola Cap Pikachu') {
              processCapPikachuFlavorText(gameName, oldText, flavorText)
            } else if (form === 'All Cores') {
              processMiniorFlavorText(gameName, oldText, flavorText)
            } else {
              flavorText[formIndex].entries.push({
                game: gameName,
                texts: [
                  {
                    name: oldText,
                    language: 'en'
                  }
                ]
              })
            }
          }
        })
    })
  // Alcremie does not have a 'default' form :(
  if (flavorText[0].entries.length === 0 && flavorText.length > 1) {
    flavorText[0].entries = flavorText[1].entries
  }
  return flavorText
}

function processPokedexEntries ($, dexNumbers) {
  let flavorTextId
  $('a[href=\'#Game_data\']')
    .next('ul')
    .children('li')
    .each((__, element) => {
      $(element)
        .children('a')
        .children('span')
        .each((__, link) => {
          if ($(link).attr('class') === 'toctext' && $(link).text() === 'Pokédex entries') {
            flavorTextId = $(link).parent().attr('href').replace('.C3.A9', 'é')
          }
        })
    })
  processRegionalDex($, flavorTextId, dexNumbers)
  return processFlavorText($, flavorTextId)
}

function processStatsTable ($, table, name) {
  const stats = { name, stats: [] }
  $(table)
    .children('tbody')
    .children('tr')
    .each((index, stat) => {
      if (index < 2 || index > 7) {
        return
      }
      const rowText = $(stat).children('th').text()
      stats.stats.push(
        {
          base: NaNToMinusOne(parseInt(rowText.slice(rowText.search(':') + 1))),
          effort: -1
        }
      )
    })
  return stats
}

function processStats ($) {
  let statsId
  let element
  const stats = []
  $('a[href=\'#Game_data\']')
    .next('ul')
    .children('li')
    .each((__, element) => {
      $(element)
        .children('a')
        .children('span')
        .each((__, link) => {
          if ($(link).attr('class') === 'toctext' && ($(link).text() === 'Stats' || $(link).text() === 'Base stats')) {
            statsId = $(link).parent().attr('href')
          }
        })
    })
  const header = $(`span${statsId}`)
    .parent()
    .next()
  if ($(header)[0] === undefined) {
    const noStats = [{ name: 'default', stats: [] }]
    for (let i = 0; i < 6; i++) {
      noStats[0].stats.push({ base: -1, effort: -1 })
    }
    return noStats
  }
  let skip = false
  let index = 0
  let name
  if ($(header)[0].name !== 'table') {
    element = $(header).next()
  } else {
    element = header
  }
  while ($(element)[0] !== undefined && $(element)[0].name !== 'h4') {
    if ($(element)[0].name === 'h3' && $(element).text() !== 'Base stats') {
      break
    }
    // Older gen
    if ($(element)[0].name === 'h5' && $(element).text().includes('Generation') && !$(element).text().includes('onward') && !$(element).text().includes('IX')) {
      skip = true
    // Current gen
    } else if ($(element)[0].name === 'h5' && ($(element).text().includes('onward') || $(element).text().includes('IX'))) {
      skip = false
    } else if ($(element)[0].name === 'h5') {
      name = $(element).text()
    } else if ($(element)[0].name === 'table' && !skip) {
      name = index === 0 ? 'default' : name
      index++
      stats.push(processStatsTable($, element, name))
    }
    element = $(element).next()
  }
  return stats
}

function processAbilities ($, abilities) {
  const data = []
  $('td.roundy > b > a[href=\'/wiki/Ability\']')
    .parent()
    .next('table')
    .children('tbody')
    .children('tr')
    .children('td')
    .each((__, element) => {
      if (!isVisible($, element)) {
        return
      }
      let isHidden = false
      let form = 'default'
      if ($(element).children('small').length > 0) {
        const text = $(element).children('small').text()
        if (text === ' Hidden Ability') {
          isHidden = true
        } else {
          form = text
        }
      }
      $(element).children('a').each((__, link) => {
        const ability = abilities.find(ability => ability.names[0].name === $(link).text())
        if (ability === undefined) {
          return [{
            ability: -1,
            is_hidden: false,
            form: 'default'
          }]
        }
        data.push({
          ability: ability.id,
          is_hidden: isHidden,
          form
        })
      })
    })
  return data
}

function fixRandomStuff (pokemon, stats) {
  // Some Pikachu forms have a different egg group
  if (pokemon.dex_numbers.nat === 25) {
    if (pokemon.form_type === 'other') {
      pokemon.egg_groups = [14]
    } else {
      pokemon.egg_groups = [15, 7]
    }
  } else if (pokemon.dex_numbers.nat === 128) {
    if (pokemon.form_type === 'paldea') {
      pokemon.stats = stats[1].stats
    }
  } else if (pokemon.dex_numbers.nat === 774) {
    if (pokemon.form_type === 'other') {
      pokemon.stats = stats[1].stats
    }
  }
  return pokemon
}

export async function getPokemonData (pokemonURL, abilities) {
  // Can happen with automated tests
  if (pokemonURL === undefined) {
    return
  }
  const URL = `${baseURL}${pokemonURL}`
  const pageHTML = await (await fetch(URL)).text()
  const $ = load(pageHTML)
  const pokemons = processForms($)
  // For unreleased Pokémon
  if (pokemons[0] === undefined) {
    console.log(pokemonURL)
  }
  if (pokemons[0].names[0].name === '') {
    pokemons[0].names[0].name = pokemonURL.replace('/wiki/', '').replace('_(Pok%C3%A9mon)', '')
  }
  const dexNumbers = processNatDexNumbers($)
  const types = processType($, pokemons[0].names[0].name)
  const baseFriendship = processBaseFriendship($)
  const catchRate = processCatchRate($)
  const height = processHeight($)
  const weight = processWeight($)
  const eggGroups = processEggGroups($)
  const genderRatio = processGenderRatio($)
  const growthRate = processGrowthRate($)
  const flavorText = processPokedexEntries($, dexNumbers)
  const stats = processStats($)
  const otherNames = getOtherNames($, true)
  const translatedData = await getTranslatedData(otherNames)
  const abilityList = processAbilities($, abilities)
  const category = getCategory($, pokemons[0].names[0].name, translatedData.category)

  if (flavorText === undefined) {
    console.log(`No flavor text found for ${pokemons[0].names[0].name}`)
  }
  if (stats === undefined) {
    console.log(`No stats found for ${pokemons[0].names[0].name}`)
  }
  for (let i = 0; i < pokemons.length; i++) {
    pokemons[i].dex_numbers = dexNumbers
    if (pokemons[i].form_type === 'other') {
      const data = manualData.find(data => data.id === pokemons[i].dex_numbers.nat)
      if (data !== undefined) {
        const formData = data.forms.find(form => form.english === pokemons[i].names[0].name)
        if (formData) {
          pokemons[i].names = [
            ...pokemons[i].names,
            ...formData.names
          ]
          if (formData.flavor_texts !== undefined) {
            for (let j = 0; j < formData.flavor_texts.length; j++) {
              const formText = flavorText.find(text => text.form === pokemons[i].names[0].name)
              if (formText !== undefined) {
                const gameText = formText.entries.find(entry => entry.game === formData.flavor_texts[j].game)
                if (gameText !== undefined) {
                  gameText.texts = [
                    ...gameText.texts,
                    ...formData.flavor_texts[j].texts
                  ]
                }
              }
            }
          }
        }
      }
    } else if (pokemons[i].form_type === 'default') {
      pokemons[i].names = [
        ...pokemons[i].names,
        ...otherNames
      ]
    } else {
      let otherFormNames = []
      if (pokemons[i].form_type === 'alola') {
        otherFormNames = createAlolanNames(otherNames)
      } else if (pokemons[i].form_type === 'galar') {
        otherFormNames = createGalarianNames(otherNames)
      } else if (pokemons[i].form_type === 'gmax') {
        otherFormNames = createGigantamaxNames(otherNames)
      } else if (pokemons[i].form_type === 'hisui') {
        otherFormNames = createHisuianNames(otherNames)
      } else if (pokemons[i].form_type === 'paldea') {
        otherFormNames = createPaldeanNames(otherNames)
      } else if (pokemons[i].form_type === 'mega') {
        if (pokemons[i].names[0].name.search(' X') !== -1) {
          otherFormNames = createPaldeanNames(otherNames, ' X')
        } else if (pokemons[i].names[0].name.search(' Y') !== -1) {
          otherFormNames = createPaldeanNames(otherNames, ' Y')
        } else {
          otherFormNames = createPaldeanNames(otherNames, '')
        }
      }
      pokemons[i].names = [
        ...pokemons[i].names,
        ...otherFormNames
      ]
    }
    let formTypes = types.find(type => type.name === pokemons[i].form_name)
    // If the form has the same type as the base form
    if (formTypes === undefined) {
      formTypes = types[0]
    }
    pokemons[i].types = formTypes.types
    pokemons[i].base_friendship = baseFriendship
    pokemons[i].catch_rate = catchRate
    let formHeight = height.find(height => height.name === pokemons[i].form_name)
    // If the form has the same height as the base form
    if (formHeight === undefined) {
      formHeight = height[0]
    }
    pokemons[i].height = formHeight.height
    let formWeight = weight.find(weight => weight.name === pokemons[i].form_name)
    // If the form has the same weight as the base form
    if (formWeight === undefined) {
      formWeight = weight[0]
    }
    pokemons[i].weight = formWeight.weight
    pokemons[i].egg_groups = eggGroups
    pokemons[i].gender_rate = genderRatio
    pokemons[i].growth_rate = growthRate
    let formCategory
    if (category.length === 1) {
      formCategory = category[0]
    } else if (pokemons[i].form_type === 'default') {
      formCategory = category.find(category => category.form === 'default')
    }
    if (formCategory === undefined) {
      formCategory = category.find(category => category.form === pokemons[i].form_name)
      if (formCategory === undefined) {
        formCategory = category.find(category => category.form === pokemons[i].form_type)
        if (formCategory === undefined) {
          formCategory = category.find(category => category.form === 'default')
          if (formCategory === undefined) {
            formCategory = category[0]
          }
        }
      }
    }
    pokemons[i].category = formCategory.categories
    if (pokemons[i].form_type === 'default') {
      if (flavorText.find(flavorText => flavorText.form === 'default') === undefined) {
        console.log(pokemonURL)
      }
      pokemons[i].flavor_texts = flavorText.find(flavorText => flavorText.form === 'default').entries
    } else {
      let formFlavorText = flavorText.find(flavorText => flavorText.form === pokemons[i].names[0].name)
      if (formFlavorText === undefined) {
        formFlavorText = flavorText.find(flavorText => flavorText.form === pokemons[i].form_name)
        if (formFlavorText === undefined) {
          formFlavorText = flavorText.find(flavorText => flavorText.form === 'default')
        }
      }
      if (formFlavorText !== undefined) {
        pokemons[i].flavor_texts = formFlavorText.entries
      }
    }
    if (pokemons[i].form_type === 'default') {
      if (stats.find(stat => stat.name === 'default') === undefined) {
        console.log(pokemons[i].names[0].name, stats)
      }
      pokemons[i].stats = stats.find(stat => stat.name === 'default').stats
    } else {
      let formStats = stats.find(stat => stat.name === pokemons[i].names[0].name)
      if (formStats === undefined) {
        formStats = stats.find(stat => stat.name === pokemons[i].form_name)
        if (formStats === undefined) {
          formStats = stats.find(stat => stat.name === 'default')
        }
      }
      if (formStats !== undefined) {
        pokemons[i].stats = formStats.stats
      }
    }
    const defaultFormAbilities = abilityList.filter(ability => ability.form === 'default' || ability.form === pokemons[0].names[0].name)
    const otherFormAbilities = abilityList.filter(ability => ability.form !== 'default' && ability.form !== pokemons[0].names[0].name)
    let formAbility = otherFormAbilities.filter(ability => ability.form === pokemons[i].form_name)
    // If the form has the same ability as the base form
    if (formAbility.length === 0) {
      formAbility = defaultFormAbilities
    }
    pokemons[i].abilities = formAbility
    pokemons[i].types = formTypes.types
    // Some issues that are easier to fix here than in the data
    pokemons[i] = fixRandomStuff(pokemons[i], stats)
  }
  return pokemons
}

export async function getAllPokemonData (abilities) {
  console.log(`Getting data for ${pokemonURLList.length} pokemon`)
  let data = []
  for (let i = 0; i < pokemonURLList.length; i++) {
    data = [...data, ...(await getPokemonData(pokemonURLList[i], abilities))]
    if (i !== 0 && i % 100 === 0) {
      console.log(`Got data for ${i}/${pokemonURLList.length} pokemon`)
    }
  }
  return data
}

const pokemonURLList = await getPokemonURLList()
