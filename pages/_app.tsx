import '../styles/globals.css'
import "antd/dist/antd.css";
import NextNProgress from 'nextjs-progressbar';
import ContextAppProvider from '../Context/ContextAuth/ContextAuth';
import { CookiesProvider } from "react-cookie";
function MyApp({ Component, pageProps }) {
  return <CookiesProvider>
    <ContextAppProvider>
      <NextNProgress />
      <Component {...pageProps} />
    </ContextAppProvider>
  </CookiesProvider>
}


export default MyApp
