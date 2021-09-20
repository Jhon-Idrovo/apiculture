import FSMessage from "./FSMessage";

function Loading() {
  return (
    <FSMessage>
      <div className="flex flex-col justify-center items-center ">
        <div className="spinner"></div>
        <p>Loading</p>
      </div>
    </FSMessage>
  );
}

export default Loading;
