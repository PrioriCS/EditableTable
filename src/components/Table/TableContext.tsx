import { TContextType } from 'components/tableTypes';
import { edit } from '../utils';
import React, { createContext, useContext, useEffect, useState } from 'react';

const TableContext = createContext<TContextType>({});

export const TableProvider = ({ children, columnsData, initialData, canSelect, selectKey }: TContextType) => {
  const [columns, setColumns] = useState(columnsData);
  const [data, setData] = useState(initialData || []);
  const [filteredData, setFilteredData] = useState(initialData || []);
  const [editedData, setEditedData] = useState([]);
  const [selected, setSelected] = useState<(number | undefined)[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleScroll = (e: any) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading && filteredData?.length < data?.length) {
      setLoading(true);
      setTimeout(() => {
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
      }, 500);
    }
  };

  const filterData = (value: string, key: string) => {
    const filtered = data?.filter((val: any) =>
      val?.data?.find((item: any) => item[key].toString().toLowerCase().includes(value.toLowerCase()))
    );

    setFilteredData(filtered.slice(0, 20));
    return;
  };

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelected([]);
      setIsAllSelected(false);
    } else {
      setSelected((val: (number | undefined)[]) => {
        let temp: (number | undefined)[] = [...val];

        if (filteredData) {
          temp = filteredData.map((item) => item?.data?.find((i: any) => i.key == selectKey)?.value) ?? [];
        }

        if (temp.includes(undefined)) temp = [];
        return temp;
      });
    }
  };

  const handleSelect = (key: number) => {
    const index: number = selected.findIndex((item) => item == key) ?? -1;

    if (index >= 0) {
      setSelected((val) => {
        const temp = [...val];
        temp.splice(index, 0);

        return temp;
      });
      selected.splice(index, 1);
    } else {
      setSelected((val) => [...val, key]);
    }
  };

  const handleEdit = (rowIndex: number, itemIndex: number, valKey: string, newVal: any, money: boolean) => {
    edit(setData, setEditedData, rowIndex, itemIndex, valKey, newVal, money, selectKey);
  };

  useEffect(() => {
    if (selected.length == data?.length) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
  }, [selected]);

  useEffect(() => {
    setFilteredData(data?.slice(0, 20));
  }, [data]);

  useEffect(() => {
    if (page > 1) {
      const startIndex = (page - 1) * 20;
      const endIndex = page * 20;
      setFilteredData((prevItems: any) => [...prevItems, ...(data as any)?.slice(startIndex, endIndex)]);
    }
  }, [page, data]);

  return (
    <TableContext.Provider
      value={{
        columns,
        setColumns,
        data,
        setData,
        filteredData,
        filterData,
        selected,
        setSelected,
        toggleSelectAll,
        canSelect,
        editedData,
        handleEdit,
        isAllSelected,
        selectKey,
        handleSelect,
        handleScroll,
      }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => useContext(TableContext);
