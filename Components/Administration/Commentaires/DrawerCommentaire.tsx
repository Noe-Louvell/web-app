import * as React from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Col, DatePicker, Drawer, Form, Input, message, notification, Row, Select, Skeleton, Space, Switch, Table, Tag, Typography, Upload } from 'antd';
import { IUser } from '../../../interfaces/IUser';
import { deleteUtilisateur, getUtilisateurById, updateUtilisateur } from '../../../services/utilisateur.service';
import { useEffect, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { Convert } from 'mongo-image-converter';
import { useRouter } from 'next/router';
import { ICommentaire } from '../../../interfaces/ICommentaire';
import { getCommentById, getCommentByIdRessource, updateComment } from '../../../services/commentaire.service';

interface IPropsDrawerUser {
    idCommentaire: number;
    visible: boolean;
    onClose: (e) => void;
}

const { Option } = Select;

export const DrawerCommentaire: React.FunctionComponent<IPropsDrawerUser> = ({ idCommentaire, visible, onClose }) => {
    const router = useRouter();

    const [form] = Form.useForm();
    const [commentaire, setCommentaire] = useState<ICommentaire>({} as ICommentaire);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [file, setFile] = useState<string | ArrayBuffer>();

    const getFile = async (e) => {
        const convertedImage = await Convert(e.file.originFileObj);
        setFile(convertedImage);
        return;
    };



    const getCommentaire = async (idCommentaire: number) => {
        setIsLoading(true);
        await getCommentById(idCommentaire).then((res) => {
            if (res.status == 200) {
                setCommentaire(res.data);
            } else {
                notification.error({
                    message: 'Une erreur est survenue lors de la récupération du commentaire',
                });
            }
            setIsLoading(false);
        })
    }
    useEffect(() => {
        getCommentaire(idCommentaire);
    }, [idCommentaire]);


    const onFinish = () => {
        setIsLoading(true);
        form.submit();
    };


    const onSubmit = async (value) => {
        const upCommentaire: ICommentaire = commentaire;
        upCommentaire.description = value.description;
        upCommentaire.validation = value.validation;
        await updateComment(commentaire.id, upCommentaire);
        setIsLoading(false);
        router.reload();
    };

    return (
        <>
            <Drawer
                title={`Edition du commentaire :`}
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
                                    name: ["description"],
                                    value: commentaire.description,
                                },
                                {
                                    name: ["validation"],
                                    value: commentaire.validation,
                                }
                            ]}
                        >
                            <Row gutter={16}>
                                <Col span={19}>
                                    <Form.Item
                                        name="description"
                                        label="Contenue"
                                        rules={[{ required: true, message: 'Veuillez entrez un commentaire' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="valide"
                                        label="Commentaire valide"
                                        rules={[{ required: true, message: 'Veuillez entrez une validation' }]}
                                    >
                                        <Switch checkedChildren="Valide" unCheckedChildren="Non valide" />
                                    </Form.Item>
                                </Col>
                                </Row>
                        </Form>
                }
            </Drawer>
        </>
    );
};

