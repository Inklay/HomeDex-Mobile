import { load } from 'cheerio'

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
      let language = ''
      if (rowIndex === 0) {
        return
      }
      $(row).children('td').each((colIndex, col) => {
        if ($(col).attr('rowspan') === '2') {
          return
        }
        if (colIndex === 0 && ($(col).attr('colspan') === '2')) {
          console.log($('a:nth-child(2)', col).text())
        }
        if (colIndex === 0 && $(col).children('span').length !== 0) {
          console.log($(col).text().replace('\n', ''))
        }
      })
    })
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
      }
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

getAbilityData(abilityURLList[0], 0)
