import { CloseCircleOutlined, EyeInvisibleOutlined, MessageOutlined, MoreOutlined, SoundOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Dropdown, Menu, Space, Switch, Typography } from 'antd';
import { Meta } from 'antd/lib/list/Item';
import router from 'next/router';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { ContextApp } from '../../../Context/ContextAuth/ContextAuth';
import { IUser } from '../../../interfaces/IUser';
import { followUser } from '../../../services/utilisateur.service';


interface IPropsCardUser {
    user: IUser;
}

const { Paragraph, Title, Text } = Typography;


const CardUserIndex: React.FunctionComponent<IPropsCardUser> = ({ user }) => {
    const { tokenSession, userSession } = React.useContext(ContextApp);

    const menu = (
        <Menu
        >
            <Menu.Item key='profile' onClick={() => router.push(`/utilisateur/${user._id}`)}>
                <Space>
                    <MessageOutlined />
                    <Text >Voir le profil de {user.pseudo} </Text>
                </Space>
            </Menu.Item>
            <Menu.Item key='follow' onClick={() => followUser(user._id, tokenSession.token)}>
                <Space>
                    <MessageOutlined />
                    <Text >S&apos;abonner à {user.pseudo} </Text>
                </Space>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className='center'>
            <div className='center'>
                <Space direction='vertical' align='end'>
                    {userSession.utilisateur === user._id ? <></> :
                        <Dropdown overlay={menu} placement='bottomRight'>
                            <Button type="text" icon={<MoreOutlined />}></Button>
                        </Dropdown>
                    }
                    <Space direction='vertical' align='center' size='large' >

                        <Avatar
                            size={{ xs: 45, lg: 45, xl: 45, xxl: 45 }}
                            src={user.image ? user.image : null}
                        />
                        <Title level={5}>{user.nom} {user.prenom}</Title>
                        <Space size='large'>
                            <Space direction='vertical' align='center' size={0}>
                                <Text type="secondary">Publication </Text>
                                <Text strong >{user.ressources ? user.ressources.length : 0}</Text>
                            </Space>
                            <Space direction='vertical' align='center' size={0}>
                                <Text type="secondary">Abonné </Text>
                                <Text strong >{user.nbdabonne}</Text>
                            </Space>
                            <Space direction='vertical' align='center' size={0}>
                                <Text type="secondary">Abonnement </Text>
                                <Text strong >{user.nbdabonnement}</Text>
                            </Space>

                        </Space>
                        <Paragraph
                            italic
                            style={{ textAlign: 'center' }}
                            type="secondary"
                        >
                            {user.pseudo}
                        </Paragraph>
                    </Space>
                </Space>
            </div>
        </div>
    );
};

export default CardUserIndex;

