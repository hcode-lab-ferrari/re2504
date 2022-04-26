import '../assets/sass/main.scss';
import type { AppProps } from 'next/app';
import MenuProvider from '../contexts/MenuContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MenuProvider>
      <Component {...pageProps} />
    </MenuProvider>
  );
}

export default MyApp;
