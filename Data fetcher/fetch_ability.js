import { load } from 'cheerio'
import { getLanguageCode } from './utils.js'

const baseURL = 'https://bulbapedia.bulbagarden.net'

export async function getAbilityURLList () {
  const list = []
  const URL = `${baseURL}/wiki/Ability`
  const pageHTML = await (await fetch(URL)).text()
  const $ = load(pageHTML)
  $('#List_of_Abilities')
    .parent()
    .next('table')
    .children('tbody')
    .children('tr')
    .children('td')
    .children('table')
    .children('tbody')
    .children('tr')
    .each((index, element) => {
      // Skip the first row, which is the table header
      if (index === 0) {
        return
      }
      list.push(
        $('td:nth-child(2)', element)
          .children('a').attr('href')
      )
    })
  return list
}

function getOtherNames ($) {
  const data = []
  $('span#In_other_languages')
    .parent()
    .next('table')
    .children('tbody')
    .children('tr')
    .children('td')
    .children('table')
    .children('tbody')
    .children('tr')
    .each((rowIndex, row) => {
      let language
      if (rowIndex === 0) {
        return
      }
      $(row).children('td').each((colIndex, col) => {
        if ($(col).attr('rowspan') === '2') {
          return
        }
        // Other languages
        if (colIndex === 0 && ($(col).attr('colspan') === '2')) {
          language = getLanguageCode($('a:nth-child(2)', col).text())
        }
        // Madarin
        if (colIndex === 0 && $(col).children('span').length !== 0) {
          language = getLanguageCode($(col).text().replace('\n', ''))
        }
        if (colIndex === 1 && rowIndex !== 1 && language !== undefined) {
          let text = $(col).contents().first().text().replace('\n', '')
          const index = text.search(' / ')
          if (index !== -1) {
            text = text.slice(0, index)
          }
          data.push({
            name: text,
            language
          })
        }
      })
    })
  return data
}

export async function getAbilityData (abilityURL, id) {
  const URL = `${baseURL}${abilityURL}`
  const pageHTML = await (await fetch(URL)).text()
  const $ = load(pageHTML)
  const otherNames = getOtherNames($)
  return {
    names: [
      {
        name: $('table.roundy > tbody > tr > td > big > b').text(),
        language: 'en'
      },
      ...otherNames
    ],
    id
  }
}

export async function getAllAbilityData () {
  const data = []
  for (let i = 0; i < abilityURLList.length; i++) {
    data.push(await getAbilityData(abilityURLList[i], i))
  }
  return data
}

const abilityURLList = await getAbilityURLList()
