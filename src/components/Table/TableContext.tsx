import type { TContextType } from "components/tableTypes";
import { edit } from "../utils";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { isEmpty } from "lodash";

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

  const handleScroll = useCallback(
    (e: any) => {
      const bottom =
        e.target.scrollHeight <=
        e.target.scrollTop + e.target.clientHeight * 1.75;
      if (
        bottom &&
        !loading &&
        filteredData?.length < fullFilteredData?.length
      ) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    },
    [fullFilteredData, filteredData, loading],
  );

  const filterData = useCallback(
    (value: string, key: string) => {
      const filtered = data.filter((val: any) => {
        return val.data.some((item: any) => {
          if (!item[key]) return false;

          let compValue = value;
          let itemVal = item[key];

          if (typeof itemVal === "number") {
            // Making sure number representation is consistent
            compValue = value
              .replace("R$", "")
              .replace(".", "")
              .replace(",", ".");
            itemVal = itemVal.toFixed(2);
          } else if (itemVal.match(/(\d{4})-(\d{2})-(\d{2})/))
            // Making sure date representation is consistent
            itemVal = itemVal.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1");

          return itemVal
            .toString()
            .toLowerCase()
            .includes(compValue.toLowerCase());
        });
      });

      setFullFilteredData(filtered);
      setFilteredData(filtered.slice(0, perPage ?? 20));
      setPage(1);
    },
    [data, perPage],
  );

  const toggleSelectAll = useCallback(() => {
    if (isAllSelected) {
      setSelected([]);
      setIsAllSelected(false);
    } else {
      setSelected((val: (number | undefined)[]) => {
        let temp: (number | undefined)[] = [...val];

        if (filteredData) {
          temp =
            filteredData.map(
              (item) =>
                item?.data?.find((i: any) => i.key === selectKey)?.value,
            ) ?? [];
        }

        if (temp.includes(undefined)) temp = [];
        return temp;
      });
    }
  }, [isAllSelected, filteredData, selectKey]);

  const handleSelect = useCallback((key: number) => {
    setSelected((prevSelected) => {
      const index = prevSelected.findIndex((item) => item === key);

      if (index >= 0) {
        const temp = [...prevSelected];
        temp.splice(index, 1);
        return temp;
      }

      return [...prevSelected, key];
    });
  }, []);

  const handleEdit = useCallback(
    (
      rowIndex: number,
      itemIndex: number,
      valKey: string,
      newVal: any,
      money: boolean,
    ) => {
      edit(
        setData,
        setEditedData,
        rowIndex,
        itemIndex,
        valKey,
        newVal,
        money,
        selectKey,
      );
    },
    [selectKey],
  );

  useEffect(() => {
    setIsAllSelected(
      selected.length === filteredData?.length && !isEmpty(filteredData),
    );
  }, [selected, filteredData]);

  useEffect(() => {
    if (page > 1) {
      const startIndex = (page - 1) * (perPage ?? 20);
      const endIndex = page * (perPage ?? 20);

      setFilteredData((prevItems) => [
        ...prevItems,
        ...fullFilteredData.slice(startIndex, endIndex),
      ]);
      setLoading(false);
    }
  }, [page, fullFilteredData, perPage]);

  useEffect(() => {
    setFullFilteredData(data);
    setFilteredData(data.slice(0, perPage ?? 20));
  }, [data, perPage]);

  const values = useMemo(
    () => ({
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
    }),
    [
      columns,
      data,
      filteredData,
      filterData,
      selected,
      toggleSelectAll,
      canSelect,
      editedData,
      handleEdit,
      isAllSelected,
      selectKey,
      handleSelect,
      handleScroll,
      page,
    ],
  );

  return (
    <TableContext.Provider value={values}>
      <div
        key="table"
        className="shadow-gray-600 box-shadow-[0_0_8px_rgba(30,64,175,0.15)] w-full"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
};

export const useTableContext = () => useContext(TableContext);
