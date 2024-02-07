// i guess this is a warpper file helps us to pass data to the application
// pages/_app.tsx
import { AppProps } from 'next/app';
import { InputDataProvider } from './InputDataContext';
import Home from './page';
import Access from './Interface/components/access';
import Denied from './Interface/components/denied';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <InputDataProvider>
     <Access privateKey={''} publicKey={''} />
      <Home />
      <Denied privateKey={''} publicKey={''} />
    </InputDataProvider>
  );
}

export default MyApp;
