import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    window.location.href = "/production";
  }, []);
  return (
    <>
      <Head>
      </Head>

      <main></main>
    </>
  );
}
