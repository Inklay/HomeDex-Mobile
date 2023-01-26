import React from 'react'
import { Svg, Path, SvgProps } from 'react-native-svg'

const Dynamax = (props: SvgProps) => (
  <Svg
    viewBox='0 0 400 400'
    fill='none'
    {...props}
  >
    <Path
      d='M57.656 55.926 C 46.669 57.542,41.291 70.568,47.347 80.901 C 49.059 83.822,51.025 85.546,61.250 93.090 C 62.711 94.168,64.258 95.310,64.688 95.628 C 67.298 97.560,72.681 101.673,72.813 101.838 C 72.898 101.945,73.813 102.658,74.844 103.421 C 75.875 104.185,76.859 104.958,77.031 105.139 C 77.203 105.320,77.859 105.853,78.489 106.323 C 79.118 106.793,79.821 107.361,80.051 107.585 C 80.281 107.808,81.028 108.408,81.713 108.918 C 83.449 110.210,84.079 110.709,84.660 111.250 C 84.937 111.508,85.859 112.281,86.710 112.969 C 87.560 113.656,88.486 114.430,88.768 114.688 C 89.050 114.945,89.550 115.367,89.878 115.625 C 91.012 116.516,94.219 119.219,94.375 119.415 C 94.461 119.523,95.516 120.438,96.719 121.447 C 99.505 123.785,100.553 124.689,101.379 125.469 C 101.743 125.813,103.093 127.008,104.380 128.125 C 105.666 129.242,107.156 130.578,107.691 131.094 C 108.226 131.609,109.844 133.086,111.285 134.374 C 112.727 135.663,114.590 137.377,115.425 138.184 C 116.260 138.990,119.635 142.225,122.925 145.372 C 131.671 153.739,138.605 160.810,140.499 163.293 C 141.822 165.027,141.235 165.987,135.931 170.761 C 127.867 178.020,106.549 199.276,101.592 205.000 C 100.476 206.289,98.993 207.915,98.297 208.613 C 96.781 210.133,94.306 212.825,92.850 214.538 C 92.269 215.222,91.068 216.555,90.183 217.500 C 88.827 218.946,87.613 220.391,85.781 222.738 C 85.609 222.958,84.801 223.839,83.984 224.695 C 83.168 225.552,82.500 226.309,82.500 226.378 C 82.500 226.519,80.819 228.503,79.766 229.605 C 79.379 230.010,79.063 230.415,79.063 230.505 C 79.063 230.596,78.887 230.850,78.672 231.070 C 78.457 231.290,77.648 232.215,76.875 233.125 C 76.102 234.035,75.321 234.935,75.141 235.124 C 74.960 235.314,74.221 236.273,73.497 237.256 C 72.774 238.239,71.926 239.294,71.614 239.600 C 71.301 239.906,70.637 240.719,70.138 241.406 C 69.639 242.094,68.947 242.946,68.600 243.301 C 68.253 243.656,67.758 244.266,67.500 244.658 C 67.242 245.050,66.820 245.629,66.563 245.944 C 63.289 249.948,58.125 256.824,58.125 257.181 C 58.125 257.356,58.012 257.500,57.874 257.500 C 57.639 257.500,53.380 263.073,50.293 267.422 C 47.172 271.818,46.548 272.677,46.155 273.125 C 45.928 273.383,45.101 274.581,44.318 275.787 C 43.535 276.993,42.665 278.171,42.385 278.404 C 42.104 278.636,41.875 278.935,41.875 279.068 C 41.875 279.353,38.742 284.035,37.457 285.670 C 36.965 286.296,36.563 286.878,36.563 286.962 C 36.563 287.047,36.018 287.941,35.352 288.949 C 32.090 293.887,28.750 299.074,28.750 299.203 C 28.750 299.282,28.396 299.881,27.963 300.533 C 19.124 313.851,15.314 322.121,15.313 327.995 C 15.312 332.678,19.003 340.938,21.097 340.938 C 21.324 340.937,21.557 341.061,21.615 341.211 C 21.773 341.626,25.521 343.437,26.223 343.438 C 26.561 343.438,26.917 343.566,27.014 343.722 C 27.758 344.926,39.688 343.729,39.688 342.450 C 39.688 342.306,39.903 342.188,40.167 342.188 C 40.791 342.188,43.385 340.866,45.930 339.252 C 48.555 337.587,49.077 337.279,49.907 336.902 C 50.285 336.730,51.152 336.237,51.834 335.807 C 52.515 335.377,53.436 334.934,53.880 334.822 C 54.324 334.711,54.688 334.494,54.688 334.341 C 54.688 334.188,54.837 334.063,55.020 334.063 C 55.331 334.063,56.398 333.605,60.625 331.657 C 61.570 331.221,62.836 330.649,63.438 330.385 C 64.039 330.121,64.905 329.716,65.361 329.484 C 65.817 329.252,66.477 329.063,66.827 329.063 C 67.177 329.062,67.542 328.935,67.639 328.779 C 67.735 328.623,68.517 328.315,69.376 328.095 C 70.235 327.874,70.938 327.580,70.938 327.441 C 70.938 327.302,71.266 327.188,71.667 327.188 C 72.068 327.188,72.489 327.094,72.603 326.980 C 72.910 326.674,75.988 325.625,76.581 325.625 C 76.862 325.625,77.533 325.405,78.073 325.135 C 78.613 324.866,80.006 324.364,81.168 324.021 C 86.004 322.591,93.095 320.672,94.844 320.319 C 95.875 320.111,97.061 319.804,97.479 319.638 C 97.898 319.472,99.445 319.067,100.917 318.739 C 105.107 317.805,110.615 316.612,112.500 316.231 C 113.445 316.040,115.133 315.687,116.250 315.448 C 119.704 314.708,125.349 313.712,126.691 313.607 C 127.394 313.552,128.531 313.354,129.219 313.167 C 129.906 312.980,131.139 312.824,131.957 312.820 C 132.776 312.816,133.690 312.679,133.989 312.515 C 134.447 312.264,145.530 310.571,149.531 310.141 C 161.150 308.893,166.436 304.713,171.243 292.969 C 171.384 292.625,171.708 291.852,171.963 291.250 C 172.219 290.648,172.613 289.629,172.839 288.984 C 173.065 288.340,173.363 287.812,173.500 287.813 C 173.638 287.813,173.750 287.478,173.750 287.070 C 173.750 286.661,173.961 286.151,174.219 285.938 C 174.477 285.724,174.687 285.390,174.687 285.196 C 174.685 284.753,176.315 280.836,176.588 280.625 C 176.700 280.539,176.897 280.117,177.027 279.688 C 177.800 277.132,186.620 260.180,191.375 252.112 C 192.767 249.750,194.373 247.008,194.944 246.018 C 199.143 238.739,200.229 238.207,202.758 242.188 C 203.358 243.133,204.170 244.234,204.563 244.634 C 205.888 245.986,209.265 251.392,210.159 253.594 C 210.647 254.797,211.776 257.188,212.667 258.906 C 213.558 260.625,215.523 264.422,217.034 267.344 C 220.605 274.248,221.017 274.991,222.745 277.628 C 223.835 279.291,224.650 281.207,226.014 285.313 C 227.013 288.320,228.108 291.377,228.446 292.106 C 228.785 292.835,229.062 293.528,229.063 293.647 C 229.063 293.766,229.715 295.209,230.513 296.854 C 233.127 302.240,235.569 305.100,238.981 306.769 C 239.892 307.215,240.713 307.702,240.806 307.852 C 240.898 308.002,241.309 308.125,241.719 308.125 C 242.128 308.125,242.540 308.249,242.634 308.401 C 242.728 308.554,243.193 308.748,243.668 308.833 C 244.143 308.918,245.727 309.229,247.188 309.524 C 248.648 309.818,250.266 310.109,250.781 310.171 C 251.297 310.233,252.633 310.422,253.750 310.592 C 254.867 310.761,257.820 311.187,260.313 311.538 C 267.029 312.483,270.952 313.114,272.246 313.458 C 272.879 313.626,273.512 313.732,273.652 313.695 C 273.792 313.657,274.609 313.743,275.469 313.885 C 276.328 314.028,277.313 314.188,277.656 314.240 C 279.152 314.467,282.164 315.089,283.738 315.496 C 284.676 315.739,285.890 315.937,286.436 315.937 C 286.982 315.938,287.831 316.148,288.324 316.404 C 288.816 316.661,289.641 316.875,290.156 316.879 C 290.672 316.883,292.922 317.310,295.156 317.828 C 297.391 318.346,299.818 318.902,300.551 319.064 C 301.284 319.226,302.154 319.502,302.484 319.679 C 302.814 319.856,303.410 319.999,303.808 319.998 C 304.206 319.998,305.164 320.198,305.938 320.443 C 306.711 320.688,308.680 321.206,310.313 321.593 C 311.945 321.980,314.266 322.632,315.469 323.042 C 316.672 323.452,318.891 324.132,320.401 324.553 C 321.911 324.975,323.387 325.438,323.682 325.583 C 323.977 325.728,325.273 326.208,326.563 326.650 C 329.847 327.778,330.999 328.182,331.719 328.460 C 332.063 328.593,333.223 329.028,334.297 329.427 C 335.371 329.826,336.250 330.259,336.250 330.389 C 336.250 330.519,336.503 330.625,336.813 330.625 C 337.122 330.625,337.509 330.744,337.672 330.891 C 337.835 331.037,338.602 331.400,339.375 331.697 C 342.287 332.819,343.825 333.548,347.656 335.622 C 349.203 336.460,351.102 337.471,351.875 337.869 C 352.648 338.267,353.358 338.695,353.451 338.820 C 353.819 339.310,358.508 341.749,361.719 343.119 C 364.542 344.323,370.510 344.661,373.125 343.764 C 374.414 343.322,374.998 343.142,375.162 343.138 C 375.710 343.122,378.664 341.356,379.687 340.432 C 385.877 334.840,386.271 324.054,380.627 314.688 C 380.472 314.430,379.619 312.953,378.731 311.406 C 376.068 306.767,369.804 296.602,367.005 292.378 C 366.676 291.881,366.266 291.248,366.094 290.972 C 365.922 290.695,365.704 290.398,365.609 290.313 C 365.513 290.227,365.099 289.594,364.688 288.906 C 364.276 288.219,363.858 287.586,363.758 287.500 C 363.658 287.414,362.033 285.024,360.148 282.189 C 358.262 279.354,356.550 276.854,356.343 276.635 C 356.137 276.416,355.175 275.079,354.205 273.665 C 353.236 272.251,352.029 270.531,351.524 269.844 C 351.019 269.156,350.366 268.242,350.073 267.813 C 349.779 267.383,348.342 265.424,346.879 263.460 C 342.686 257.833,340.326 254.615,339.588 253.519 C 339.213 252.963,338.765 252.506,338.592 252.504 C 338.419 252.502,338.105 252.113,337.895 251.641 C 337.685 251.168,337.158 250.401,336.725 249.936 C 336.292 249.470,335.938 248.968,335.938 248.820 C 335.937 248.672,335.621 248.253,335.234 247.891 C 334.848 247.528,334.384 247.045,334.203 246.819 C 334.023 246.592,332.423 244.543,330.649 242.266 C 328.874 239.988,327.299 238.125,327.148 238.125 C 326.998 238.125,326.875 237.978,326.875 237.799 C 326.875 237.620,326.579 237.163,326.218 236.784 C 325.857 236.404,325.197 235.602,324.752 235.000 C 324.306 234.398,323.793 233.766,323.610 233.594 C 323.428 233.422,322.653 232.508,321.887 231.563 C 320.115 229.373,319.691 228.879,318.828 227.994 C 318.441 227.597,318.125 227.194,318.125 227.098 C 318.125 227.002,317.738 226.522,317.266 226.032 C 316.473 225.209,313.912 222.313,312.590 220.743 C 312.283 220.378,311.328 219.269,310.469 218.277 C 309.609 217.286,308.555 216.049,308.125 215.530 C 307.695 215.010,306.520 213.729,305.512 212.683 C 304.505 211.637,303.520 210.570,303.325 210.313 C 303.129 210.055,301.705 208.719,300.160 207.344 C 296.713 204.275,296.064 203.648,295.906 203.234 C 295.767 202.871,294.314 201.105,291.156 197.457 C 287.700 193.467,278.755 184.596,276.563 182.985 C 273.921 181.045,271.338 178.654,270.416 177.296 C 269.666 176.190,265.268 171.769,261.286 168.118 C 259.173 166.180,259.063 166.011,259.063 164.698 L 259.062 163.318 269.766 152.644 C 275.652 146.774,282.297 140.316,284.531 138.294 C 286.766 136.273,288.878 134.318,289.226 133.950 C 289.775 133.370,291.962 131.403,295.876 127.969 C 296.463 127.453,297.247 126.750,297.617 126.406 C 297.988 126.063,299.343 124.872,300.630 123.761 C 301.916 122.650,303.198 121.525,303.477 121.261 C 303.757 120.997,304.319 120.512,304.727 120.184 C 305.135 119.856,306.309 118.871,307.337 117.997 C 308.364 117.122,309.543 116.125,309.956 115.781 C 310.370 115.438,310.865 115.014,311.057 114.840 C 311.249 114.665,312.767 113.435,314.431 112.105 C 316.095 110.775,317.641 109.510,317.868 109.293 C 318.096 109.076,319.266 108.130,320.469 107.191 C 321.672 106.252,322.727 105.404,322.813 105.307 C 322.898 105.211,324.586 103.874,326.563 102.338 C 328.539 100.802,330.882 98.980,331.769 98.288 C 332.655 97.597,333.894 96.680,334.522 96.250 C 335.149 95.820,335.830 95.328,336.036 95.156 C 336.385 94.865,337.648 93.919,345.313 88.215 C 354.974 81.024,357.606 72.815,353.221 63.552 C 350.163 57.095,339.929 53.782,331.175 56.417 C 330.271 56.690,328.969 57.053,328.281 57.225 C 327.594 57.398,326.609 57.684,326.094 57.863 C 325.578 58.041,324.313 58.431,323.281 58.729 C 322.250 59.027,321.010 59.435,320.527 59.636 C 320.043 59.836,319.480 60.001,319.277 60.001 C 319.073 60.002,318.063 60.350,317.031 60.775 C 316.000 61.200,314.816 61.551,314.400 61.555 C 313.983 61.559,313.421 61.746,313.150 61.971 C 312.878 62.195,310.969 62.930,308.906 63.603 C 306.844 64.276,305.111 64.931,305.055 65.060 C 305.000 65.188,304.437 65.389,303.805 65.506 C 303.173 65.623,302.375 65.891,302.031 66.102 C 301.688 66.312,300.738 66.673,299.922 66.904 C 299.105 67.135,298.438 67.434,298.438 67.568 C 298.438 67.703,298.191 67.815,297.891 67.817 C 297.590 67.820,296.781 68.036,296.094 68.297 C 295.406 68.559,294.598 68.854,294.297 68.954 C 293.996 69.054,293.750 69.260,293.750 69.411 C 293.750 69.563,293.328 69.688,292.813 69.688 C 292.297 69.688,291.875 69.813,291.875 69.966 C 291.875 70.119,291.488 70.335,291.016 70.445 C 290.543 70.555,289.594 70.910,288.906 71.234 C 288.219 71.558,286.602 72.214,285.313 72.693 C 284.023 73.172,282.633 73.816,282.223 74.125 C 281.814 74.435,281.236 74.688,280.939 74.688 C 280.643 74.688,279.502 75.129,278.403 75.668 C 276.165 76.767,275.004 77.280,273.516 77.827 C 272.957 78.033,272.500 78.324,272.500 78.475 C 272.500 78.626,272.184 78.753,271.797 78.757 C 271.410 78.761,270.742 79.039,270.313 79.375 C 269.883 79.711,269.393 79.989,269.223 79.993 C 268.922 80.000,265.929 81.359,265.000 81.911 C 264.742 82.064,264.180 82.329,263.750 82.501 C 263.320 82.672,262.688 82.978,262.344 83.179 C 262.000 83.381,260.734 84.029,259.531 84.619 C 258.328 85.209,257.133 85.818,256.875 85.972 C 256.617 86.126,256.055 86.392,255.625 86.563 C 255.195 86.735,254.563 87.040,254.219 87.241 C 253.326 87.764,248.615 90.236,246.406 91.341 C 245.375 91.857,244.484 92.399,244.427 92.546 C 244.370 92.692,244.128 92.812,243.889 92.813 C 243.651 92.813,242.385 93.445,241.077 94.219 C 239.769 94.992,238.579 95.625,238.434 95.625 C 238.289 95.625,237.984 95.809,237.757 96.033 C 237.530 96.258,236.395 96.923,235.234 97.510 C 234.074 98.098,233.125 98.688,233.125 98.821 C 233.125 98.954,232.879 99.067,232.578 99.072 C 232.277 99.078,231.758 99.289,231.425 99.541 C 229.460 101.027,228.054 100.047,226.704 96.250 C 226.246 94.961,225.684 93.484,225.454 92.969 C 225.225 92.453,224.528 90.625,223.907 88.906 C 223.285 87.188,222.421 84.938,221.987 83.906 C 221.554 82.875,220.506 80.239,219.659 78.050 C 215.206 66.532,212.918 63.216,207.656 60.647 C 205.823 59.752,204.573 59.368,202.969 59.209 C 201.766 59.089,200.685 58.935,200.567 58.865 C 200.141 58.613,194.963 59.360,194.133 59.794 C 193.665 60.039,192.726 60.502,192.048 60.823 C 188.322 62.584,185.257 66.350,182.799 72.188 C 182.256 73.477,181.627 74.953,181.401 75.469 C 181.174 75.984,180.809 76.934,180.588 77.578 C 180.367 78.223,180.075 78.750,179.937 78.750 C 179.800 78.750,179.688 79.020,179.688 79.349 C 179.687 79.679,179.394 80.628,179.034 81.458 C 178.675 82.289,178.063 83.813,177.675 84.844 C 177.286 85.875,176.095 89.039,175.027 91.875 C 171.317 101.729,171.703 101.502,165.156 97.694 C 164.125 97.094,162.648 96.282,161.875 95.889 C 161.102 95.496,159.906 94.812,159.219 94.370 C 158.531 93.927,157.266 93.219,156.406 92.798 C 155.547 92.376,154.797 91.926,154.740 91.797 C 154.682 91.668,154.441 91.563,154.204 91.563 C 153.966 91.563,153.106 91.141,152.293 90.625 C 151.480 90.109,150.642 89.688,150.430 89.688 C 150.218 89.688,149.855 89.512,149.624 89.297 C 149.056 88.770,146.503 87.498,146.016 87.499 C 145.801 87.500,145.625 87.359,145.625 87.188 C 145.625 87.016,145.355 86.875,145.026 86.875 C 144.697 86.875,144.380 86.757,144.323 86.613 C 144.189 86.275,138.505 83.438,137.963 83.438 C 137.737 83.438,137.505 83.332,137.448 83.203 C 137.288 82.844,131.233 80.000,130.628 80.000 C 130.455 80.000,130.313 79.859,130.313 79.688 C 130.313 79.516,130.040 79.375,129.706 79.375 C 129.372 79.375,129.012 79.234,128.906 79.063 C 128.800 78.891,128.440 78.750,128.107 78.750 C 127.773 78.750,127.500 78.619,127.500 78.459 C 127.500 78.298,127.184 78.067,126.797 77.945 C 126.108 77.727,122.560 76.157,121.489 75.597 C 121.190 75.440,120.733 75.313,120.473 75.313 C 120.213 75.313,120.000 75.172,120.000 75.000 C 120.000 74.828,119.648 74.688,119.219 74.688 C 118.789 74.688,118.438 74.569,118.438 74.424 C 118.438 74.280,117.418 73.776,116.172 73.305 C 113.544 72.312,112.555 71.909,111.801 71.526 C 111.503 71.374,111.046 71.250,110.785 71.250 C 110.525 71.250,110.313 71.109,110.313 70.938 C 110.313 70.766,110.088 70.625,109.813 70.625 C 109.538 70.625,108.800 70.400,108.172 70.124 C 107.545 69.849,106.750 69.512,106.406 69.375 C 106.063 69.238,105.268 68.901,104.640 68.626 C 104.013 68.350,103.283 68.125,103.018 68.125 C 102.753 68.125,102.460 68.000,102.366 67.848 C 102.271 67.696,101.701 67.478,101.097 67.365 C 100.494 67.252,100.000 67.025,100.000 66.861 C 100.000 66.697,99.675 66.563,99.278 66.563 C 98.882 66.563,98.284 66.356,97.950 66.104 C 97.617 65.851,97.036 65.640,96.659 65.635 C 96.282 65.629,95.887 65.484,95.781 65.313 C 95.675 65.141,95.350 64.999,95.060 64.998 C 94.769 64.997,94.128 64.786,93.636 64.529 C 93.144 64.273,92.503 64.063,92.212 64.063 C 91.920 64.063,91.409 63.856,91.075 63.604 C 90.742 63.351,90.161 63.140,89.784 63.135 C 89.407 63.129,89.012 62.984,88.906 62.813 C 88.800 62.641,88.380 62.500,87.973 62.500 C 87.565 62.500,87.021 62.289,86.763 62.031 C 86.506 61.773,86.006 61.563,85.654 61.563 C 85.081 61.563,83.485 61.051,81.719 60.302 C 81.375 60.156,80.637 59.947,80.078 59.837 C 79.520 59.728,79.063 59.508,79.063 59.350 C 79.063 59.192,78.718 59.063,78.296 59.063 C 77.874 59.063,77.206 58.935,76.812 58.780 C 75.614 58.309,70.895 56.941,68.984 56.512 C 67.996 56.290,67.187 56.034,67.187 55.945 C 67.187 55.687,59.388 55.672,57.656 55.926 M65.093 72.517 C 67.903 72.885,77.378 75.662,85.313 78.444 C 88.320 79.499,91.133 80.477,91.563 80.618 C 113.780 87.915,152.075 106.717,175.395 121.779 C 179.599 124.494,179.105 124.949,182.632 115.126 C 189.123 97.056,197.148 76.821,198.307 75.604 C 199.319 74.540,200.681 74.540,201.693 75.604 C 202.824 76.793,210.575 96.265,216.691 113.281 C 218.174 117.406,219.602 121.367,219.865 122.082 C 220.555 123.960,221.023 123.988,223.730 122.310 C 250.667 105.618,274.257 93.697,299.844 83.849 C 314.548 78.190,331.840 72.615,334.899 72.548 C 335.556 72.534,336.585 72.376,337.185 72.199 C 338.787 71.724,338.938 71.796,337.933 72.557 C 337.437 72.933,336.188 74.030,335.156 74.997 C 333.641 76.417,327.867 81.004,323.167 84.522 C 318.548 87.980,299.164 103.951,294.688 107.987 C 294.086 108.530,290.852 111.408,287.500 114.384 C 256.803 141.639,229.637 170.663,206.017 201.438 C 200.022 209.249,199.896 209.256,194.523 202.136 C 187.791 193.216,180.610 184.406,171.265 173.602 C 150.240 149.297,121.262 121.032,95.156 99.367 C 93.609 98.084,92.273 96.963,92.188 96.876 C 92.102 96.790,91.328 96.161,90.469 95.479 C 89.609 94.798,88.836 94.157,88.750 94.056 C 88.450 93.703,80.730 87.585,74.375 82.664 C 66.048 76.216,65.572 75.833,64.669 74.853 C 64.250 74.398,63.273 73.522,62.500 72.906 C 61.395 72.027,61.261 71.831,61.875 71.992 C 62.305 72.105,63.753 72.341,65.093 72.517 M132.188 152.656 C 133.641 154.117,134.760 155.313,134.674 155.313 C 134.588 155.313,133.328 154.117,131.875 152.656 C 130.422 151.195,129.303 150.000,129.389 150.000 C 129.475 150.000,130.734 151.195,132.188 152.656 M160.401 172.297 C 162.732 173.274,180.644 195.164,191.380 210.156 C 195.605 216.056,195.662 215.406,190.195 223.554 C 184.522 232.007,181.194 237.233,176.735 244.688 C 174.525 248.383,172.404 251.898,172.024 252.500 C 170.479 254.940,166.080 262.820,164.523 265.938 C 164.223 266.539,163.544 267.582,163.016 268.254 C 162.487 268.927,161.838 269.857,161.574 270.322 C 159.396 274.156,158.462 274.327,149.626 272.510 C 129.993 268.472,110.957 261.913,93.594 253.203 C 87.646 250.220,87.459 249.892,89.540 246.094 C 90.011 245.234,90.554 244.216,90.745 243.831 C 90.937 243.445,91.199 243.129,91.328 243.127 C 91.457 243.126,91.563 242.983,91.563 242.809 C 91.563 242.049,104.901 225.677,112.054 217.656 C 130.679 196.772,156.185 171.983,159.151 171.883 C 159.285 171.879,159.848 172.065,160.401 172.297 M242.656 172.590 C 244.014 173.276,257.099 185.485,257.679 186.607 C 258.826 188.824,258.736 188.976,251.235 197.549 C 241.357 208.839,234.281 217.502,225.690 228.822 C 219.697 236.719,219.765 236.659,218.185 235.423 C 216.997 234.493,206.241 218.453,205.739 216.863 C 205.472 216.015,205.476 215.475,205.755 214.666 C 207.168 210.569,236.702 173.525,239.515 172.323 C 240.471 171.914,241.489 172.000,242.656 172.590 M265.469 173.438 C 266.140 174.125,266.619 174.688,266.533 174.688 C 266.447 174.688,265.828 174.125,265.156 173.438 C 264.485 172.750,264.006 172.188,264.092 172.188 C 264.178 172.188,264.797 172.750,265.469 173.438 M285.625 192.969 C 286.208 193.570,286.615 194.063,286.529 194.063 C 286.443 194.063,285.896 193.570,285.313 192.969 C 284.729 192.367,284.323 191.875,284.409 191.875 C 284.495 191.875,285.042 192.367,285.625 192.969 M267.191 195.628 C 267.903 196.134,274.643 203.062,278.852 207.613 C 281.176 210.125,281.675 211.421,280.891 212.911 C 280.614 213.438,276.185 218.557,275.299 219.375 C 271.817 222.589,250.261 248.980,240.222 262.320 C 236.634 267.089,236.162 267.137,233.908 262.969 C 231.943 259.333,230.044 255.999,227.410 251.563 C 224.061 245.919,224.028 245.595,226.433 241.968 C 236.274 227.131,260.974 196.148,263.880 194.996 C 264.776 194.640,266.181 194.908,267.191 195.628 M292.305 222.671 C 304.438 236.403,311.938 247.213,310.831 249.373 C 310.077 250.842,297.625 256.960,286.875 261.142 C 284.898 261.911,283.000 262.657,282.656 262.798 C 278.040 264.703,268.202 267.778,260.156 269.832 C 246.466 273.326,246.887 273.655,252.292 263.691 C 257.278 254.500,283.430 221.171,287.155 219.261 C 288.339 218.654,289.345 219.320,292.305 222.671'
      fill={props.color}
    />
  </Svg>
)

export default Dynamax