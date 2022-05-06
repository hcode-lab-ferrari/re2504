import '../assets/sass/main.scss';
import type { AppProps } from 'next/app';
import MenuProvider from '../contexts/MenuContext';
import AuthProvider from '../components/Auth/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <MenuProvider>
        <Component {...pageProps} />
      </MenuProvider>
    </AuthProvider>
  );
}

export default MyApp;
