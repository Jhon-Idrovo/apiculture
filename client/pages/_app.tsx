import '../styles/global.css';

import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import DesktopSidebar from '../components/DesktopSidebar';
import NavBar from '../components/NavBar';
// i18n
import EN from '../content/locales/en.json';
import ES from '../content/locales/es.json';
// redux
import store from '../store/configureStore';

export default function App({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: AppProps;
}) {
  const { locale } = useRouter();
  console.log(locale);

  const [shortLocale] = locale ? locale.split("-") : ["en"];
  const messages = useMemo(() => {
    switch (shortLocale) {
      case "es":
        return ES;
      case "en":
        return EN;
      default:
        return EN;
    }
  }, [shortLocale]);

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Dashboard for beekeepers where you can easily track your expenses, production, sells and more"
        />
        <title>Apiculture Dashboard</title>
        {/* FONT AWESOME */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Provider store={store}>
        <IntlProvider
          locale={shortLocale}
          messages={messages}
          textComponent={Fragment}
          // To not see errors on missing translations
          //onError={() => null}
        >
          <DesktopSidebar />
          <NavBar />
          <Component {...pageProps} />
        </IntlProvider>
      </Provider>
    </>
  );
}
