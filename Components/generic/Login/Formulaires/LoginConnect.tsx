import * as React from 'react';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginConnect: React.FunctionComponent = () => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = (values: any) => {
        console.log('Finish:', values);
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
                            name="username"
                            rules={[{ required: true, message: 'Veuillez entrer votre adresse e-mail !' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Adresse e-mail" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="password"
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
