import * as React from 'react';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Col, Row, Typography, Progress, Spin, Upload } from 'antd';
import { IUser } from '../../../../interfaces/IUser';
import { createUtilisateur } from '../../../../services/utilisateur.service';
import { UploadOutlined } from '@ant-design/icons';
import { Convert } from 'mongo-image-converter';
import router from 'next/router';
import axios from 'axios';
const { Text } = Typography;

interface IValueForm {
    nom: string,
    prenom: string,
    pseudo: string,
    email: string,
    password: string
}

const LoginCreate: React.FunctionComponent = () => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    const [regexRes, setRegexRes] = useState('');
    const [file, setFile] = useState<ArrayBuffer>();
    const [isLoading, setIsLoading] = useState<boolean>();
    useEffect(() => {
        forceUpdate({});
    }, []);

    const mediumRegexPassword = '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})';
    const strongRegexPassword = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})';

    const getFile = async (e) => {
        const convertedImage = await Convert(e.file.originFileObj);
        setFile(e.file);
        
        return;
    };

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            console.error('You can only upload JPG/PNG file!');
        }
        return isJpgOrPng;
    }
    const analysePassword = (password) => {
        if (new RegExp(mediumRegexPassword).test(password) === true) {

            if (new RegExp(strongRegexPassword).test(password) === true) {
                setRegexRes('strong');
                return 'strong';
            } else {
                setRegexRes('medium');
                return 'medium';
            }
        } else {
            setRegexRes('false');
            return 'false';
        }
    };

    const onFinish = async (values: IValueForm) => {
        setIsLoading(true);
        await axios({
            method: 'post',
            url: 'http://localhost:3000/api/inscription',
            data: {
                nom: values.nom,
                prenom: values.prenom,
                pseudo: values.pseudo,
                image: file,
                mail: values.email,
                mot_de_passe: values.password
            }
        })
        form.resetFields();
        setRegexRes('');
        setIsLoading(false);
    };

    return (
        isLoading ? <Spin className='center' /> :
            <>
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout='vertical'
                >
                    <Row gutter={16} align="middle">
                        <Col span={12}>
                            <Form.Item
                                label="Nom"
                                name="nom"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez entrer votre nom !'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Prénom"
                                name="prenom"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez entrer votre prénom !'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Pseudo"
                                name="pseudo"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez entrer votre pseudo !'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Image"
                                name='image'
                                getValueFromEvent={getFile}
                            >
                                <Upload
                                    listType="picture"
                                    maxCount={1}
                                    multiple={false}
                                    className="upload-list-inline"
                                    beforeUpload={beforeUpload}
                                >
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} align="middle">
                        <Col span={24}>
                            <Form.Item
                                label="Adresse e-mail"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez entrer votre adresse mail !'
                                    },
                                    {
                                        type: 'email',
                                        message: 'Veuillez entrer une adresse mail valide !'
                                    }
                                ]}
                            >
                                <Input type={"email"} />
                            </Form.Item>
                        </Col>
                    </Row>



                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} align="middle">
                        <Col span={24}>
                            <Form.Item
                                className='formItemPassword'
                                name="password"
                                label="Mot de passe"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez entrer votre mot de passe !'
                                    },
                                    {
                                        validator(_, value) {
                                            if (analysePassword(value) === 'medium') {
                                                setRegexRes('medium')
                                                return Promise.resolve();

                                            }
                                            if (analysePassword(value) === 'strong') {
                                                setRegexRes('strong')
                                                return Promise.resolve();
                                            }
                                            if (value === '') {
                                                setRegexRes('')
                                                return Promise.reject();
                                            }
                                            setRegexRes('false')
                                            return Promise.reject();
                                        },
                                    }
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            {regexRes === 'medium' ?
                                <Progress
                                    className='progressMedium'
                                    percent={50}
                                    size="small"
                                    strokeColor='orange'
                                    format={() => <Text type="warning">Mot de passe moyen</Text>}
                                />
                                : regexRes === 'strong' ?
                                    <Progress
                                        className='progressStrong'
                                        percent={100}
                                        size="small"
                                        format={() => <Text type="success">Mot de passe fort</Text>}
                                    />
                                    : regexRes === 'false' ? <Progress
                                        className='progressFalse'
                                        percent={25}
                                        size="small"
                                        strokeColor='red'
                                        format={() => <Text type="danger">Mot de passe trop faible</Text>}
                                    /> : <div className='defaultMarginPassword'></div>}
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} align="middle">
                        <Col span={24}>
                            <Form.Item
                                name="confirm"
                                label="Confirmer le mot de passe"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez confirmer votre mot de passe !',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Les deux mots de passe que vous avez entrés ne correspondent pas !'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        shouldUpdate
                    >
                        {() => (
                            <Button
                                style={{ width: '100%' }}
                                type="primary"
                                htmlType="submit"
                                disabled={
                                    !form.isFieldsTouched(true) ||
                                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                }
                            >
                                S&apos;inscrire
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </>
    );
};

export default LoginCreate;

