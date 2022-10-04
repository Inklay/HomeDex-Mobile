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
  pokemonScreen: {
    about: string
    stats: string
    data: {
      data: string
      category: string
      height: string
      weight: string
      catch_rate: string
      base_friendship: string
    }
    abilities: {
      abilities: string
      ability: string,
      hiden: string
    }
  }
}
