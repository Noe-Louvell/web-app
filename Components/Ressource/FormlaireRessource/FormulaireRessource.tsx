import * as React from 'react';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Col, Row, Typography, Progress, Spin, Card, Modal, Upload, notification } from 'antd';
import { IRessource } from '../../../interfaces/IRessource';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { getUtilisateurById } from '../../../services/utilisateur.service';
import { IUser } from '../../../interfaces/IUser';
import { createRessource } from '../../../services/ressource.service';
import { Convert } from 'mongo-image-converter';

interface IValueForm {
    texte?: string,
    image?: string,
}

interface IFormulaireProps {
    type: string,
    ressource?: IRessource
}
const FormulaireRessource: React.FunctionComponent<IFormulaireProps> = ({ type, ressource }) => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [user, setUser] = useState<IUser>();
    const [file, setFile] = useState<string | ArrayBuffer>();
    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem('user')));
        forceUpdate({});
    }, []);

    const onFinish = async (values: IValueForm) => {
        setIsLoading(true);
        const newRessource: IRessource = {
            texte: values.texte,
            image: file.toString(),
            titre:'',
            utilisateur:user,
            nb_reaction: 0,
            commentaires: [],
        }
        await createRessource(newRessource);
        form.resetFields();
        setIsLoading(false);
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

    const getFile = async (e) => {
        const convertedImage = await Convert(e.file.originFileObj);
        setFile(convertedImage);
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
                <Button className='fixedButton' shape="circle" size='large' icon={<PlusOutlined />} onClick={() => setVisible(true)} />

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
                            }
                        ]}
                    >
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="texte"
                                    label="Texte"
                                    required
                                    rules={[{ required: true, message: 'Veuillez entre un texte' }]}
                                >
                                    <TextArea
                                        rows={4}
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

