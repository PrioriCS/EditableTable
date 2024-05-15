import { isEmpty } from 'lodash';

const colors = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'white',
  'black',
];
const scales = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl', 'full', 'none'];
const weights = ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'];
const directions = ['s', 'e', 't', 'r', 'b', 'l', 'ss', 'se', 'ee', 'es', 'tl', 'tr', 'br', 'bl'];

export function validate(value = '', regex = '', errorVal = '') {
  const regexDefined = new RegExp(regex);
  const matchVal = value.match(regexDefined);

  if (
    !isEmpty(matchVal) &&
    ((colors.includes(matchVal[0].split('-')[1]) && scales.includes(matchVal[0].split('-')[2])) ||
      sizes.includes(matchVal[0].split('-')[1]) ||
      weights.includes(matchVal[0].split('-')[1]) ||
      directions.includes(matchVal[0].split('-')[1]) ||
      matchVal[0].split('-')[1].match(/\[#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6})\]/g) ||
      matchVal[0].split('-')[1].match(/\[\d+px\]/g))
  ) {
    return matchVal[0];
  } else {
    return errorVal;
  }
}
