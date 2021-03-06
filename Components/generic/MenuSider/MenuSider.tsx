import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { Menu, Button, Layout } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    MailOutlined,
    UserOutlined,
    CommentOutlined,
    IdcardOutlined,
    ReadOutlined,
    TeamOutlined,
    ToolOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;
import { MarianneIcon } from '../CustomIcon/CutomIcons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useRouter } from 'next/router'

export const MenuSider: FunctionComponent = () => {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    return (

        <>
            <Sider
                className='siderMenu'
                collapsed={collapsed}
                collapsedWidth={100}
                style={{
                    height: '100vh',
                    zIndex: 1,
                    position: 'sticky',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    marginTop:'-40px !important'
                }}
            >
                <MarianneIcon className='logoMarianne' />
                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    inlineCollapsed={collapsed}
                >
                    <Menu.Item key="acceuil" icon={<PieChartOutlined />} onClick={()=>router.push('/')}>
                        Accueil
                    </Menu.Item>
                    <SubMenu key="compte" icon={<IdcardOutlined />} title="Mon compte">
                        <Menu.Item icon={<UserOutlined />} key="1" onClick={()=>router.push('/utilisateur')}>Profile</Menu.Item>
                        <Menu.Item icon={<ReadOutlined />} key="2">Mes publications</Menu.Item>
                        <Menu.Item icon={<TeamOutlined />} key="3">Mes amis</Menu.Item>
                    </SubMenu>
                    <SubMenu key="administration" icon={<ToolOutlined />} title="Administration">
                        <Menu.Item icon={<TeamOutlined />} key="5" onClick={()=>router.push('/administration/utilisateurs')}>Utilisateurs</Menu.Item>
                        <Menu.Item icon={<ReadOutlined />} key="6" onClick={()=>router.push('/administration/publications')}>Publications</Menu.Item>
                        {/* <Menu.Item icon={<CommentOutlined />} key="7" onClick={()=>router.push('/administration/commentaires')}>Commentaires</Menu.Item> */}
                    </SubMenu>
                    <Button key="action" onClick={() => setCollapsed(!collapsed)} style={{ justifyContent: 'center', width: '100%', borderWidth: 0 }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                    </Button>
                </Menu>
            </Sider>
        </>
    );
};
