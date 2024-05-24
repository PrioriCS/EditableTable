export function edit(setData, setEditedData, setIsEditing, rowIndex, itemIndex, newVal) {
  setData((value) => {
    const temp = { ...value };

    setEditedData((val) => {
      const tempVal = { ...val };
      const valIndex = tempVal.values.findIndex((item) => item == temp.body.values[rowIndex].data);

      if (valIndex >= 0) {
        tempVal.values[valIndex][itemIndex].value = newVal;
      } else {
        tempVal.values = [...tempVal.values, temp.body.values[rowIndex].data];
      }

      return tempVal;
    });

    temp.body.values[rowIndex].data[itemIndex].value = newVal;

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
