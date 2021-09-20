import { translate } from '../utils/utils';
import FSMessage from './FSMessage';

function Error() {
  return <FSMessage>{translate("errorMsg")}</FSMessage>;
}

export default Error;
