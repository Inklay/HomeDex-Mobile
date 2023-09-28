import { load } from 'cheerio'
import { getOtherNames } from '../utils.js'
import { getFetch } from '../cached_fetch.js'

const baseURL = 'https://bulbapedia.bulbagarden.net'

export async function getItemURLList () {
  const list = []
  const URL = `${baseURL}/wiki/List_of_items_by_name`
  const pageHTML = await (await getFetch(URL)).text()
  const $ = load(pageHTML)
  let elem = $('#List_of_items_by_name').parent()
  while ($(elem).length > 0) {
    if ($(elem)[0].name === 'table') {
      $(elem).children('tbody').children('tr').each((index, row) => {
        if (index === 0) {
          return
        }
        if ($(row).children('td').length === 0) {
          return
        }
        list.push($('tr td:nth-child(2) a', row).attr('href'))
      })
    }
    elem = $(elem).next()
  }
  return list
}

export async function getItemData (itemURL, id) {
  const URL = `${baseURL}${itemURL}`
  const pageHTML = await (await fetch(URL)).text()
  const $ = load(pageHTML)
  const otherNames = getOtherNames($, false)
  return {
    names: [
      {
        name: $('#firstHeading').text(),
        language: 'en'
      },
      ...otherNames
    ],
    id
  }
}

export async function getAllItemData () {
  console.log(`Getting data for ${itemURLList.length} items`)
  const data = []
  for (let i = 0; i < itemURLList.length; i++) {
    data.push(await getItemData(itemURLList[i], i))
    if (i !== 0 && i % 100 === 0) {
      console.log(`Got data for ${i}/${itemURLList.length} items`)
    }
  }
  console.log('Got data for all items')
  return data
}

const itemURLList = await getItemURLList()
