import { defaults, Doughnut } from 'react-chartjs-2';

/**
 * Note that this only works with one dataset, wich contains all the values for a group of datapoints.
 * More datasets make inner circles on the donut.
 * @param param0
 * @returns
 */
function Donut({
  data,
  onClickHandler,
  title,
}: {
  data: any;
  onClickHandler: typeof defaults.onClick;
  title: string;
}) {
  return (
    <div className="w-full mx-auto donut relative">
      <h1 className="mx-auto w-min chart-title">{title}</h1>
      <Doughnut
        data={data}
        className="w-full"
        options={{
          onClick: onClickHandler,
          // text color
          color: "#FFFFFF",
        }}
        plugins={{
          ...defaults.plugins,
        }}
      />
    </div>
  );
}

export default Donut;
