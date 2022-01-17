import * as React from 'react';
import { Layout as LayoutAntd } from 'antd';
import Menu from '../Menu/Menu';

const { Header, Footer, Sider, Content } = LayoutAntd;


interface IModalFormSite {
    siderContent? : React.ReactNode
}

const Layout: React.FunctionComponent<IModalFormSite> = ({ children, siderContent }) => {

    return (
        <LayoutAntd className="layout">
            <Header>
                <Menu/>
            </Header>
            <LayoutAntd>
                <Content style={{ padding: '50px' }}>
                    <div className="site-layout-content">
                        <div className='center'>
                            {children}
                        </div>
                    </div>
                </Content>
                {siderContent && (
                    <Sider
                        className="site-layout-background"
                        width={250}
                    >
                        <div className='center'>
                            {siderContent}
                        </div>
                    </Sider>
                )}
            </LayoutAntd>
            <Footer style={{ textAlign: 'center' }}>Oui oui les cred ©2022</Footer>
        </LayoutAntd >
    );
};

export default Layout;
