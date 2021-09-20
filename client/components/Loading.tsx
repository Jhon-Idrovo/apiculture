import { translate } from '../utils/utils';
import FSMessage from './FSMessage';

function Loading() {
  return (
    <FSMessage>
      <div className="flex flex-col justify-center items-center ">
        <div className="spinner"></div>
        <p>{translate("ldng")}</p>
      </div>
    </FSMessage>
  );
}

export default Loading;
