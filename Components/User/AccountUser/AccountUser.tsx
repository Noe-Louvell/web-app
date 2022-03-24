import * as React from 'react';
import { useState } from 'react';
import { Button, Col, Modal, Row, Typography, Upload, message, Input, Divider, Space, Avatar } from 'antd';
import { IUser } from '../../../interfaces/IUser';
import { UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
interface IPropsAccountUser {
    user: IUser;
}

const AccountUser: React.FunctionComponent<IPropsAccountUser> = ({ user }) => {
    console.log(user)
    return (
        <Space size={'large'} direction='vertical' style={{ margin: 20, padding: 15, backgroundColor: "#fff", height: "auto" }}>
            <Row gutter={16} align='middle' justify='center'>
                <Col span={24} >
                    <Avatar size={100} src={user.image} />
                </Col>
            </Row>
            <Row gutter={16} align='middle' justify='center'>
                <Col span={24} >
                    <Title level={3}>{user.nom + ' ' + user.prenom}</Title>
                </Col>
            </Row>
        </Space>
    );
};

export default AccountUser;

