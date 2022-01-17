import * as React from 'react';
import { useState } from 'react';
import { Button, Col, Modal, Row, Typography, Upload, message, Input, Divider, Space } from 'antd';
import { IUser } from '../../../interfaces/IUser';
import { EditOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import Image from 'next/image'

const { Title } = Typography;
const { TextArea } = Input;

interface IPropsUpdateUser {
    user?: IUser;
}

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('Vous ne pouvez télécharger que le fichier JPG/PNG !');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('L’image doit être inférieure à 2 Mo !');
    }
    return isJpgOrPng && isLt2M;
}

const UpdateUser: React.FunctionComponent<IPropsUpdateUser> = ({ user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [loadingImg, setLoadingImg] = useState(false);
    const [image, setImage] = useState<File>();
    const [imageUrl, setImageUrl] = useState<string>('');
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoadingImg(true);
            return;
        }
        if (info.file.status === 'done') {
            setImage(info.file.originFileObj);
            getBase64(info.file.originFileObj, imageUrl => {
                setImageUrl(imageUrl);
                setLoadingImg(false);
                return;
            }
            );
        }
    };
    const uploadButton = (
        <div>
            {loadingImg ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            <Button icon={<EditOutlined />} onClick={() => setIsModalOpen(true)}>Modifier le profil</Button>
            <Modal
                width={600}
                className='modalUpdateUser'
                title="Modifier le profil"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <Space size={'large'} direction='vertical' style={{width: '100%'}}>
                    <Row gutter={16} align='middle' justify='center'>
                        <Col span={6} >
                            <Title level={3}>Photo de profil :</Title>
                        </Col>
                        <Col span={12} style={{ textAlign: 'center' }}>
                            <ImgCrop rotate>
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                >
                                    {imageUrl ? <Image src={imageUrl} alt="avatar" width={102} height={102} /> : uploadButton}
                                </Upload>
                            </ImgCrop>
                        </Col>
                        <Col span={6} />
                    </Row>
                    <Row gutter={16} align='middle' justify='center'>
                        <Col span={5} >
                            <Title level={3}>Pseudo :</Title>
                        </Col>
                        <Col span={19} style={{ textAlign: 'center' }}>
                            <Input placeholder="Basic usage" />
                        </Col>
                    </Row>
                    <Row gutter={16} align='middle' justify='center'>
                        <Col span={5} >
                            <Title level={3}>Biographie :</Title>
                        </Col>
                        <Col span={19} style={{ textAlign: 'center' }}>
                            <TextArea rows={4} />
                        </Col>
                    </Row>
                    <Divider />
                    <Row gutter={16} align='middle' justify='center'>
                        <Col span={6} />
                        <Col span={12} style={{ textAlign: 'center' }}>
                            <Button icon={<EditOutlined />} onClick={() => setIsModalOpen(false)}>Sauvegarder les modifications</Button>
                        </Col>
                        <Col span={6} />
                    </Row>
                </Space>
            </Modal>
        </>

    );
};

export default UpdateUser;

