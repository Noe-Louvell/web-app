import '../styles/globals.css'
import "antd/dist/antd.css";
import NextNProgress from 'nextjs-progressbar';
import ContextAppProvider from '../Context/ContextAuth/ContextAuth';
import { CookiesProvider } from "react-cookie";
import { MenuSider } from '../Components/generic/MenuSider/MenuSider';
import { Row, Col } from 'antd';
import { HeaderLayout } from '../Components/generic/HeaderLayout/HeaderLayout';
function MyApp({ Component, pageProps }) {
  return <CookiesProvider>
    <ContextAppProvider>
      <NextNProgress />
      <Row>
        <Component {...pageProps} />
      </Row>

    </ContextAppProvider>
  </CookiesProvider>
}


export default MyApp
