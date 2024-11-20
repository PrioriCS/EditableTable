export const normalizeMoney = (money) => {
  const numberToFormat = typeof money === 'number' ? String(money) : money;

  const moneyFormatted = numberToFormat?.replace(/\D/g, '');

  return moneyFormatted
    ?.split('')
    .reverse()
    .join('')
    .replace('.', '')
    .replace(/(\d{2})/, '$1,')
    .replace(/(\d{3}(?!$))/g, '$1.')
    .split('')
    .reverse()
    .join('');
};

export function edit(setData, setEditedData, rowIndex, itemIndex, valKey, newVal, money = false, key) {
  setData((value) => {
    const temp = [...value];
    temp[rowIndex].data[itemIndex].value = money ? normalizeMoney(newVal) : newVal;

    setEditedData((val) => {
      const tempVal = [...val];
      const valIndex = tempVal.findIndex((item) => item[key] == temp[rowIndex].data.find((it) => it.key == key).value);

      if (valIndex >= 0) {
        tempVal[valIndex][valKey] = money ? normalizeMoney(newVal) : newVal;
      } else {
        const combinedObject = temp[rowIndex].data.reduce((acc, obj) => {
          acc[obj.key] = obj.value;
          return acc;
        }, {});
        tempVal.push(combinedObject);
      }

      return [...tempVal];
    });
    return temp;
  });
}
