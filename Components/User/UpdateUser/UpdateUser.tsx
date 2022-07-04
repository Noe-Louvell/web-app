import * as React from 'react';
import { useState } from 'react';
import { Button, Col, Modal, Row, Upload, message, Input, Divider, Space, Tooltip, Avatar } from 'antd';
import { IUser } from '../../../interfaces/IUser';
import { EditOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import Image from 'next/image'
import Text from 'antd/lib/typography/Text';
import { Convert } from 'mongo-image-converter';
import { updateUtilisateur } from '../../../services/utilisateur.service';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router'
interface IPropsUpdateUser {
    user: IUser;
    token: string
}


const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('Vous ne pouvez télécharger que le fichier JPG/PNG !');
    }

    return isJpgOrPng;
}

const UpdateUser: React.FunctionComponent<IPropsUpdateUser> = ({ user, token }) => {
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nomValue, setNomValue] = useState(user.nom);
    const [pseudoValue, setPseudoValue] = useState(user.pseudo);
    const [prenomValue, setPrenomValue] = useState(user.prenom);
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<string | ArrayBuffer>();
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getFile = async (e) => {
        const convertedImage = await Convert(e.file.originFileObj);
        setFile(convertedImage);
        return;
    };

    const onFinish = async () => {
        setIsLoading(true);
        const upUtilisateur: IUser = {
            nom: nomValue,
            prenom: prenomValue,
            pseudo: pseudoValue,
            image: null,
            mail: user.mail,
            mot_de_passe: user.mot_de_passe
        }
        
        await updateUtilisateur(user._id, upUtilisateur, token);
        setIsLoading(false);
        router.reload();
        setIsModalOpen(false);
    };

    return (
            <>

                <Tooltip title="Modifier votre profile">
                    <Button type="dashed" shape="circle" icon={<EditOutlined />} onClick={() => setIsModalOpen(true)} />
                </Tooltip>
                <Modal
                    width={600}
                    className='modalUpdateUser'
                    title="Modifier le profil"
                    visible={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Space size={'large'} direction='vertical' style={{ width: '100%' }}>
                        <Row gutter={16} align='middle' justify='center'>
                            <Col span={24} style={{ textAlign: 'center' }}>
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
                            </Col>
                        </Row>
                        <Row gutter={16} align='middle' justify='center'>
                            <Col span={8}>
                                <Text>Nom :</Text>
                            </Col>
                            <Col span={8}>
                                <Text>Prenom :</Text>
                            </Col>
                            <Col span={8}>
                                <Text>Pseudo :</Text>
                            </Col>
                            <Col span={8}>
                                <Input required value={nomValue} onChange={(e) => setNomValue(e.currentTarget.value)} />
                            </Col>
                            <Col span={8}>
                                <Input required value={prenomValue} onChange={(e) => setPrenomValue(e.currentTarget.value)} />
                            </Col>
                            <Col span={8}>
                                <Input required value={pseudoValue} onChange={(e) => setPseudoValue(e.currentTarget.value)} />
                            </Col>
                        </Row>
                        <Divider />
                        <Row gutter={16} align='middle' justify='center'>
                            <Col span={6} />
                            <Col span={12} style={{ textAlign: 'center' }}>
                                <Button icon={<EditOutlined />} onClick={onFinish}>Sauvegarder les modifications</Button>
                            </Col>
                            <Col span={6} />
                        </Row>
                    </Space>
                </Modal>
            </>

    );
};

export default UpdateUser;
