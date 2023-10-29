import * as Colors from '@tamagui/colors'

// nice and flat

export const light = {
  ...Colors.blue,
  ...Colors.gray,
  ...Colors.grayA,
  ...Colors.green,
  ...Colors.indigo,
  ...Colors.orange,
  ...Colors.pink,
  ...Colors.purple,
  ...Colors.red,
  ...Colors.violet,
  ...Colors.yellow,
}

export const dark = {
  ...Colors.blueDark,
  ...Colors.grayDark,
  ...Colors.grayDarkA,
  ...Colors.greenDark,
  ...Colors.indigoDark,
  ...Colors.orangeDark,
  ...Colors.pinkDark,
  ...Colors.purpleDark,
  ...Colors.redDark,
  ...Colors.violetDark,
  ...Colors.yellowDark,
}

export const darkColorsPostfixed = Object.fromEntries(
  // Dark
  Object.entries(dark).map(([k, v]) => [`${k}Dark`, v])
) as {
  [key in `${keyof typeof dark}Dark`]: string
}

export type ColorNamesLight = keyof typeof light
export type ColorNamesDark = keyof typeof dark

export const colorNamesLight = Object.keys(light) as ColorNamesLight[]
export const colorNamesDark = Object.keys(dark) as ColorNamesDark[]



export const blackColors = [
  '#000000',
  '#111111',
  '#222222',
  '#333333',
  '#444444',
  '#555555',
  '#666666',
  '#777777',
  '#888888',
  '#999999',
  '#AAAAAA',
  '#BBBBBB',
  '#CCCCCC',
  '#DDDDDD',
  '#EEEEEE',
  '#FFFFFF',
];

export const cardColors = [
  '#FFFFE0',
  '#FFFACD',
  '#FFE4B5',
  '#FFEFD5',
  '#F0E68C',
  '#D2B48C',
  '#BC8F8F',
  '#AEC6CF',
  '#C9AECF',
  '#CFB9AE',
  '#CFD6AE',
  '#B9CFAE',
  '#AED3CF',
  '#CFAEAE',
  '#CFBFAE',
  '#E2CFB9',
  '#E0CFD6',
  '#CFC2AE',
  '#CFD0AE',
  '#D8BFD8',
  '#B0E0E6',
  '#87CEEB',
  '#BFEFFF',
  '#FFC0CB',
  '#FFDAB9',
  '#FFA07A',
  '#FFB6C1',
  '#FFD700',
  '#AFEEEE',
  '#98FB98',
  '#ADFF2F',
  '#00FA9A',
  '#7FFFD4',
  '#48D1CC',
  '#40E0D0',
  '#00CED1',
  '#AFEEEE',
  '#FFE4E1',
  '#FFE4C4',
  '#DA70D6',
  '#DDA0DD',
  '#EE82EE',
  '#FF00FF',
  '#FF00FF',
  '#BA55D3',
  '#9370DB',
  '#663399',
  '#4B0082',
  '#8A2BE2',
  '#9370DB',
  '#7B68EE',
  '#6A5ACD',
  '#483D8B',
  '#FA8072',
  '#FFA500',
  '#FF8C00',
  '#FF4500',
  '#FF6347',
  '#FF69B4',
  '#FF1493',
  '#DC143C',
  '#C71585',
  '#DB7093',
  '#FF7F50',
  '#FF4500',
  '#FF8C00',
  '#FFA500',
  '#FFD700',
  '#FFFF00',
  '#F0E68C',
  '#ADFF2F',
  '#7FFF00',
  '#32CD32',
  '#00FF00',
  '#00FA9A',
  '#40E0D0',
  '#00FFFF',
  '#AFEEEE',
  '#00BFFF',
  '#87CEEB',
  '#4682B4',
  '#1E90FF',
  '#0000FF',
  '#0000CD',
  '#191970',
];


export const randomColor = [
  '#00A5B2',
  '#078080',
  '#8DD6AC',
  '#55CFB5',
  '#1DF093',
  '#CF556F',
  '#C8643D',
  '#F0931D',
  '#ff8e3c',
  '#f25042',
  '#F01D7A',
  '#D68DB7',
  '#f582ae',
  '#1D7AF0',
  '#931DF0',
  '#9656a1',
];

export const customSwatches = [
  '#ff8e3c',
  '#078080',
  '#1DF093',
  '#f25042',
  '#D68DB7',
  '#1D7AF0',
  '#9656a1',
];

export const randomColors = [
  '#FF4136', // red
  '#2ECC40', // green
  '#0074D9', // blue
  '#FF851B', // orange
  '#B10DC9', // purple
  '#FFDC00', // yellow
  '#F012BE', // magenta
  '#39CCCC', // teal
  '#85144b', // maroon
  '#3D9970', // olive
  '#FFFFFF', // white
  '#FF69B4', // hot pink
  '#00FF7F', // spring green
  '#6A5ACD', // slate blue
  '#FF1493', // deep pink
];