import * as React from 'react';
import { FunctionComponent, useEffect } from 'react';
import { Layout, List, Row, Col, Typography, Avatar, Divider, Skeleton } from 'antd';
import axios from 'axios';
import { ContextApp } from '../../../Context/ContextAuth/ContextAuth';
const { Title, Text } = Typography;
const { Sider } = Layout;

export const ContactSider: FunctionComponent = () => {
    const { tokenSession } = React.useContext(ContextApp);
    const [abonnement, setAbonnement] = React.useState([]);
    const [loadingAbonnement, setloadingAbonnement] = React.useState(false);
    const [abonee, setAbonee] = React.useState([]);
    const [loadingAbonee, setLoadingAbonee] = React.useState(false);

    const getData = () => {
        setLoadingAbonee(true)
        setloadingAbonnement(true)
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
    }
    useEffect(() => {
        getData()
    }, []);

    const arrayAbonne = abonee.map((item) => {
        return item.abonnement
    })

    const arrayAbonnement = abonnement.map((item) => {
        return item.utilisateur
    })
    return (
        <>
            <Row gutter={16} justify='center' >
                <Col span={24}>
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
                <Col span={24}>
                    <Divider />
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
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </>

    );
};
