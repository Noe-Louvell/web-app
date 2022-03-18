import * as React from 'react';
import { FunctionComponent } from 'react';
import { Button, Layout, List, Row, Col, Typography, Avatar, Badge, Dropdown, Menu, Space, Image, Card } from 'antd';
import {
    SearchOutlined, UserOutlined,
} from '@ant-design/icons';
import { SiderRessourcesListe } from '../../../Ressource/SiderInfoRessources/SiderRessourcesListe';
const { Title, Text } = Typography;
const { Sider } = Layout;

export const SiderRight: FunctionComponent = () => {


    return (
        <Sider className='siderRight'>
            <Space direction='vertical' style={{ width: '100%'}}>
                <Card title='Actualité régional'>
                    <SiderRessourcesListe />
                </Card>
                <Card title='Actualité national'>
                    <SiderRessourcesListe />
                </Card>
                <Card title='Contacts'>
                    <SiderRessourcesListe />
                </Card>
            </Space>

        </Sider>

    );
};
