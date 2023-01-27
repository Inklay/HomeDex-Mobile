export function getLanguageCode (languageName) {
  switch (languageName) {
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
