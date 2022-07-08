import * as React from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Col, DatePicker, Drawer, Form, Input, message, notification, Row, Select, Skeleton, Space, Switch, Table, Tag, Typography, Upload } from 'antd';
import { IUser } from '../../../interfaces/IUser';
import { deleteUtilisateur, getUtilisateurById, updateUtilisateur } from '../../../services/utilisateur.service';
import { useEffect, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { Convert } from 'mongo-image-converter';
import { useRouter } from 'next/router'
import { ContextApp } from '../../../Context/ContextAuth/ContextAuth';
import axios from 'axios';
interface IPropsDrawerUser {
    idUser: string;
    visible: boolean;
    onClose: (e) => void;
}

const { Option } = Select;

export const DrawerUser: React.FunctionComponent<IPropsDrawerUser> = ({ idUser, visible, onClose }) => {
    const { tokenSession } = React.useContext(ContextApp)
    const router = useRouter();
    const { Option } = Select;
    const [form] = Form.useForm();
    const [user, setUser] = useState<IUser>({} as IUser);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [file, setFile] = useState<string | ArrayBuffer>();
    const [roles, setRoles] = useState<[]>([]);
    const { TextArea } = Input;




    const getUser = async (idUser: string) => {
        setIsLoading(true);
        await getUtilisateurById(idUser, tokenSession.token).then((res) => {
            if (res.status == 200) {
                setUser(res.data);
            } else {
                notification.error({
                    message: 'Une erreur est survenue',
                });
            }
            setIsLoading(false);
        })
    }
    const getAllRoles = async () => {
        setIsLoading(true);
        await axios({
            url: `http://localhost:3000/api/role`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${tokenSession.token}`,
            },
        }).then(async (res) => {
            await setRoles(res.data)
        })
        setIsLoading(false);
    }
    useEffect(() => {
        getUser(idUser);
        getAllRoles()
    }, [idUser]);


    const onFinish = () => {
        setIsLoading(true);
        form.submit();
    };


    const onSubmit = async (value) => {
        await axios({
            url: `http://localhost:3000/api/utilisateur/${idUser}`,
            method: "PATCH",
            data: {
                nom: value.nom,
                prenom: value.prenom,
                description: value.description,
                image: file,
                pseudo: value.pseudo,
                role: value.role
            },
            headers: {
                Authorization: `Bearer ${tokenSession.token}`,
            },
        }).then(() => {
            onClose;
            router.replace(router.asPath);
        })
    };

    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setFile(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const getFile = (e) => {
        getBase64(e.file.originFileObj);
        return;
    };

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            console.error('You can only upload JPG/PNG file!');
        }
        return isJpgOrPng;
    }
    console.log(roles)
    return (
        <>
            <Drawer
                title={`Edition de ${user.nom} :`}
                placement="right" onClose={onClose}
                visible={visible}
                width={720}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Anuler</Button>
                        <Button onClick={onFinish} type="primary">
                            Modifier
                        </Button>
                    </Space>
                }

            >
                {
                    isLoading ?
                        <>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Skeleton.Input active={isLoading} size={'large'} />
                                </Col>
                                <Col span={12}>
                                    <Skeleton.Input active={isLoading} size={'large'} />
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Skeleton.Input active={isLoading} size={'large'} />
                                </Col>
                                <Col span={12}>
                                    <Skeleton.Input active={isLoading} size={'large'} />
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Skeleton.Input active={isLoading} size={'large'} />
                                </Col>
                                <Col span={12}>
                                    <Skeleton.Input active={isLoading} size={'large'} />
                                </Col>
                            </Row>
                        </>
                        :
                        <Form
                            layout="vertical"
                            hideRequiredMark
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            onFinish={onSubmit}
                            form={form}
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
                                    name: ["description"],
                                    value: user.description,
                                },
                            ]}
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="nom"
                                        label="Nom"
                                        rules={[{ required: true, message: 'Veuillez entrez un nom' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="prenom"
                                        label="Prénom"
                                        rules={[{ required: true, message: 'Veuillez entrez un prenom' }]}
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
                                        rules={[{ required: true, message: 'Veuillez entrez un pseudo' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="role"
                                        label="Rôle"
                                        rules={[{ required: true, message: "Veuillez entrez un rôle" }]}
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Selectionnez un rôle"
                                            defaultValue={user.role ? user.role : null}
                                        >
                                            {roles ? roles.map((option: any) => (
                                                <Option
                                                    key={option._id}
                                                    value={option._id}
                                                >
                                                    {option.nom}
                                                </Option>
                                            )) : <></>}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16} align='middle' justify='center'>
                                <Col span={24}>
                                    <Form.Item
                                        name="description"
                                        label="Description"
                                        rules={[{ required: true, message: 'Veuillez entrez une description' }]}
                                    >
                                        <TextArea />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                }

            </Drawer>
        </>

    );
};

