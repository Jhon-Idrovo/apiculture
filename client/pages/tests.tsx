import Donut from "../components/Donut";
import Loading from "../components/Loading";

function Tests() {
  if (typeof window !== "undefined")
    return (
      <div>
        <Donut />
      </div>
    );
  return <Loading />;
}

export default Tests;
