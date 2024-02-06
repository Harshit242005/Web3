// i guess this is a warpper file helps us to pass data to the application
// pages/_app.tsx
import { AppProps } from 'next/app';
import { InputDataProvider } from './InputDataContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <InputDataProvider>
      <Component {...pageProps} />
    </InputDataProvider>
  );
}

export default MyApp;
