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
const sizes = ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl', 'full', 'none'];
const weights = ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'];
const directions = ['s', 'e', 't', 'r', 'b', 'l', 'ss', 'se', 'ee', 'es', 'tl', 'tr', 'br', 'bl'];

const validateColor = (valOne, valTwo) => {
  return (
    (colors.includes(valOne) && scales.includes(valTwo)) ||
    valOne.match(/\[#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6})\]/g) ||
    valOne == 'white' ||
    valOne == 'black'
  );
};

const validateSize = (val) => {
  return sizes.includes(val) || val.match(/\[\d+px\]/g);
};

const validateWeight = (val) => {
  return weights.includes(val);
};

const validateDirection = (size, valOne, valTwo) => {
  return size > 2
    ? directions.includes(valOne) && (sizes.includes(valTwo) || valTwo.match(/\[\d+px\]/g))
    : directions.includes(valOne) || sizes.includes(valOne) || valOne.match(/\[\d+px\]/g);
};

export function validate(value = '', regex = '', defaultVal = '', validator = 'color') {
  const regexDefined = new RegExp(regex);
  const matchVal = value.match(regexDefined);

  if (!isEmpty(matchVal)) {
    if (
      (validator == 'weight' && validateWeight(matchVal[0].split('-')[1])) ||
      (validator == 'color' && validateColor(matchVal[0].split('-')[1], matchVal[0].split('-')[2])) ||
      (validator == 'size' && validateSize(matchVal[0].split('-')[1])) ||
      (validator == 'direction' &&
        validateDirection(matchVal[0].split('-').length, matchVal[0].split('-')[1], matchVal[0].split('-')[2]))
    ) {
      return matchVal[0];
    } else {
      console.error('Invalid style attempt');
      return defaultVal;
    }
  } else {
    console.error('Invalid style attempt');
    return defaultVal;
  }
}
