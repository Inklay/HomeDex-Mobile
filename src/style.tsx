import { StyleSheet, Dimensions } from 'react-native'

const { height } = Dimensions.get('screen')

export class textColors {
  static white = '#FFFFFF'
  static black = '#17171B'
  static grey = '#747476'
  static number = '#17171B99'
}

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  homeHeader: {
    width: '100%',
    height: height / 4,
    flex: 1
  },

  headerGradient: {
    width: '100%',
    height: height / 4 + 1,
    paddingHorizontal: 40
  },

  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: textColors.black
  },

  homeActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 37.5,
    marginTop: 42.5,
  },

  homeActionRowIcon: {
    marginLeft: 25
  }
})
