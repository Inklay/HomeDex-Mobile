function getLanguageCode (languageName) {
  switch (languageName) {
    case 'Mandarin Chinese':
    case 'Mandarin':
      return 'zh-Hant'
    case 'French':
      return 'fr'
    case 'German':
      return 'de'
    case 'Italian':
      return 'it'
    case 'Korean':
      return 'ko'
    case 'Spanish':
      return 'es'
    case 'Japanese':
      return 'ja'
  }
}

export function getOtherNames ($, isPokemon) {
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
        if (!isPokemon) {
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
            let name = $(col).contents().first().text().replace('\n', '')
            const index = name.search(' / ')
            if (index !== -1) {
              name = name.slice(0, index)
            }
            data.push({
              name,
              language
            })
          }
        } else {
          if (colIndex === 0) {
            // Japanese
            if ($(col).children('a').length !== 2) {
              language = getLanguageCode($(col).text().replaceAll(' ', '').replace('\n', ''))
            } else {
              language = getLanguageCode($('a:nth-child(2)', col).text())
            }
          }
          if (colIndex === 1 && language !== undefined) {
            let name = $(col).contents().first().text().replace('\n', '')
            if (language === 'zh-Hant') {
              const index = name.search(' / ')
              if (index !== -1) {
                name = name.slice(0, index)
              }
            }
            data.push({
              name,
              language
            })
          }
        }
      })
    })
  return data
}
