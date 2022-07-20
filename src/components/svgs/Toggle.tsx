import React from 'react'
import { Svg, Path, SvgProps } from 'react-native-svg'

const Toggle = (props: SvgProps) => (
  <Svg
    viewBox='0 0 454.887 454.886'
    fill='none'
    {...props}
  >
    <Path
      d='M227.452 454.886c-117.055 0-212.28-95.241-212.28-212.277 0-60.534 25.956-118.343 71.241-158.62 12.51-11.136 31.671-10.011 42.804 2.487 11.138 12.499 10.013 31.69-2.501 42.825-32.338 28.784-50.892 70.069-50.892 113.308 0 83.634 68.025 151.629 151.629 151.629 83.615 0 151.609-67.995 151.609-151.629 0-43.238-18.532-84.523-50.814-113.308-12.555-11.135-13.685-30.266-2.544-42.825 11.126-12.498 30.322-13.623 42.82-2.487 45.252 40.277 71.191 98.086 71.191 158.62 0 117.036-95.236 212.277-212.263 212.277zm30.313-272.93V30.327C257.765 13.565 244.202 0 227.452 0c-16.746 0-30.327 13.565-30.327 30.327v151.629c0 16.764 13.577 30.327 30.327 30.327 16.75-.001 30.313-13.563 30.313-30.327z'
      fill={props.color}
    />
  </Svg>
)

export default Toggle