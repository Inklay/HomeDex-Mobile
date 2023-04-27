import React from 'react'
import { Image } from 'react-native'
import { FilterProps } from './FilterProps'
import MegaPNG from '../../../assets/images/Mega.png'

const Mega = (props: FilterProps) => (
 <Image style={{
    width: props.width,
    height: props.height,
    tintColor: props.color
  }}
  source={MegaPNG}
 />
)

export default Mega
