import * as React from 'react';
import { DeleteOutlined, EditOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Col, DatePicker, Drawer, Form, Input, List, notification, Row, Select, Space, Table, Tag, Typography } from 'antd';
import { IUser } from '../../../interfaces/IUser';
import { deleteUtilisateur, getUtilisateurById } from '../../../services/utilisateur.service';
import { useEffect, useState } from 'react';

interface IPropsDrawerUser {
    idUser: number;
    visible: boolean;
    onClose: (e) => void;
}

const { Option } = Select;

export const DrawerUser: React.FunctionComponent<IPropsDrawerUser> = ({ idUser, visible, onClose }) => {
    const [user, setUser] = useState<IUser>({} as IUser);

    const getUser = async (idUser: number) => {
        await getUtilisateurById(idUser).then((res) => {
            if (res.status == 200) {
                setUser(res.data);
            } else {
                notification.error({
                    message: 'Une erreur est survenue',
                });
            }
        })
    }
    useEffect(() => {
        getUser(idUser);
        console.log(user);
    }, [idUser]);

    return (
        <>
            <Drawer
                title={`Edition de ${user.pseudo} :`}
                placement="right" onClose={onClose}
                visible={visible}
                width={720}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Anuler</Button>
                        <Button onClick={onClose} type="primary">
                            Modifier
                        </Button>
                    </Space>
                }

            >
                <Form
                    layout="vertical"
                    hideRequiredMark
                    fields={[
                        {
                            name: ["prenom"],
                            value: user.prenom,
                        },
                        {
                            name: ["nom"],
                            value: user.nom,
                        },
                        {
                            name: ["pseudo"],
                            value: user.pseudo,
                        },
                        {
                            name: ["email"],
                            value: user.mail,
                        },
                    ]}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="nom"
                                label="Nom"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="prenom"
                                label="Prénom"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="pseudo"
                                label="Pseudo"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>

    );
};

