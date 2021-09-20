import Head from 'next/head';
import { FormattedMessage } from 'react-intl';

import { loadHives } from '../store/entities/hives';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { getUser, logIn, logOut } from '../store/user/user';
import { translate } from '../utils/utils';

export default function Home() {
  const user = useAppSelector(getUser);

  const dispatch = useAppDispatch();
  return (
    <>
      <Head>
        <title>Trivia App</title>
      </Head>

      <main>
        <div className="">{}</div>
        <div>Name:{user.name}</div>
        <button
          onClick={() => dispatch(logIn("testemail@gmail.com", "lavacalola"))}
        >
          {translate("lgI")}
        </button>
        <button onClick={() => dispatch(logOut())}>{translate("lgO")}</button>
        <button onClick={() => dispatch(loadHives())}></button>
      </main>
    </>
  );
}
