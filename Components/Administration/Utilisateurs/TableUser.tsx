import * as React from 'react';
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Col, List, notification, Row, Space, Switch, Table, Tag, Typography } from 'antd';
import { IUser } from '../../../interfaces/IUser';
import { deleteUtilisateur, switchUser } from '../../../services/utilisateur.service';
import { DrawerUser } from './DrawerUser';
import { useState } from 'react';
import { ContextApp } from '../../../Context/ContextAuth/ContextAuth';
import router, { useRouter } from 'next/router';

interface IPropsCardUser {
    users: IUser[];
}

const { Title } = Typography;



export const TableUser: React.FunctionComponent<IPropsCardUser> = ({ users }) => {
    const router = useRouter();
    const [idEditUser, setIdEditUser] = useState(null);
    const {tokenSession} = React.useContext(ContextApp)
    const deleteUser = async (IdUser: string) => {
        await deleteUtilisateur(IdUser, tokenSession.token).then((res) => {
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
        router.replace(router.asPath);
    }

    const switchUtilisateurs = async (utilisateurId) => {
        await switchUser(utilisateurId, tokenSession.token);
        router.replace(router.asPath)
    };
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
            title: 'Pseudo',
            dataIndex: 'pseudo',
            key: 'pseudo',
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
            render: (val, record) => (<Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked={val}
                onChange={() => { switchUtilisateurs(record._id) }}
            />)
            
            // render: val => (val ? <div className='left'><Tag color="green">Actif</Tag></div> : <div className='left'><Tag color="red">Non Actif</Tag></div>),
        },
        {
            title: 'Rôle',
            dataIndex: 'role',
            key: 'role',
            render: val => (<p>{val.trigramme}</p>),

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
    console.log(users)
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

