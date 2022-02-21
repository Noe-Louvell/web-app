import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { Menu, Button, Space, Layout } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;
import { MarianneIcon } from '../CustomIcon/CutomIcons';

export const MenuSider: FunctionComponent = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (

        <>
            <Sider
                className='siderMenu'
                collapsed={collapsed}
                collapsedWidth={100}
            >
                    <MarianneIcon className='logoMarianne'/>
                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    inlineCollapsed={collapsed}
                >
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        Accueil
                    </Menu.Item>
                    <Menu.Item key="2" icon={<PieChartOutlined />}>
                        Publications
                    </Menu.Item>
                    <Menu.Item key="3" icon={<DesktopOutlined />}>
                        Carte Région
                    </Menu.Item>
                    <Button onClick={() => setCollapsed(!collapsed)} style={{ justifyContent: 'center', width: '100%', borderWidth: 0 }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                    </Button>
                    {/* <SubMenu key="4" icon={<MailOutlined />} title="Mon profile">
                        <Menu.Item key="5">Moi</Menu.Item>
                        <Menu.Item key="6">Mes publications</Menu.Item>
                        <Menu.Item key="7">Mes amis</Menu.Item>
                        <Menu.Item key="8">Options</Menu.Item>
                    </SubMenu> */}

                </Menu>
            </Sider>
        </>
    );
};
