import * as React from 'react';
import { FunctionComponent } from 'react';
import { Button, Layout, List, Row, Col, Typography, Avatar, Badge, Dropdown, Menu, Space, Image } from 'antd';
import {
    SearchOutlined, UserOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Sider } = Layout;

export const ContactSider: FunctionComponent = () => {
    const data = [
        '1',
        '2',
        '3',
        '4',
        '5',
    ];

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
        <Sider
            className='siderMenu'
        >
            <Dropdown overlay={menu} placement="bottomRight" arrow>
                <Badge dot={true}>
                    <Avatar icon={<UserOutlined />} />
                </Badge>
            </Dropdown>
            <List
                header={
                    <Row>
                        <Col className="gutter-row" span={17}>
                            <Title level={5}>Contacts </Title>
                        </Col>
                        <Col className="gutter-row" span={3}>
                            <Button type="text" icon={<SearchOutlined />}></Button>
                        </Col>
                    </Row>
                }
                footer={null}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <Space>
                            <Avatar src={<Image src="https://joeschmoe.io/api/v1/random" style={{ width: 32 }} />} />
                            <Text>Ant Design (default)</Text>
                        </Space>
                    </List.Item>
                )}
            />
        </Sider>
    );
};
