import * as React from 'react';
import { Layout as LayoutAntd } from 'antd';
import Menu from '../Menu/Menu';
import { MenuSider } from '../MenuSider/MenuSider';
import { HeaderLayout } from '../HeaderLayout/HeaderLayout';
import { ContactSider } from '../ContactSider/ContactSider';

const { Header, Footer, Sider, Content } = LayoutAntd;


interface IModalFormSite {
    siderContent?: React.ReactNode
}

const Layout: React.FunctionComponent<IModalFormSite> = ({ children, siderContent }) => {

    return (
        <LayoutAntd hasSider style={{height:'100%'}}>


            <MenuSider />
            <LayoutAntd >
                <HeaderLayout/>
                <Content>Content</Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </LayoutAntd>
            <ContactSider />
        </LayoutAntd >
    );
};

export default Layout;
