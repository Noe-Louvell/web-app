import * as React from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Col, DatePicker, Drawer, Form, Input, message, notification, Row, Select, Skeleton, Space, Switch, Table, Tag, Typography, Upload } from 'antd';
import { IUser } from '../../../interfaces/IUser';
import { deleteUtilisateur, getUtilisateurById, updateUtilisateur } from '../../../services/utilisateur.service';
import { useEffect, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { Convert } from 'mongo-image-converter';
import { useRouter } from 'next/router'
interface IPropsDrawerUser {
    idUser: number;
    visible: boolean;
    onClose: (e) => void;
}

const { Option } = Select;

export const DrawerUser: React.FunctionComponent<IPropsDrawerUser> = ({ idUser, visible, onClose }) => {
    const router = useRouter();
    const { Option } = Select;
    const [form] = Form.useForm();
    const [user, setUser] = useState<IUser>({} as IUser);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [file, setFile] = useState<string | ArrayBuffer>();

    const getFile = async (e) => {
        const convertedImage = await Convert(e.file.originFileObj);
        setFile(convertedImage);
        return;
    };



    const getUser = async (idUser: number) => {
        setIsLoading(true);
        await getUtilisateurById(idUser).then((res) => {
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
    useEffect(() => {
        getUser(idUser);
        console.log(user);
    }, [idUser]);


    const onFinish = () => {
        setIsLoading(true);
        form.submit();
        console.log("value");
    };


    const onSubmit = async (value) => {
        const upUtilisateur: IUser = {
            nom: value.nom,
            prenom: value.prenom,
            image: file.toString(),
            mail: value.mail,
            compte_actif: value.actif,
            pseudo: value.pseudo,
        }
        await updateUtilisateur(user._id, upUtilisateur);
        setIsLoading(false);
        router.reload();
    };
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        return isJpgOrPng;
    }

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
                                    name: ["mail"],
                                    value: user.mail,
                                },
                                {
                                    name: ["actif"],
                                    value: user.compte_actif,
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
                                        name="mail"
                                        label="E-mail"
                                        rules={[{ required: true, message: 'Veuillez entrez un e-mail' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="actif"
                                        label="Compte actif"
                                        rules={[{ required: true, message: "Veuillez entrez l'activité" }]}
                                    >
                                        <Switch checkedChildren="Actif" unCheckedChildren="Non actif" />
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
                                        >
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="tom">Tom</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item
                                        name="avatar"
                                        label="Avatar"
                                        rules={[{ required: true, message: 'Veuillez entrez un avatar' }]}
                                    >
                                        <ImgCrop rotate>
                                            <Upload
                                                name="avatar"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                beforeUpload={beforeUpload}
                                                onChange={getFile}
                                            >
                                                {file ? <Avatar shape='square' size={100} src={file} /> : user.image ? <Avatar shape='square' size={100} src={user.image} /> : <PlusOutlined />}
                                            </Upload>
                                        </ImgCrop>

                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                }

            </Drawer>
        </>

    );
};

