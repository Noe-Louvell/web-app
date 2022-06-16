import * as React from 'react';
import { FunctionComponent } from 'react';
import { Badge, Col, Dropdown, Layout, Menu, Row, Typography } from 'antd';
import BadgeUserProfile from '../../User/BadgeUser/BadgeUserProfile';
import { User1 } from '../../../mocks/user.mock';
import { MarianneIcon } from '../CustomIcon/CutomIcons';

const { Header } = Layout;
const { Title } = Typography;



export const HeaderLayout: FunctionComponent = () => {
    const dot = true;
    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Profile
                </a>
            </Menu.Item>

            <Menu.Item>
                <Badge size="small" count={5} offset={[5, 0]}>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                        Amis
                    </a>
                </Badge>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    Messages
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    Déconnexion
                </a>
            </Menu.Item>

        </Menu>
    );
    return (
        <Header className='header-layout'>
            <Row style={{ height: '100%' }} gutter={16} justify="space-between">
                <Col className='header-col' span={22}><Title level={3} style={{ marginBottom: '0px!important', fontSize: '17px!important' }}>Ressources Relationnelles</Title></Col>
                <Col className='header-col' span={2}>
                    <Dropdown overlay={menu} placement="bottomRight" arrow>
                        <BadgeUserProfile />
                    </Dropdown>
                </Col>
            </Row>
        </Header>
    );
};
