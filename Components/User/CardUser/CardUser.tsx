import { CloseCircleOutlined, EyeInvisibleOutlined, MessageOutlined, MoreOutlined, SoundOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Dropdown, Menu, Space, Switch, Typography } from 'antd';
import { Meta } from 'antd/lib/list/Item';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { IUser } from '../../../interfaces/IUser';


interface IPropsCardUser {
    user: IUser;
}

const { Paragraph, Title, Text } = Typography;


const CardUserIndex: React.FunctionComponent<IPropsCardUser> = ({ user }) => {
    const [isAmi, setIsAmi] = useState(false);
    const [keySelect, setKeyselect] = useState<string | null>(null);
    const handleMenuClick = ({ key }) => {
        setKeyselect(key);
    };
    console.log(user)
    useEffect(() => {
        switch (keySelect) {
            case 'add': {
                console.log('ajout');
                //statements; 
                break;
            }
            case 'delete': {
                console.log('suppression');
                //statements; 
                break;
            }
            case 'message': {
                console.log('message');
                //statements; 
                break;
            }
            case 'hide': {
                console.log('masquer');
                //statements; 
                break;
            }
            case 'report': {
                console.log('signaler');
                //statements; 
                break;
            }
            case 'block': {
                console.log('bloquer');
                //statements; 
                break;
            }
            default: {
                break;
            }
        }
    }, [keySelect]);



    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key={!isAmi ? 'add' : 'delete'}>
                <Space>
                    {!isAmi && (
                        <>
                            <UserAddOutlined />
                            <Text > Ajouter {user.nom} {user.prenom} à vos amis </Text>
                        </>
                    )}
                    {isAmi && (
                        <>
                            <UserDeleteOutlined />
                            <Text > Supprimer {user.nom} {user.prenom} de vos amis </Text>
                        </>
                    )}
                </Space>
            </Menu.Item>
            <Menu.Item key='message'>
                <Space>
                    <MessageOutlined />
                    <Text > Envoyer un message à {user.nom} {user.prenom} </Text>
                </Space>
            </Menu.Item>
            <Menu.Item key='hide'>
                <Space>
                    <EyeInvisibleOutlined />
                    <Text > Masquer {user.nom} {user.prenom} </Text>
                </Space>
            </Menu.Item>
            <Menu.Item key='report'>
                <Space>
                    <SoundOutlined />
                    <Text > Signaler {user.nom} {user.prenom} </Text>
                </Space>
            </Menu.Item>
            <Menu.Item key='block'>
                <Space>
                    <CloseCircleOutlined />
                    <Text > Bloquer {user.nom} {user.prenom} </Text>
                </Space>
            </Menu.Item>
        </Menu>
    );



    return (
        <div className='center'>
            <div className='center'>
                <Space direction='vertical' align='end'>
                    <Dropdown overlay={menu} placement='bottomRight'>
                        <Button type="text" icon={<MoreOutlined />}></Button>
                    </Dropdown>
                    <Space direction='vertical' align='center' size='large' >

                        <Avatar
                            size={{ xs: 45, lg: 45, xl: 45, xxl: 45 }}
                            src={user.image}
                        />
                        <Title level={5}>{user.nom} {user.prenom}</Title>
                        <Space size='large'>
                            <Space direction='vertical' align='center' size={0}>
                                <Text type="secondary">Publication </Text>
                                <Text strong >{user.ressources.length}</Text>
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

