import * as React from 'react';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Col, List, notification, Row, Space, Table, Tag, Typography } from 'antd';
import { IRessource } from '../../../interfaces/IRessource';
import { deleteUtilisateur, getUtilisateurById } from '../../../services/utilisateur.service';
import { useState } from 'react';
import Text from 'antd/lib/typography/Text';

interface IPropsCardRessource {
    ressources: IRessource[];
}

const { Title } = Typography;



export const TableRessource: React.FunctionComponent<IPropsCardRessource> = ({ ressources }) => {
    const [idEditRessource, setIdEditRessource] = useState(null);
    const deleteRessource = async (IdRessource: string) => {
        await deleteUtilisateur(IdRessource).then((res) => {
            if (res.status == 200) {
                notification.success({
                    message: 'Utilisateur suprimmer',
                });
            } else {
                notification.error({
                    message: 'Une erreur est survenue',
                });
            }
        })

    }
    const columns = [
        {
            title: 'Auteur',
            dataIndex: 'owner',
            key: 'owner',
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
            title: 'date_creation',
            dataIndex: 'date_creation',
            key: 'date_creation',
        },
        {
            title: 'Actions',
            key: 'action',
            render: (record) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => { setIdEditRessource(record._id) }} />
                    <Button icon={<DeleteOutlined />} onClick={() => { deleteRessource(record._id) }} />
                </Space>
            ),
        },
    ];
    const onCloseDrawer = () => {
        setIdEditRessource(null);
        return false;
    }
    return (
        <div className='container'>
            {/* {idEditRessource ? <DrawerRessource idRessource={idEditRessource} visible={idEditRessource ? true : false} onClose={onCloseDrawer} /> : <></>} */}

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

