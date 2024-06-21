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
const heights = [
  '0',
  'px',
  '0.5',
  '1',
  '1.5',
  '2',
  '2.5',
  '3',
  '3.5',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '14',
  '16',
  '20',
  '24',
  '28',
  '32',
  '36',
  '40',
  '44',
  '48',
  '52',
  '56',
  '60',
  '64',
  '72',
  '80',
  '96',
  'full',
  'screen',
  'svh',
  'lvh',
  'dvh',
  'min',
  'max',
  'fit',
  'none',
];
const sizes = ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl', 'full', 'none'];
const weights = ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'];
const directions = ['s', 'e', 't', 'r', 'b', 'l', 'ss', 'se', 'ee', 'es', 'tl', 'tr', 'br', 'bl'];
const textStyles = ['italic', 'not-italic'];

const validateColor = (valOne, valTwo) => {
  return (
    (colors.includes(valOne) && scales.includes(valTwo)) ||
    valOne?.match(/\[#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6})\]/g) ||
    valOne == 'white' ||
    valOne == 'black'
  );
};

const validateSize = (val) => {
  return sizes.includes(val) || val?.match(/\[\d+(px|rem)\]/g);
};

const validateHeight = (val) => {
  return heights.includes(val) || val?.match(/\[\d+(px|rem|vh|vw)\]/g);
};

const validateWeight = (val) => {
  return weights.includes(val);
};

const validateDirection = (size, valOne, valTwo) => {
  return size > 2
    ? directions.includes(valOne) && (sizes.includes(valTwo) || valTwo?.match(/\[\d+(px|rem)\]/g))
    : directions.includes(valOne) || sizes.includes(valOne) || valOne?.match(/\[\d+(px|rem)\]/g);
};

const validateTextStyle = (val) => {
  return textStyles.includes(val);
};

export function validate(value = '', regex = '', defaultVal = '', validator = 'color') {
  const regexDefined = new RegExp(regex);
  const matchVal = value?.match(regexDefined);

  if (!isEmpty(matchVal)) {
    if (
      (validator == 'textStyle' && validateTextStyle(matchVal[0])) ||
      (validator == 'height' && (validateHeight(matchVal[0].split('-')[2]) || validateHeight(matchVal[0].split('-')[1]))) ||
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
