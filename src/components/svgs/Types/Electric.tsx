import React from 'react'
import { Svg, Path, SvgProps } from 'react-native-svg'

const Electric = ({ ...props }: SvgProps ) => (
  <Svg
    viewBox='0 0 25 25'
    fill='none'
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.425.029A.022.022 0 0 1 3.445 0h8.81c.01 0 .019.006.021.015l4.047 13.074a.022.022 0 0 1-.02.028h-5.866a.01.01 0 0 0-.01.014l3.364 11.841c.006.023-.024.038-.038.02L.68 7.606a.022.022 0 0 1 .018-.035H6.02a.01.01 0 0 0 .01-.014L3.425.028Z"
      fill={props.color}
    />
  </Svg>
)

export default Electric
