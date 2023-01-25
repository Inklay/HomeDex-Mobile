import React from 'react'
import { Text, View, TouchableWithoutFeedback } from 'react-native'
import { Locale } from '../../utils'
import { BackgroundColors, Style } from '../../style'
import LeftArrow from '../svgs/LeftArrow'

interface Props {
  navigation: any
}

const Settings: React.FC<Props> = ({navigation}) => {
  return (
    <View style={Style.container}>
      <View style={Style.settingsHeader}>
        <TouchableWithoutFeedback onPress={() => {navigation.goBack()}}>
          <LeftArrow style={Style.backIcon} color={BackgroundColors.black} height={20} width={20}/>
        </TouchableWithoutFeedback>
        <Text style={Style.settingsHeaderText}>{Locale.settings.settings}</Text>
      </View>
      <View style={Style.settingsContent}>
        <Text>aaaaaa</Text>
        
      </View>
    </View>
  )
}

export default Settings
