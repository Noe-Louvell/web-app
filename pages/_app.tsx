import '../styles/globals.css'
import "antd/dist/antd.css";
import ContextAppProvider from '../Context/ContextAuth/ContextAuth';
import { CookiesProvider } from "react-cookie";
function MyApp({ Component, pageProps }) {
  return <CookiesProvider>
    <ContextAppProvider>
      <Component {...pageProps} />
    </ContextAppProvider>
  </CookiesProvider>
}


export default MyApp
