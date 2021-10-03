import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { loadHives } from '../store/entities/hives';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { getUser, logIn, logOut } from '../store/user/user';
import { translate } from '../utils/utils';

export default function Home() {
  const user = useAppSelector(getUser);
  const router = useRouter();
  useEffect(() => {
    window.location.href = "/production";
  }, []);
  const dispatch = useAppDispatch();
  return (
    <>
      <Head>
        <title>Trivia App</title>
      </Head>

      <main></main>
    </>
  );
}
