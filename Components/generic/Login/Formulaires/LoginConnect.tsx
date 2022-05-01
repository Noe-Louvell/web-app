import * as React from 'react';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connexion, getUtilisateurById } from '../../../../services/utilisateur.service';
import jwt_decode from "jwt-decode";
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router'
interface IValueConnect {
    mail: string,
    mot_de_passe: string
}
const LoginConnect: React.FunctionComponent = () => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    const router = useRouter();

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = async (values: IValueConnect) => {
        await connexion(values).then(async (res) => {
            if (res.status == 200) {
                const decoded = jwt_decode(res.data.token);
                sessionStorage.setItem('token', res.data.token);
                const resUser = await getUtilisateurById(decoded.utilisateur._id);
                sessionStorage.setItem('user', JSON.stringify(resUser.data));

                router.push('/')
            } else {
                notification.error({
                    message: 'Une erreur est survenue lors de la co',
                });
            }
        })
    };


    return (
        <div>
            <Form
                form={form}
                onFinish={onFinish}
                layout='vertical'>

                <Row gutter={16} align="middle">
                    <Col span={24}>
                        <Form.Item
                            name="mail"
                            rules={[{ required: true, message: 'Veuillez entrer votre adresse e-mail !' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Adresse e-mail" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="mot_de_passe"
                            rules={[{ required: true, message: 'Veuillez entrer votre mot de passe !' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Mot de passe"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item shouldUpdate>
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
                                    Se connecter
                                </Button>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>

    );
};

export default LoginConnect;
