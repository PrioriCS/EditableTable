import { TContextType } from 'components/tableTypes';
import { edit } from '../utils';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

const TableContext = createContext<TContextType>({});

export const TableProvider = ({
  children,
  columns: columnsData,
  initialData,
  canSelect: selectble,
  selectKey: keySelect,
  minPerPage,
}: TContextType) => {
  const [columns, setColumns] = useState(columnsData);
  const [data, setData] = useState(initialData || []);
  const [filteredData, setFilteredData] = useState(initialData || []);
  const [fullFilteredData, setFullFilteredData] = useState(initialData || []);
  const [editedData, setEditedData] = useState([]);
  const [selected, setSelected] = useState<(number | undefined)[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [canSelect, setCanSelect] = useState(selectble);
  const [selectKey, setSelectKey] = useState(keySelect);
  const [perPage, setPerPage] = useState(minPerPage);

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
    const filtered = data.filter((val: any) =>
      val.data.some((item: any) => item[key]?.toString().toLowerCase().includes(value.toLowerCase()))
    );

    setFullFilteredData(filtered);
    setFilteredData(filtered.slice(0, perPage ?? 20));
    setPage(1);
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
    setSelected((prevSelected) => {
      const index = prevSelected.findIndex((item) => item === key);

      if (index >= 0) {
        const temp = [...prevSelected];
        temp.splice(index, 1);
        return temp;
      } else {
        return [...prevSelected, key];
      }
    });
  };

  const handleEdit = (rowIndex: number, itemIndex: number, valKey: string, newVal: any, money: boolean) => {
    edit(setData, setEditedData, rowIndex, itemIndex, valKey, newVal, money, selectKey);
  };

  useEffect(() => {
    if (selected.length == filteredData?.length && !isEmpty(filteredData)) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
  }, [selected, filteredData, data, page]);

  useEffect(() => {
    setFilteredData(data?.slice(0, perPage ?? 20));
  }, [data]);

  useEffect(() => {
    if (page > 1) {
      const startIndex = (page - 1) * (perPage ?? 20);
      const endIndex = page * (perPage ?? 20);

      setFilteredData((prevItems) => [...prevItems, ...fullFilteredData.slice(startIndex, endIndex)]);
    }
  }, [page, fullFilteredData]);

  useEffect(() => {
    setFullFilteredData(data);
    setFilteredData(data.slice(0, perPage ?? 20));
  }, [data]);

  useEffect(() => {
    setColumns([]);
    setData([]);
  }, []);

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
        setEditedData,
        handleEdit,
        isAllSelected,
        selectKey,
        handleSelect,
        handleScroll,
        page,
        setPage,
        setCanSelect,
        setPerPage,
        setSelectKey,
      }}>
      <div className='shadow-gray-600 drop-shadow-[0_0_8px_rgba(30,64,175,0.15)] w-full'>{children}</div>
    </TableContext.Provider>
  );
};

export const useTableContext = () => useContext(TableContext);
