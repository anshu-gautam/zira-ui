import axios from 'axios';
import { Toaster } from 'react-hot-toast';

import 'remixicon/fonts/remixicon.css';
import '../styles/globals.css';
import { Layout } from '../components';

axios.defaults.baseURL = 'http://localhost:3000/';

function MyApp({ Component, pageProps }) {
  const isAuthRoute = ['SignIn', 'SignUp'].includes(Component.name);

  if (isAuthRoute) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Toaster />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
