import Loading from "./Loading";
import Head from "next/head";
import { Doughnut } from "react-chartjs-2";
function Donut() {
  console.log(typeof window);
  return (
    <div className="w-full">
      <Doughnut
        data={{
          labels: ["Red", "Blue", "Yellow"],
          datasets: [
            {
              label: "My First Dataset",
              data: [300, 50, 100],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
              hoverOffset: 50,
            },
          ],
        }}
        className="w-full"
        options={{ interaction: {} }}
      />
    </div>
  );
}

export default Donut;
