import * as React from 'react';
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Col, List, notification, Row, Space, Switch, Table, Tag, Typography } from 'antd';
import { IRessource } from '../../../interfaces/IRessource';
import { deleteUtilisateur, getUtilisateurById } from '../../../services/utilisateur.service';
import { useState } from 'react';
import Text from 'antd/lib/typography/Text';
import { deleteRessource, switchRessource } from '../../../services/ressource.service';
import { ContextApp } from '../../../Context/ContextAuth/ContextAuth';
import { useRouter } from 'next/router';
import moment from 'moment';

interface IPropsCardRessource {
    ressources: IRessource[];
}

const { Title } = Typography;



export const TableRessource: React.FunctionComponent<IPropsCardRessource> = ({ ressources }) => {
    const router = useRouter();
    const {tokenSession} = React.useContext(ContextApp)
    const [isLoading, setIsLoading] = useState(false);

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
    const switchRessources = async (commentaireId) => {
        setIsLoading(true);
        await switchRessource(commentaireId, tokenSession.token);
        setIsLoading(false);
        router.replace(router.asPath)
    };
    const columns = [
        {
            title: 'Auteur',
            dataIndex: 'utilisateur',
            key: 'utilisateur',
            render: val => <p>{val.pseudo}</p>
        },
        {
            title: 'Texte',
            dataIndex: 'texte',
            key: 'texte',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: val => (<Avatar shape='square' src={val} />),
        },
        {
            title: 'Date de creation',
            dataIndex: 'date_creation',
            key: 'date_creation',
            render :val => <p>{moment(new Date(val)).format("DD/MM/YYYY HH:mm:ss")}</p>,
        },
        {
            title: 'Validation',
            dataIndex: 'validation',
            key: 'validation',
            render: (val, record) => (<Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked={val}
                onChange={() => { switchRessources(record._id) }}
            />)
            // render: val => (val ? <div className='left'><Tag color="green">Actif</Tag></div> : <div className='left'><Tag color="red">Non Actif</Tag></div>),
        },
        {
            title: 'Actions',
            key: 'action',
            render: (record) => (
                <Space>
                    <Button icon={<DeleteOutlined />} onClick={() => { deleteRessourceById(record._id) }} />
                </Space>
            ),
        },
    ];

    return (
        <div className='container'>

            <Title level={3}> Gestion ressources :</Title>

            <Row>
                <Col xs={24} lg={24}>
                </Col>
                <Col xs={24} lg={24}>
                    <Table dataSource={ressources} columns={columns} />
                </Col>
            </Row>
        </div>

    );
};

