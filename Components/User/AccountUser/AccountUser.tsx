import * as React from 'react';
import { useState } from 'react';
import { Button, Col, Modal, Row, Typography, Upload, message, Input, Divider, Space, Avatar, Tabs, Tooltip } from 'antd';
import { IUser } from '../../../interfaces/IUser';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import ListRessources from '../../Ressource/ListRessources/ListRessources';
import UpdateUser from '../UpdateUser/UpdateUser';

const { TabPane } = Tabs;
const { Title, Text } = Typography;
interface IPropsAccountUser {
    user: IUser;
}

const AccountUser: React.FunctionComponent<IPropsAccountUser> = ({ user }) => {
    console.log(user)
    return (
        <Space size={'large'} direction='vertical' style={{ margin: 20, padding: 15, backgroundColor: "#fff", height: "auto", display: 'flex', alignItems: 'center' }}>

            <Row gutter={16} align='middle' justify='center'>
                <div style={{ width: '700px', display: 'flex' }}>

                    <Col span={9} >

                    </Col>

                    <Col span={11} style={{ marginLeft: 25 }} >
                        <Avatar size={100} src={user.image} />
                    </Col>
                    <Col span={3} >
                        <UpdateUser user={user}/>
                    </Col>
                </div>
            </Row>

            <Row gutter={16} align='middle' justify='center'>
                <Col span={24} >
                    <Title level={3} style={{ margin: '0px 300px' }}>{user.nom + ' ' + user.prenom}</Title>
                </Col>
            </Row>
            <Row gutter={16} align='middle' justify='center'>
                <Space size={'large'} direction='horizontal' >
                    <Text type='secondary'> 0 abonnement</Text>
                    <Text type='secondary' >0 abonné</Text>
                </Space>

            </Row>
            <Tabs defaultActiveKey="1" centered style={{width:'700px'}}>
                <TabPane tab="Publications" key="1">
                    {/* <ListRessources ressources={user.ressources} /> */}
                    <ListRessources ressources={user.ressources} />
                </TabPane>
                <TabPane tab="Contacts" key="2">
                    In progress
                </TabPane>
                
            </Tabs>
            {/* <ListRessources ressources={user.ressources}/> */}

        </Space>
    );
};

export default AccountUser;

