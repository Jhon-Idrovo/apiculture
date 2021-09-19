import { useEffect } from "react";
import Table from "../components/Table";
import { loadProducts } from "../store/entities/products";
import { getSells, loadSells, sortSells } from "../store/entities/sells";
import { useAppDispatch } from "../store/hooks/hooks";
/**
 * Products and their sales. Either individualized or the total
 * @returns
 */
function Sells() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadSells());
  }, []);
  return (
    <div>
      <Table rowsSelector={getSells} rowsSort={sortSells}></Table>
    </div>
  );
}

export default Sells;
