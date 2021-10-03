import Link from 'next/link';

import { translate } from '../utils/utils';
import FSMessage from './FSMessage';

function LogingNeeded() {
  return (
    <FSMessage>
      <>
        <p>{translate("ingresoNecesario")}</p>
        <Link href="/login">
          <a className="btn btn-primary mx-auto">{translate("ir")}</a>
        </Link>
      </>
    </FSMessage>
  );
}

export default LogingNeeded;
