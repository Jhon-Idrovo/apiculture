import { translate } from '../utils/utils';
import FSMessage from './FSMessage';

function LogingNeeded() {
  return <FSMessage>{translate("ingresoNecesario")}</FSMessage>;
}

export default LogingNeeded;
