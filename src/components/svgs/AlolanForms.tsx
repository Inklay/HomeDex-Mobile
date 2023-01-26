import React from 'react'
import { Image } from 'react-native'
import AlolanFormsPNG from '../../../assets/images/AlolanForms.png'

const AlolanForms = (props: any) => (
  <Image style={{
      width: props.width,
      height: props.height,
      tintColor: props.color
    }}
    source={AlolanFormsPNG}
  />
)

export default AlolanForms
