import * as React from 'react';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Col, Row, Typography, Progress, Spin, Card } from 'antd';
import { IRessource } from '../../../interfaces/IRessource';

const { Text } = Typography;

interface IValueForm {
    nom: string,
    prenom: string,
    email: string,
    password: string
}

interface IFormulaireProps {
    type: string,
    ressource?: IRessource
}
const FormulaireRessource: React.FunctionComponent<IFormulaireProps> = ({ type, ressource }) => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    const [regexRes, setRegexRes] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        forceUpdate({});
    }, []);

    const mediumRegexPassword = '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})';
    const strongRegexPassword = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})';



    const onFinish = async (values: IValueForm) => {
        setIsLoading(true);

        await console.log('create or update' + values);
        form.resetFields();
        setRegexRes('');
        setIsLoading(false);
    };

    return (
        isLoading ? <Spin className='center' /> :
        
        <div className='center'>
            <Card title={type == 'create' ? "Nouvelle publication" :  "Modifier la publication"} style={{width:'100vh'}}>
            < Form
                    form={form}
                    onFinish={onFinish}
                    layout='vertical'
                >
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} align="middle">
                        <Col span={24}>
                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez entrer une description !'
                                    },
                                    {
                                        max: 600,
                                        message: 'La description est trop grande !'
                                    }
                                ]}
                            >
                                <Input type={'text'} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* <Form.Item
                        shouldUpdate
                    >
                        {() => (
                            <Button
                                style={{ width: '30%' }}
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
                    </Form.Item> */}
                </Form>
        </Card>
        </div>

                );
};

                export default FormulaireRessource;

