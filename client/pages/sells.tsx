import { useEffect } from 'react';

import Loading from '../components/Loading';
import Table from '../components/Table';
import { getProducts, loadProducts } from '../store/entities/products';
import { getSells, loadSells, sellsKeyMapping, sortSells } from '../store/entities/sells';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';

/**
 * Products and their sales. Either individualized or the total
 * @returns
 */
function Sells() {
  const dispatch = useAppDispatch();
  const sells = useAppSelector(getSells);
  const products = useAppSelector(getProducts);
  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadSells());
  }, []);

  if (products.state === "loading" || sells.state === "loading")
    return <Loading />;
  return (
    <main>
      <Table
        rowsSelector={getSells}
        rowsSort={sortSells}
        mapping={sellsKeyMapping}
      >
        {null}
      </Table>
    </main>
  );
}

export default Sells;
