import '../styles/globals.css'
import "antd/dist/antd.css";
import ContextAppProvider from '../Context/ContextApp/ContextApp';
function MyApp({ Component, pageProps }) {
  return <ContextAppProvider>
    <Component {...pageProps} />
  </ContextAppProvider>
}

export default MyApp
