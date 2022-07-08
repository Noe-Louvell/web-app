import * as React from 'react';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
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
    HomeOutlined,
    BarChartOutlined,
    MessageOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;
import { MarianneIcon } from '../CustomIcon/CutomIcons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useRouter } from 'next/router'
import { ContextApp } from '../../../Context/ContextAuth/ContextAuth';
import axios from 'axios';
import { isADM, isCYN, isMOD, isSAM } from '../../../Utils/getPermission';

export const MenuSider: FunctionComponent = () => {
    const { userSession, tokenSession } = useContext(ContextApp);

    const [collapsed, setCollapsed] = useState(false);
    const [role, setRole] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const getData = () => {
        setIsLoading(true)
        axios({
            method: 'get',
            url: 'http://localhost:3000/api/utilisateur/role',
            headers: {
                'Authorization': 'Bearer ' + tokenSession.token
            }
        }).then((res) => {
            setRole(res.data)

            setIsLoading(false)
        })
    }

    useEffect(() => {
        if (tokenSession.token) {
            getData()
        }
    }, []);
    return (
        <>
            <Sider
                className='siderMenu'
                collapsed={collapsed}
                collapsedWidth={100}
                style={{
                    height: '100vh',
                    zIndex: 10,
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    // marginTop:'-40px !important'
                }}
            >
                <MarianneIcon className='logoMarianne' />
                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    inlineCollapsed={collapsed}
                >
                    <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => router.push('/')}>
                        Accueil
                    </Menu.Item>
                    {
                        Object.keys(userSession).length !== 0 ?
                            <>
                                <Menu.Item key="2" icon={<UserOutlined />} onClick={() => router.push('/utilisateur')}>
                                    Mon compte
                                </Menu.Item>
                                <Menu.Item key="7" icon={<MessageOutlined />} onClick={() => router.push('/messages')}>
                                    Mes messages
                                </Menu.Item>
                            </>

                            : <></>
                    }
                    {
                        Object.keys(userSession).length !== 0 && !isCYN(role) ?
                            <SubMenu key="3" icon={<ToolOutlined />} title="Administration" >
                                {isMOD(role) ? <>
                                    <Menu.Item icon={<ReadOutlined />} key="4" onClick={() => router.push('/administration/publications')}>Publications</Menu.Item>
                                    <Menu.Item icon={<CommentOutlined />} key="5" onClick={() => router.push('/administration/commentaires')}>Commentaires</Menu.Item>
                                </> : <></>
                                }
                                {isADM(role) ? <>
                                    <Menu.Item icon={<TeamOutlined />} key="3" onClick={() => router.push('/administration/utilisateurs')}>Utilisateurs</Menu.Item>
                                </> : isSAM(role) ? <>
                                    <Menu.Item icon={<TeamOutlined />} key="3" onClick={() => router.push('/administration/utilisateurs')}>Utilisateurs</Menu.Item>
                                    <Menu.Item icon={<ReadOutlined />} key="4" onClick={() => router.push('/administration/publications')}>Publications</Menu.Item>
                                    <Menu.Item icon={<CommentOutlined />} key="5" onClick={() => router.push('/administration/commentaires')}>Commentaires</Menu.Item>
                                    <Menu.Item icon={<BarChartOutlined />} key="6" onClick={() => router.push('/administration/statistiques')}>Statistiques</Menu.Item>
                                </> : <></>
                                }
                            </SubMenu> :
                            <></>
                    }


                    <Button key="action" onClick={() => setCollapsed(!collapsed)} style={{ justifyContent: 'center', width: '100%', borderWidth: 0 }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                    </Button>
                </Menu>
            </Sider>
        </>
    );
};
