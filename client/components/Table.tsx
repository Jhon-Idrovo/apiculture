import { useState, useEffect } from "react";
import TableBody from "../components/TableBody";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import Error from "./Error";

export declare interface HeaderMappingInterface {
  header: string;
  key: string;
}
export declare interface TablePropsInterface {
  rowsSelector: any;
  // (state: RootState) => {
  //   fields: string[];
  //   loading: boolean;
  //   sortBy: keyof (IHarvest | ISell | IExpense);
  //   order: Order;
  //   error: string;
  //   list: IHarvest[] | ISell[] | IExpense[];
  // };
  rowsSort: Function;
}

function Table({ rowsSelector, rowsSort }: TablePropsInterface) {
  const dispatch = useAppDispatch();
  const { loading, sortBy, order, error, fields, list } =
    useAppSelector(rowsSelector);
  //-----------------DISPLAY---------------------
  //displayed rows and headers
  const [displayRowKeys, setDisplayRowKeys] = useState<string[]>([...fields]);

  const handleDisplayCheck = (key: string) => {
    const kIndex = displayRowKeys.indexOf(key);
    let newHiddenRows = [...displayRowKeys];
    // add or remove the row as neccesary
    kIndex === -1 ? newHiddenRows.push(key) : newHiddenRows.splice(kIndex, 1);
    setDisplayRowKeys(newHiddenRows);
  };
  useEffect(() => {
    setDisplayRowKeys([...fields]);
  }, [fields]);
  //-------------TABLE MENU--------------
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  if (loading) return <div>Loading</div>;
  if (error) return <Error />;
  return (
    <div className="w-full overflow-x-show" style={{ height: "max-content" }}>
      <table className="w-full">
        <thead className="t-head">
          <tr>
            {/* Menu button */}
            <th className="relative">
              <button
                className="relative overflow-visible w-max"
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                <i className="text-txt-base fas fa-ellipsis-h" />
              </button>
              <ul
                className={`absolute top-full left-0 text-left  bg-primary ${
                  isMenuOpen
                    ? "w-max max-h-screen max-w-screen-sm p-2"
                    : "max-h-0 max-w-0 overflow-hidden "
                }`}
              >
                {fields.map((field: string) => (
                  <li className="px-2" key={"menu-" + field}>
                    <input
                      type="checkbox"
                      id={field + "checkbox"}
                      checked={displayRowKeys.includes(field)}
                      onChange={() => handleDisplayCheck(field)}
                    />
                    <label
                      className="text-txt-primary pl-2"
                      htmlFor={field + "checkbox"}
                    >
                      {field}
                    </label>
                  </li>
                ))}
              </ul>
            </th>
            {/* Headers */}
            {displayRowKeys.map((k) => {
              return (
                <th
                  className="text-txt-base text-right pl-4"
                  key={"header-" + k}
                >
                  <button
                    className="w-max"
                    onClick={() => dispatch(rowsSort(k))}
                  >
                    {sortBy === k ? (
                      <i
                        className={`fas fa-chevron-up text-txt-base  transition-all ${
                          order === "asc" ? "" : "rotate-180 transform"
                        }`}
                      ></i>
                    ) : null}
                    {k}
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <TableBody rows={list} displayRowKeys={displayRowKeys} />
      </table>
    </div>
  );
}

export default Table;
