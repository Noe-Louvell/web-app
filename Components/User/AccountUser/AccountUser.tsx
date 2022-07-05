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
    const { userSession } = useContext(ContextApp);
    const [key, setKey] = useState('1');
    const [abonnement, setAbonnement] = useState([]);
    const [loadingAbonnement, setloadingAbonnement] = useState(false);
    const [abonee, setAbonee] = useState([]);
    const [loadingAbonee, setLoadingAbonee] = useState(false);
    // const user = userSession.user;
    const router = useRouter();
    const deleteRessourceById = async (IdRessource: string) => {
        await deleteRessource(IdRessource, userSession.token).then((res) => {
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

    const getData = () =>{
        setLoadingAbonee(true)
        setloadingAbonnement(true)
        axios({
            method: 'get',
            url: 'http://localhost:3000/api/utilisateur/abonnenoe',
            headers: {
                'Authorization': 'Bearer ' + userSession.token
            }
        }).then((res) => {
            setAbonee(res.data);
            setLoadingAbonee(false)
        })

        axios({
            method: 'get',
            url: 'http://localhost:3000/api/utilisateur/abonnementnoe',
            headers: {
                'Authorization': 'Bearer ' + userSession.token
            }
        }).then((res) => {
            setAbonnement(res.data)

            setloadingAbonnement(false)
        })
    }
    useEffect(() => {
        if (key === '2') {
            getData()
        }
    }, [key]);

        const handleUnFollow = async (userId) =>{
            await followUser(userId, userSession.token).then(()=>{
                getData()
            })
        }

    console.log(abonee)
    const onChange = (key: string) => {
        console.log(key);
        setKey(key)
    };
    return (
        <Space size={'large'} direction='vertical' style={{ margin: 20, padding: 15, backgroundColor: "#fff", height: "auto", display: 'flex', alignItems: 'center' }}>

            <Row gutter={16} align='middle' justify='center'>
                <div style={{ width: '700px', display: 'flex' }}>

                    <Col span={9} >

                    </Col>

                    <Col span={11} style={{ marginLeft: 25 }} >
                        <Avatar size={100} src={user.image} />
                    </Col>
                    <Col span={2} >
                        <UpdateUser user={user} token={userSession.token} />
                    </Col>

                    <Col span={1} >
                        <Tooltip title="Supprimer votre compte">
                            <Button type="dashed" shape="circle" icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Col>
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
                    <Text type='secondary'>{user.nbdabonnement + ' Abonnements'}</Text>
                    <Text type='secondary' >{user.nbdabonne + ' Abonnés'}</Text>
                    <Text type='secondary' >{user.ressources.length + ' Publications'}</Text>
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
                                    <Button key={item._id} icon={<DeleteOutlined />} onClick={() => { deleteRessourceById(item._id) }} />
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
                    <Row gutter={16} align='middle' justify='center' >
                        <Col span={12}>
                            <Title level={4}>Abonnés :</Title>
                            <Divider/>
                            <List
                                className="demo-loadmore-list"
                                loading={loadingAbonee}
                                itemLayout="horizontal"
                                dataSource={abonee}
                                renderItem={item => (
                                    <List.Item
                                    >
                                        <Skeleton avatar title={false} loading={loadingAbonee} active>
                                            <List.Item.Meta
                                                avatar={<Avatar src={item.image} />}
                                                title={item.pseudo}
                                                key={item._id}
                                            />
                                        </Skeleton>
                                    </List.Item>
                                )}
                            />
                        </Col>
                        <Col span={12}>
                            <Title level={4}>Abonnement : </Title>
                            <Divider/>

                            <List
                                className="demo-loadmore-list"
                                loading={loadingAbonnement}
                                itemLayout="horizontal"
                                dataSource={abonnement}
                                renderItem={item => (
                                    <List.Item
                                    >
                                        <Skeleton avatar title={false} loading={loadingAbonnement} active>
                                            <List.Item.Meta
                                                avatar={<Avatar src={item.image} />}
                                                title={item.pseudo}
                                            />
                                            <Button type="default" danger icon={<UserDeleteOutlined />} size='small' onClick={() =>handleUnFollow(item._id)}/>
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