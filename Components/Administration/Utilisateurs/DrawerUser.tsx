import * as React from 'react';
import { DeleteOutlined, EditOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Col, Drawer, List, notification, Row, Space, Table, Tag, Typography } from 'antd';
import { IUser } from '../../../interfaces/IUser';
import { deleteUtilisateur, getUtilisateurById } from '../../../services/utilisateur.service';
import { useEffect, useState } from 'react';

interface IPropsDrawerUser {
    idUser: number;
    visible: boolean;
    onClose: (e) => void;
}

export const DrawerUser: React.FunctionComponent<IPropsDrawerUser> = ({ idUser, visible, onClose }) => {
    const [user, setUser] = useState<IUser>(null);

    const getUser = async (idUser: number) => {
        await getUtilisateurById(idUser).then((res) => {
            if (res.status == 200) {
                setUser(res.data);
                console.log(user)
            } else {
                notification.error({
                    message: 'Une erreur est survenue',
                });
            }
        })
    }
    useEffect(() => {
        getUser(idUser);
    },[idUser]);

    return (
        <>
            <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
                <p>a</p>
            </Drawer>
        </>

    );
};

