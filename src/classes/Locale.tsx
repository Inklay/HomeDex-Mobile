export default interface Locale {
  locale: string
  home: {
    description: string
    searchPlaceholder: string
    filters: {
      filters: string
      description: string
      types: string
      forms: {
        forms: string
        mega: string
        gigantamax: string
        alolan: string
        galarian: string
        hisuian: string
        other: string
      }
    }
  }
}
