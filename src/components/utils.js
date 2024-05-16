export function edit(setEditableData, setIsEditing, rowIndex, itemIndex, newVal) {
  setEditableData((value) => {
    const temp = { ...value };

    temp.body.values[rowIndex].data[itemIndex].value = newVal;

    return temp;
  });
  setIsEditing(true);
}

export function selectAllRows(selected, data, setSelected) {
  if (selected.length == data?.body?.values?.length) {
    setSelected([]);
  } else {
    setSelected(() => {
      const temp = [];

      data?.body?.values?.map((item) => {
        const index = item?.data?.findIndex((val) => val.key == 'id');
        temp.push(parseInt(item?.data[index].value));
      });

      return temp;
    });
  }
}

export function selectRow(data, rowIndex, selected, setSelected) {
  const index = data?.body?.values[rowIndex]?.data?.findIndex((val) => val.key == 'id');
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
