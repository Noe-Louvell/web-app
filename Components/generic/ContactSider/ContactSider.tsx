import * as React from 'react';
import { FunctionComponent } from 'react';
import { Button, Layout, List, Row, Col, Typography, Avatar, Badge, Dropdown, Menu, Space, Image } from 'antd';
import {
    SearchOutlined, UserOutlined,
} from '@ant-design/icons';
import BadgeUser from '../../User/BadgeUser/BadgeUser';
import { UserList, User1 } from '../../../mocks/user.mock';
import BadgeUserProfile from '../../User/BadgeUser/BadgeUserProfile';
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

    return (
        <>
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
                dataSource={UserList}
                renderItem={item => (
                    <List.Item>
                        <Space>
                            <BadgeUser size={30} user={item} />
                        </Space>
                    </List.Item>
                )}
            />
        </>

    );
};
