import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Button, Col, Image, Row, Typography, Upload, message, Input, Divider, Space, Avatar, Tabs, Tooltip, List, notification, Skeleton } from 'antd';
import { IUser } from '../../../interfaces/IUser';
import { DeleteOutlined, EditOutlined, UserDeleteOutlined, UserOutlined } from '@ant-design/icons';
import ListRessources from '../../Ressource/ListRessources/ListRessources';
import UpdateUser from '../UpdateUser/UpdateUser';
import { ContextApp } from '../../../Context/ContextAuth/ContextAuth';
import { deleteRessource } from '../../../services/ressource.service';
import { useRouter } from 'next/router';
import axios from 'axios';
import { followUser } from '../../../services/utilisateur.service';

const { TabPane } = Tabs;
const { Title, Text } = Typography;

interface IAccountProps {
    user: IUser
}

const AccountUser: React.FunctionComponent<IAccountProps> = ({ user }) => {
    const { tokenSession, userSession } = useContext(ContextApp);
    const [key, setKey] = useState('1');
    const [abonnement, setAbonnement] = useState([]);
    const [loadingAbonnement, setloadingAbonnement] = useState(false);
    const [abonee, setAbonee] = useState([]);
    const [loadingAbonee, setLoadingAbonee] = useState(false);
    const router = useRouter();

    const deleteRessourceById = async (IdRessource: string) => {
        await deleteRessource(IdRessource, tokenSession.token).then((res) => {
            if (res.status == 200) {
                notification.success({
                    message: 'Utilisateur suprimmer',
                })
                router.replace(router.asPath);
            } else {
                notification.error({
                    message: 'Une erreur est survenue',
                });
            }
        })
    }

    const getData = () => {
        setLoadingAbonee(true)
        setloadingAbonnement(true)
        if (userSession.utilisateur === user._id) {
            axios({
                method: 'get',
                url: 'http://localhost:3000/api/utilisateur/abonne',
                headers: {
                    'Authorization': 'Bearer ' + tokenSession.token
                }
            }).then((res) => {
                setAbonee(res.data);
                setLoadingAbonee(false)
            })

            axios({
                method: 'get',
                url: 'http://localhost:3000/api/utilisateur/abonnementnoe',
                headers: {
                    'Authorization': 'Bearer ' + tokenSession.token
                }
            }).then((res) => {
                setAbonnement(res.data)

                setloadingAbonnement(false)
            })
        } else {
            axios({
                method: 'get',
                url: `http://localhost:3000/api/utilisateur/abonne/${user._id}`,
                headers: {
                    'Authorization': 'Bearer ' + tokenSession.token
                }
            }).then((res) => {
                setAbonee(res.data);
                setLoadingAbonee(false)
            })

            axios({
                method: 'get',
                url: `http://localhost:3000/api/utilisateur/abonnement/${user._id}`,
                headers: {
                    'Authorization': 'Bearer ' + tokenSession.token
                }
            }).then((res) => {
                setAbonnement(res.data)
                setloadingAbonnement(false)
            })
        }
    }
    useEffect(() => {
        if (key === '2') {
            getData()
        }
    }, [key]);

    const handleUnFollow = async (userId) => {
        await followUser(userId, tokenSession.token).then(() => {
            getData()
        })
    }

    const arrayAbonne = abonee.map((item) => {
        return item.abonnement
    })

    const arrayAbonnement = abonnement.map((item) => {
        return item.utilisateur
    })

    const onChange = (key: string) => {
        setKey(key)
    };
    return (
        <Space size={'large'} direction='vertical' style={{ margin: 20, padding: 15, backgroundColor: "#fff", height: "auto", display: 'flex', alignItems: 'center' }}>

            <Row gutter={16} align='middle' justify='center'>
                <div style={{ width: '700px', display: 'flex' }}>

                    <Col span={9} >

                    </Col>

                    <Col span={10} style={{ marginLeft: 25 }} >
                        <Avatar size={100} src={user.image} />
                    </Col>
                    {userSession.utilisateur === user._id ?
                        <>
                            <Col span={2} >
                                <UpdateUser user={user} token={tokenSession.token} />
                            </Col>

                            <Col span={1} >
                                <Tooltip title="Supprimer votre compte">
                                    <Button type="dashed" shape="circle" icon={<DeleteOutlined />} />
                                </Tooltip>
                            </Col>
                        </> :
                        <Col span={3}></Col>}
                </div>
            </Row>

            <Row gutter={16} align='middle' justify='center'>
                <Col span={24} >
                    <Title level={3} style={{ margin: '0px 300px' }}>{user.nom + ' ' + user.prenom}</Title>
                </Col>
            </Row>
            <Row gutter={16} align='middle' justify='center'>
                <Col span={24} >
                    <Title level={4} type='secondary' style={{ margin: '0px 300px' }}>{user.pseudo}</Title>
                </Col>
            </Row>
            <Row gutter={16} align='middle' justify='center'>
                <Text type='secondary'>{user.description}</Text>
            </Row>
            <Row gutter={16} align='middle' justify='center'>
                <Space size={'large'} direction='horizontal' >
                    <Text type='secondary'>{user.nbdabonnement != 0 ? user.nbdabonnement + ' Abonnements' : '0 Abonnement'}</Text>
                    <Text type='secondary' >{user.nbdabonne != 0 ? user.nbdabonne + ' Abonnés' : '0 Abonné'}</Text>
                    <Text type='secondary' >{user.ressources ? user.ressources.length + ' Publications' : '0 Publication'}</Text>
                </Space>

            </Row>
            <Tabs defaultActiveKey={key} centered style={{ width: '700px' }} onChange={onChange}>
                <TabPane tab="Publications" key="1">
                    {/* <ListRessources ressources={user.ressources} currentUser={user} /> */}
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        dataSource={user.ressources}
                        renderItem={item => (
                            <List.Item
                                key={item.titre}
                                actions={[
                                    userSession.utilisateur === user._id ?<Button key={item._id} icon={<DeleteOutlined />} onClick={() => { deleteRessourceById(item._id) }} /> : <></>
                                ]}
                            >
                                <List.Item.Meta
                                    title={item.titre}
                                />
                                {item.texte}
                            </List.Item>
                        )}
                    />
                </TabPane>
                <TabPane tab="Contacts" key="2">
                    <Row gutter={16} justify='center' >
                        <Col span={12}>
                            <Title level={4}>Abonnés :</Title>
                            <Divider />
                            <List
                                className="demo-loadmore-list"
                                loading={loadingAbonee}
                                itemLayout="horizontal"
                                dataSource={arrayAbonne}
                                renderItem={item => (
                                    <List.Item
                                    >
                                        <Skeleton avatar title={false} loading={loadingAbonee} active>
                                            <a href={`/utilisateur/${item._id}`}>
                                                <List.Item.Meta
                                                    avatar={<Avatar src={item.image} />}
                                                    title={item.pseudo}
                                                    key={item._id}
                                                />
                                            </a>
                                        </Skeleton>
                                    </List.Item>
                                )}
                            />
                        </Col>
                        <Col span={12}>
                            <Title level={4}>Abonnement : </Title>
                            <Divider />

                            <List
                                className="demo-loadmore-list"
                                loading={loadingAbonnement}
                                itemLayout="horizontal"
                                dataSource={arrayAbonnement}
                                renderItem={item => (
                                    <List.Item
                                    >
                                        <Skeleton avatar title={false} loading={loadingAbonnement} active>
                                            <a href={`/utilisateur/${item._id}`}>
                                                <List.Item.Meta
                                                    avatar={<Avatar src={item.image} />}
                                                    title={item.pseudo}
                                                    key={item._id}
                                                />
                                            </a>
                                            {userSession.utilisateur === user._id ?
                                                <Button type="default" danger icon={<UserDeleteOutlined />} size='small' onClick={() => handleUnFollow(item._id)} />
                                                : <></>
                                            }
                                        </Skeleton>
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                </TabPane>

            </Tabs>

        </Space>
    );
};

export default AccountUser;