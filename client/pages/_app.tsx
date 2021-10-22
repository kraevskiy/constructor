import '../styles/globals.css';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import './../styles/index.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
