import * as React from 'react';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Col, Row, Typography, Progress, Spin, Card, Modal, Upload, message, UploadProps } from 'antd';
import { IRessource } from '../../../interfaces/IRessource';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { IUser } from '../../../interfaces/IUser';
import { ContextApp } from '../../../Context/ContextAuth/ContextAuth';
import axios from 'axios';
import { useRouter } from 'next/router';

interface IValueForm {
    texte?: string,
    titre?: string,
    image?: string,
}

interface IFormulaireProps {
    type: string,
    ressource?: IRessource,
    disable: boolean
}
const FormulaireRessource: React.FunctionComponent<IFormulaireProps> = ({ type, ressource, disable }) => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [user, setUser] = useState<IUser>();
    const [file, setFile] = useState<any>();
    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem('user')));
        forceUpdate({});
    }, []);
    const { tokenSession } = React.useContext(ContextApp)
    const router = useRouter();
    const onFinish = async (values: IValueForm) => {
        setIsLoading(true);
        await axios({
            method: 'patch',
            url: 'http://localhost:3000/api/ressource',
            data: {
                texte: values.texte,
                titre: values.titre,
                image:  file
            },
            headers: {
                Authorization: `Bearer ${tokenSession.token}`,
            },
        })
        form.resetFields();
        setIsLoading(false);
        router.replace(router.asPath);
        setVisible(false);
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

    return (
        isLoading ? <Spin className='center' /> :
            <>
                <Button className='fixedButton' disabled={disable} shape="circle" size='large' icon={<PlusOutlined />} onClick={() => setVisible(true)} />

                <Modal
                    title={type == 'create' ? "Nouvelle publication" : "Modifier la publication"}
                    centered
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    width={900}
                    footer={null}
                >

                    <Form
                        layout="vertical"
                        hideRequiredMark
                        form={form}
                        onFinish={onFinish}
                        fields={[
                            {
                                name: ["texte"],
                                value: ressource ? ressource.texte : '',
                            },
                            {
                                name: ["titre"],
                                value: ressource ? ressource.titre : '',
                            }
                        ]}
                    >
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="titre"
                                    label="Titre"
                                    required
                                    rules={[{ required: true, message: 'Veuillez entre un titre' }]}
                                >
                                    <Input required placeholder='Titre de la publication' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="texte"
                                    label="Texte"
                                    required
                                    rules={[{ required: true, message: 'Veuillez entre un texte' }]}
                                >
                                    <TextArea
                                        required
                                        rows={4}
                                        placeholder='Contenue de la publication'
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="Image" name='image' getValueFromEvent={getFile}>
                                    <Upload
                                        listType="picture"
                                        maxCount={1}
                                        multiple={false}
                                        className="upload-list-inline"
                                        beforeUpload={beforeUpload}
                                    >
                                        <Button icon={<UploadOutlined />}>Upload</Button>
                                    </Upload>
                                    {/* <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload> */}
                                </Form.Item>

                            </Col>
                        </Row>
                        <Row gutter={16} style={{ justifyContent: 'center' }}>
                            <Col span={12}>
                                <Form.Item
                                    shouldUpdate
                                >
                                    {() => (
                                        <Button
                                            style={{ width: '100%' }}
                                            type="primary"
                                            htmlType="submit"
                                            disabled={
                                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                            }
                                        >
                                            Créer la publication
                                        </Button>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                </Modal>
            </>
    );
};

export default FormulaireRessource;

