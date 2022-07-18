import React from 'react'
import { Svg, Path, SvgProps, Defs, LinearGradient, Stop } from 'react-native-svg'

const Dots = ({ ...props }: SvgProps ) => (
  <Svg
    viewBox='0 0 171 75'
    fill='none'
    {...props}
  >
    <Path
      d="M9.243 4.688c0 2.588-2.069 4.687-4.621 4.687C2.069 9.375 0 7.276 0 4.687 0 2.1 2.07 0 4.622 0s4.621 2.099 4.621 4.688ZM41.595 4.688c0 2.588-2.07 4.687-4.622 4.687-2.553 0-4.622-2.099-4.622-4.688C32.351 2.1 34.421 0 36.973 0s4.622 2.099 4.622 4.688ZM73.946 4.688c0 2.588-2.07 4.687-4.622 4.687s-4.621-2.099-4.621-4.688C64.703 2.1 66.772 0 69.324 0c2.553 0 4.622 2.099 4.622 4.688ZM106.297 4.688c0 2.588-2.069 4.687-4.621 4.687-2.553 0-4.622-2.099-4.622-4.688C97.054 2.1 99.124 0 101.676 0s4.621 2.099 4.621 4.688ZM138.649 4.688c0 2.588-2.07 4.687-4.622 4.687s-4.622-2.099-4.622-4.688c0-2.588 2.07-4.687 4.622-4.687s4.622 2.099 4.622 4.688ZM171 4.688c0 2.588-2.069 4.687-4.622 4.687-2.552 0-4.621-2.099-4.621-4.688 0-2.588 2.069-4.687 4.621-4.687C168.931 0 171 2.099 171 4.688ZM9.243 37.5c0 2.589-2.069 4.688-4.621 4.688C2.069 42.188 0 40.087 0 37.5c0-2.589 2.07-4.688 4.622-4.688s4.621 2.1 4.621 4.688ZM41.595 37.5c0 2.589-2.07 4.688-4.622 4.688-2.553 0-4.622-2.1-4.622-4.688 0-2.589 2.07-4.688 4.622-4.688s4.622 2.1 4.622 4.688ZM73.946 37.5c0 2.589-2.07 4.688-4.622 4.688s-4.621-2.1-4.621-4.688c0-2.589 2.069-4.688 4.621-4.688 2.553 0 4.622 2.1 4.622 4.688ZM106.297 37.5c0 2.589-2.069 4.688-4.621 4.688-2.553 0-4.622-2.1-4.622-4.688 0-2.589 2.07-4.688 4.622-4.688s4.621 2.1 4.621 4.688ZM138.649 37.5c0 2.589-2.07 4.688-4.622 4.688s-4.622-2.1-4.622-4.688c0-2.589 2.07-4.688 4.622-4.688s4.622 2.1 4.622 4.688ZM171 37.5c0 2.589-2.069 4.688-4.622 4.688-2.552 0-4.621-2.1-4.621-4.688 0-2.589 2.069-4.688 4.621-4.688 2.553 0 4.622 2.1 4.622 4.688ZM9.243 70.313C9.243 72.9 7.174 75 4.622 75 2.069 75 0 72.901 0 70.312c0-2.588 2.07-4.687 4.622-4.687s4.621 2.099 4.621 4.688ZM41.595 70.313c0 2.588-2.07 4.687-4.622 4.687-2.553 0-4.622-2.099-4.622-4.688 0-2.588 2.07-4.687 4.622-4.687s4.622 2.099 4.622 4.688ZM73.946 70.313c0 2.588-2.07 4.687-4.622 4.687s-4.621-2.099-4.621-4.688c0-2.588 2.069-4.687 4.621-4.687 2.553 0 4.622 2.099 4.622 4.688ZM106.297 70.313c0 2.588-2.069 4.687-4.621 4.687-2.553 0-4.622-2.099-4.622-4.688 0-2.588 2.07-4.687 4.622-4.687s4.621 2.099 4.621 4.688ZM138.649 70.313c0 2.588-2.07 4.687-4.622 4.687s-4.622-2.099-4.622-4.688c0-2.588 2.07-4.687 4.622-4.687s4.622 2.099 4.622 4.688ZM171 70.313C171 72.9 168.931 75 166.378 75c-2.552 0-4.621-2.099-4.621-4.688 0-2.588 2.069-4.687 4.621-4.687 2.553 0 4.622 2.099 4.622 4.688Z"
      fill="url(#a)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={171}
        y1={0}
        x2={171}
        y2={75}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" stopOpacity={0.5} />
        <Stop offset={1} stopColor="#fff" stopOpacity={0.1} />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default Dots
