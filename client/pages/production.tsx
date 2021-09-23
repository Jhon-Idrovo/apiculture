import { useEffect } from 'react';

import Donut from '../components/Donut';
import Loading from '../components/Loading';
import LogingNeeded from '../components/LogingNeeded';
import Table from '../components/Table';
import {
    getHarvests, harvestKeyssMapping, loadHarvests, sortHarvests
} from '../store/entities/harvests';
import { changeActiveHive, getHives, loadHives } from '../store/entities/hives';
import { getProducts, loadProducts } from '../store/entities/products';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { getUser } from '../store/user/user';
import { getDonutData, translate } from '../utils/utils';

/**
 * Hives and their production. Either individualized or total
 * @returns
 */
function Production() {
  const dispatch = useAppDispatch();
  let harvests = useAppSelector(getHarvests);
  let hives = useAppSelector(getHives);
  const products = useAppSelector(getProducts);
  const user = useAppSelector(getUser);

  useEffect(() => {
    dispatch(loadHarvests());
    dispatch(loadProducts());
    dispatch(loadHives());
  }, []);

  //const donutData = useMemo(() => getDonutData(hives.list), hives.list);

  if (user.id === "") return <LogingNeeded />;
  if (
    harvests.state === "loading" ||
    hives.state === "loading" ||
    products.state === "loading"
  )
    return <Loading />;
  return (
    <main>
      <Donut
        data={getDonutData(hives.list)}
        onClickHandler={() => {
          //console.log(elements[0].index);
          // dispatch(
          //   changeActiveHive((hives.list[elements[0].index] as IHive)._id)
          // );
        }}
      />
      <div className="hives-container">
        {hives.list.map((hive) => (
          <div
            className={`hive ${
              hives.activeHiveID === hive._id && "active-hive"
            }`}
            onClick={() => dispatch(changeActiveHive(hive._id))}
          >
            <h2>{hive.name}</h2>
            <h2>{new Date(hive.installationDate).toLocaleDateString()}</h2>
          </div>
        ))}
        <div
          className={`hive ${hives.activeHiveID === "" && "active-hive"}`}
          onClick={() => dispatch(changeActiveHive(""))}
        >
          <h2>{translate("colmenasTodas")}</h2>
        </div>
      </div>

      <Table
        rowsSelector={getHarvests}
        rowsSort={sortHarvests}
        mapping={harvestKeyssMapping}
      >
        {null}
      </Table>
    </main>
  );
}

export default Production;

// To avoid error with react-intl
export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
