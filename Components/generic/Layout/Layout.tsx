import * as React from 'react';
import { Layout as LayoutAntd } from 'antd';
import Menu from '../Menu/Menu';
import { MenuSider } from '../MenuSider/MenuSider';
import { HeaderLayout } from '../HeaderLayout/HeaderLayout';
import { ContactSider } from '../ContactSider/ContactSider';
import { SiderRight } from './LayoutSiderRight/SiderRight';

const { Header, Footer, Sider, Content } = LayoutAntd;


interface IModalFormSite {
    siderContent?: React.ReactNode
}

const Layout: React.FunctionComponent<IModalFormSite> = ({ children, siderContent }) => {

    return (
        <LayoutAntd style={{ minHeight: '100%' }}>
            <HeaderLayout />
            <LayoutAntd >
            <MenuSider />

                <div style={{width:'100%'}}>
                    {children}
                </div>
                
                {siderContent != false ? <SiderRight/> : <></>}


            </LayoutAntd>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>

        </LayoutAntd >
    );
};

export default Layout;
{/* <Sider  className='siderRight'>
                <ContactSider />
            </Sider> */}