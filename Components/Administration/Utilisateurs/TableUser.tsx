import * as React from 'react';
import { DeleteOutlined, EditOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Col, List, notification, Row, Space, Table, Tag, Typography } from 'antd';
import { IUser } from '../../../interfaces/IUser';
import { deleteUtilisateur } from '../../../services/utilisateur.service';
import { DrawerUser } from './DrawerUser';
import { useState } from 'react';

interface IPropsCardUser {
    users: IUser[];
}

const { Title } = Typography;



export const TableUser: React.FunctionComponent<IPropsCardUser> = ({ users }) => {
    const [idEditUser, setIdEditUser] = useState(null);
    console.log(idEditUser)

    const deleteUser = async (IdUser: string) => {
        await deleteUtilisateur(IdUser).then((res) => {
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
            title: 'Nom',
            dataIndex: 'nom',
            key: 'name',
        },
        {
            title: 'Prenom',
            dataIndex: 'prenom',
            key: 'prenom',
        },
        {
            title: 'Email',
            dataIndex: 'mail',
            key: 'mail',
        },
        {
            title: 'Avatar',
            dataIndex: 'image',
            key: 'image',
            render: val => (<Avatar shape='square' src={val} />),
        },
        {
            title: 'Compte_actif',
            dataIndex: 'compte_actif',
            key: 'compte_actif',
            render: val => (val ? <div className='left'><Tag color="green">Actif</Tag></div> : <div className='left'><Tag color="red">Non Actif</Tag></div>),
        },
        {
            title: 'Pseudo',
            dataIndex: 'pseudo',
            key: 'pseudo',
        },
        {
            title: 'Actions',
            key: 'action',
            render: (record) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => { setIdEditUser(record._id) }} />
                    <Button icon={<DeleteOutlined />} onClick={() => { deleteUser(record._id) }} />
                </Space>
            ),
        },
    ];
    const onCloseDrawer = () => {
        setIdEditUser(null);
        return false;
    }
    return (
        <div className='container'>
            {idEditUser ? <DrawerUser idUser={idEditUser} visible={idEditUser ? true : false} onClose={onCloseDrawer} /> : <></>}

            <Title level={3}> Gestion utilisateur :</Title>

            <Row>
                <Col xs={24} lg={24}>
                </Col>
                <Col xs={24} lg={24}>
                    <Table dataSource={users} columns={columns} />
                </Col>
            </Row>
        </div>

    );
};

