import { StyleSheet, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('screen')

export enum TextColors {
  white = 'white',
  black = '#17171B',
  grey = '#747476',
  number = '#17171B99'
}

export enum BackgroundColors {
  white = 'white',
  inputDefault = '#f2f2f2',
  inputPressed = '#e2e2e2',
  modal = '#17171B80',
  enabled = '#EA5D60',
  enabledTrail = '#EA5D60B0'
}

export enum TypeBackgroundColors {
  bug = '#8BD674',
  dark = '#6F6E78',
  dragon = '#7383B9',
  electric = '#F2CB55',
  fairy = '#EBA8C3',
  fighting = '#EB4971',
  fire = '#FFA756',
  flying = '#83A2E3',
  ghost = '#8571BE',
  grass = '#8BBE8A',
  ground = '#F78551',
  ice = '#91D8DF',
  normal = '#B5B9C4',
  poison = '#9F6E97',
  psychic = '#FF6568',
  rock = '#D4C294',
  steel = '#4C91B2',
  water = '#58ABF6',
}

export enum TypeColors {
  bug = '#8CB230',
  dark = '#58575F',
  dragon = '#0F6AC0',
  electric = '#EED535',
  fairy = '#ED6EC7',
  fighting = '#D04164',
  fire = '#FD7D24',
  flying = '#748FC9',
  ghost = '#556AAE',
  grass = '#62B957',
  ground = '#DD7748',
  ice = '#61CEC0',
  normal = '#9DA0AA',
  poison = '#A552CC',
  psychic = '#EA5D60',
  rock = '#BAAB82',
  steel = '#417D9A',
  water = '#4A90DA'
}

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColors.white,
    justifyContent: 'space-between'
  },

  homeHeader: {
    width: '100%',
    height: height / 4,
  },

  headerGradient: {
    width: '100%',
    height: height / 4 + 1,
    paddingHorizontal: 20
  },

  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: TextColors.black
  },

  homeActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
    marginTop: 50,
  },

  homeActionRowIcon: {
    height: 20,
    width: 20,
    marginLeft: 25,
  },

  description: {
    color: TextColors.grey,
    fontSize: 16,
    marginTop: 10
  },

  inputWrapper: {
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
    flexDirection: 'row',
    alignItems:'center'
  },

  input: {
    width: '100%',
    marginLeft: 12,
  },

  pokemonCard: {
    borderRadius: 10,
    width: '100%',
    padding: 20,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  pokemonNumber: {
    color: TextColors.number,
    fontSize: 12,
    fontWeight: "700",
  },

  pokemonList: {
    paddingHorizontal: 20,
    maxHeight: height - 240
  },

  homeHeaderContainer: {
    height: 240
  },

  pokemonName: {
    color: TextColors.white,
    fontSize: 26,
    fontWeight: "700",
  },

  typeName: {
    borderRadius: 3,
    padding: 5,
    flexDirection: 'row',
    marginRight: 15
  },

  typeNameText: {
    fontSize: 12,
    fontWeight: '400',
    color: TextColors.white,
    marginLeft: 5,
  },

  pokemonTypesName: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },

  cardDots: {
    position: 'absolute'
  },

  pokemonCardImage: {
    position: 'absolute',
    alignContent: 'flex-end',
    width: 140,
    height: 140,
    top: -25,
    left: width - 190
  },

  bottomModal: {
    margin: 0,
    position: 'absolute',
    width: '100%',
    height: height * 0.75,
    top: height * 0.25
  },

  modalContainer: {
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    padding: 20,
    height: height * 0.75,
    backgroundColor: BackgroundColors.white,
  },

  modalName: {
    color: TextColors.black,
    fontWeight: '700',
    fontSize: 26,
  },

  modalSection: {
    marginTop: 25,
    maxHeight: '75%',
  },

  modalSectionName: {
    fontSize: 16,
    color: TextColors.black,
    marginBottom: 10,
    fontWeight: '700',
  },

  typeFilter: {
    borderRadius: 35,
    padding: 15,
    marginBottom: 20,
  },

  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  pokemonPageTop: {
    paddingHorizontal: 20
  },

  pokemonPageTopName: {
    position: 'absolute',
    marginTop: 25,
    fontSize: 100,
    fontWeight: '700',
    width: 2000,
    textAlign: 'center',
    left: '50%',
    transform: [{
      translateX: -980
    }],
    textShadowColor: 'white',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5
  },

  backIcon: {
    marginTop: 50
  },

  pokemonPageHeader: {
    marginTop: 50,
    flexDirection: 'row',
    marginBottom: 10,
  },

  pokemonPageImage: {
    marginRight: 15,
    width: 140,
    height: 140,
  },

  pokemonPageNumber: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '700',
    color: TextColors.number
  },

  pokemonPageName: {
    fontSize: 32,
    fontWeight: '700',
    color: TextColors.white
  },

  pokemonScreenSelector: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 20
  },

  pokemonScreenSelectorText: {
    color: TextColors.white,
    fontWeight: '700',
    fontSize: 16,
    opacity: 0.5
  },

  pokemonScreenSelectorTextSelected: {
    color: TextColors.white,
    fontWeight: '700',
    fontSize: 16
  },

  pokemonScreenContent: {
    backgroundColor: BackgroundColors.white,
    height: '70%',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  
  pokemonFlavourtext: {
    color: TextColors.grey,
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10
  },

  pokemonScreenTitle: {
    marginVertical: 20,
    fontSize: 20,
    fontWeight: '700'
  },

  pokemonScreenFieldContainer: {
    marginBottom: 10,
    flexDirection: 'row'
  },

  pokemonScreenField: {
    fontSize: 16,
    fontWeight: '500',
    color: TextColors.black,
    width: 140
  },

  pokemonScreenFieldData: {
    fontSize: 16,
    fontWeight: '400',
    color: TextColors.grey
  }
})
