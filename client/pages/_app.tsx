import '../styles/globals.css';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import './../styles/index.scss';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
