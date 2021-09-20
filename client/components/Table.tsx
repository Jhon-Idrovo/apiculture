import { useState, useEffect } from "react";
import TableBody from "../components/TableBody";
import { ExpensesMappingType } from "../store/entities/expenses";
import { HarvestsMappingType } from "../store/entities/harvests";
import { SellsMappingType } from "../store/entities/sells";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import Error from "./Error";
import Loading from "./Loading";

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
  mapping: ExpensesMappingType | HarvestsMappingType | SellsMappingType;
  children: any;
}

function Table({
  rowsSelector,
  rowsSort,
  mapping,
  children = {},
}: TablePropsInterface) {
  const dispatch = useAppDispatch();
  const { loading, sortBy, order, error, list } = useAppSelector(rowsSelector);
  //-----------------DISPLAY---------------------
  //displayed rows and headers
  const [displayRowKeys, setDisplayRowKeys] = useState<string[]>([
    ...Object.keys(mapping),
  ]);

  const handleDisplayCheck = (key: string) => {
    const kIndex = displayRowKeys.indexOf(key);
    let newHiddenRows = [...displayRowKeys];
    // add or remove dive row as neccesary
    kIndex === -1 ? newHiddenRows.push(key) : newHiddenRows.splice(kIndex, 1);
    setDisplayRowKeys(newHiddenRows);
  };
  useEffect(() => {
    setDisplayRowKeys([...Object.keys(mapping)]);
  }, [mapping]);
  //-------------TABLE MENU--------------
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <div className="w-full overflow-x-show" style={{ height: "max-content" }}>
      <div className="enhanced-table">
        <div className="t-head t-row">
          {/* Menu button */}
          <div className="relative t-cell">
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
              {Object.keys(mapping).map((field) => (
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
                    {mapping[field].header}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          {/* Headers */}
          {displayRowKeys.map((k) => {
            return (
              <div
                className="text-txt-base text-right pl-4 t-cell"
                key={"header-" + k}
              >
                <button className="w-max" onClick={() => dispatch(rowsSort(k))}>
                  {sortBy === k ? (
                    <i
                      className={`fas fa-chevron-up text-txt-base  transition-all ${
                        order === "asc" ? "" : "rotate-180 transform"
                      }`}
                    ></i>
                  ) : null}
                  {mapping[k].header}
                </button>
              </div>
            );
          })}
        </div>
        <TableBody rows={list} keysMapping={mapping} />
        {children}
      </div>
    </div>
  );
}

export default Table;
