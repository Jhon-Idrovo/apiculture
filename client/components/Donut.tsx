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
}: {
  data: any;
  onClickHandler: typeof defaults.onClick;
  //(event: ChartEvent, elements: ActiveElement[], chart: Chart<keyof ChartTypeRegistry, (number | ScatterDataPoint | BubbleDataPoint | null)[], unknown>) => void;
}) {
  console.log(typeof window);
  return (
    <div className="w-full">
      <Doughnut
        data={data}
        className="w-full"
        options={{
          // elements[0] is the first dataset
          onClick: onClickHandler,
        }}
        plugins={{
          ...defaults.plugins,
          // selectClicked: (event, elements, chart) => console.log("on plugin"),
        }}
      />
    </div>
  );
}

export default Donut;
