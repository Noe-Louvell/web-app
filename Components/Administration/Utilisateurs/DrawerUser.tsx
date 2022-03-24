import * as React from 'react';
import { DeleteOutlined, EditOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Col, DatePicker, Drawer, Form, Input, message, notification, Row, Select, Skeleton, Space, Switch, Table, Tag, Typography, Upload } from 'antd';
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
    const [form] = Form.useForm();
    const [user, setUser] = useState<IUser>({} as IUser);
    const [newUser, setNewUser] = useState<IUser>({} as IUser);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
        form.submit();
        console.log("value");
    };

    const onSubmit = (value: IUser) => {
        console.log(value);
    };

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    // handleChange = info => {
    //     if (info.file.status === 'uploading') {
    //         this.setState({ loading: true });
    //         return;
    //     }
    //     if (info.file.status === 'done') {
    //         // Get this url from response in real world.
    //         getBase64(info.file.originFileObj, imageUrl =>
    //             this.setState({
    //                 imageUrl,
    //                 loading: false,
    //             }),
    //         );
    //     }
    // };

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
                        <Button onClick={() => onFinish} type="primary">
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
                                {
                                    name: ["compte_actif"],
                                    value: user.compte_actif,
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
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="compte_actif"
                                        label="Compte actif"
                                        rules={[{ required: true, message: 'Please enter user name' }]}
                                    >
                                        <Switch checkedChildren="Actif" unCheckedChildren="Non actif" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="avatar"
                                        label="Avatar"
                                        rules={[{ required: true, message: 'Please enter user name' }]}
                                    >
                                        {/* <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            beforeUpload={beforeUpload}
                                            onChange={this.handleChange}
                                        >
                                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                        </Upload> */}
                                        <Upload/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                }

            </Drawer>
        </>

    );
};

