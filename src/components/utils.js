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

export function edit(setData, setEditedData, setIsEditing, rowIndex, itemIndex, newVal, money = false) {
  setData((value) => {
    const temp = { ...value };

    setEditedData((val) => {
      const tempVal = { ...val };
      const valIndex = tempVal.values.findIndex((item) => item == temp.body.values[rowIndex].data);

      if (valIndex >= 0) {
        tempVal.values[valIndex][itemIndex].value = money ? normalizeMoney(newVal) : newVal;
      } else {
        tempVal.values = [...tempVal.values, temp.body.values[rowIndex].data];
      }

      return tempVal;
    });

    temp.body.values[rowIndex].data[itemIndex].value = money ? normalizeMoney(newVal) : newVal;

    return temp;
  });

  setIsEditing(true);
}

export function selectAllRows(selected, data, setSelected, key) {
  if (selected.length == data?.body?.values?.length) {
    setSelected([]);
  } else {
    setSelected(() => {
      const temp = [];

      data?.body?.values?.map((item) => {
        const index = item?.data?.findIndex((val) => val.key == key);
        temp.push(parseInt(item?.data[index].value));
      });

      return temp;
    });
  }
}

export function selectRow(data, rowIndex, selected, setSelected, key) {
  const index = data?.body?.values[rowIndex]?.data?.findIndex((val) => val.key == key);
  const value = data?.body?.values[rowIndex]?.data[index]?.value;

  if (selected.find((item) => item == parseInt(value))) {
    const existingIndex = selected.findIndex((item) => item == parseInt(value));
    setSelected((arr) => {
      const temp = [...arr];

      temp.splice(existingIndex, 1);

      return temp;
    });
  } else {
    setSelected((arr) => {
      const temp = [...arr];

      temp.push(parseInt(value));

      return temp;
    });
  }
}
