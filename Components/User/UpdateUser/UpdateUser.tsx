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
import axios from 'axios';
import { ContextApp } from '../../../Context/ContextAuth/ContextAuth';
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
    const {setUserSession} = React.useContext(ContextApp)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pseudoValue, setPseudoValue] = useState(user.pseudo);
    const [mailValue, setMailValue] = useState(user.mail);
    const [mdpValue, setMdpValue] = useState(user.mot_de_passe);
    const [descriptionValue, setDescriptionValue] = useState(user.description);
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<string | ArrayBuffer>();
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
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

    const onFinish = async () => {
        setIsLoading(true);
        await axios({
            url: `https://projetcubesapi.herokuapp.com/api/utilisateur/update`,
            method: "PATCH",
            data: {
                pseudo: pseudoValue,
                description: descriptionValue,
                mail: mailValue,
                image: file
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res =>{
            setUserSession("utilisateur", res.data._id, {
                path: "/"
            });
            router.replace(router.asPath);
        })
        
        setIsLoading(false);
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
                            <Text>Mail :</Text>
                        </Col>
                        <Col span={8}>
                            <Text>Description :</Text>
                        </Col>
                        <Col span={8}>
                            <Text>Pseudo :</Text>
                        </Col>
                        <Col span={8}>
                            <Input required value={mailValue} onChange={(e) => setMailValue(e.currentTarget.value)} />
                        </Col>
                        <Col span={8}>
                            <Input required value={descriptionValue} onChange={(e) => setDescriptionValue(e.currentTarget.value)} />
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
