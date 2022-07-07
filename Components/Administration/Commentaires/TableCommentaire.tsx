import * as React from 'react';
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Col, List, notification, Row, Space, Switch, Table, Tag, Typography } from 'antd';
import { IRessource } from '../../../interfaces/IRessource';
import { deleteUtilisateur, getUtilisateurById } from '../../../services/utilisateur.service';
import { useState } from 'react';
import Text from 'antd/lib/typography/Text';
import { ICommentaire } from '../../../interfaces/ICommentaire';
import { deleteComment, switchComment, updateComment } from '../../../services/commentaire.service';
import router, { useRouter } from 'next/router';
import { DrawerCommentaire } from './DrawerCommentaire';
import { ContextApp } from '../../../Context/ContextAuth/ContextAuth';
import moment from 'moment';

interface IPropsCardCommentaire {
    commentaires: ICommentaire[];
}

const { Title } = Typography;

export const TableCommentaire: React.FunctionComponent<IPropsCardCommentaire> = ({ commentaires }) => {
    const { tokenSession } = React.useContext(ContextApp);
    const [idEditCommentaire, setIdEditCommentaire] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const deleteCommentaire = async (IdCommentaire: number) => {
        setIsLoading(true);
        await deleteComment(IdCommentaire, tokenSession.token).then((res) => {
            if (res.status == 200) {
                notification.success({
                    message: 'Commentaire suprimmer',
                });
            } else {
                notification.error({
                    message: 'Une erreur est survenue',
                });
            }
        });
        router.replace(router.asPath)
        setIsLoading(false);
    }

    const switchCommentaire = async (commentaireId) => {
        setIsLoading(true);
        await switchComment(commentaireId, tokenSession.token);
        setIsLoading(false);
        router.replace(router.asPath)
    };
    console.log(commentaires)
    const columns = [
        {
            title: 'Auteur',
            dataIndex: 'utilisateur',
            key: 'utilisateur',
            render :val => <p>{val.pseudo}</p>,
        },
        {
            title: 'Contenue',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Ressource',
            dataIndex: 'ressource',
            key: 'ressource',
            render :val => <p>{val.titre}</p>,
        },

        {
            title: 'Date de creation',
            dataIndex: 'date_creation',
            key: 'date_creation',
            render :val => <p>{moment(new Date(val)).format("DD/MM/YYYY HH:mm:ss")}</p>,
        },
        {
            title: 'Validation',
            dataIndex: 'validation',
            key: 'validation',
            render: (val, record) => (<Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked={val}
                onChange={() => { switchCommentaire(record._id) }}
            />)
            // render: val => (val ? <div className='left'><Tag color="green">Actif</Tag></div> : <div className='left'><Tag color="red">Non Actif</Tag></div>),
        },
        {
            title: 'Actions',
            key: 'action',
            render: (record) => (
                <Space>
                    <Button icon={<DeleteOutlined />} onClick={() => { deleteCommentaire(record._id) }} />
                </Space>
            ),
        },
    ];
    const onCloseDrawer = () => {
        setIdEditCommentaire(null);
        return false;
    }
    return (
        <div className='container'>
            <Title level={3}> Gestion commentaires :</Title>
            {idEditCommentaire ? <DrawerCommentaire idCommentaire={idEditCommentaire} visible={idEditCommentaire ? true : false} onClose={onCloseDrawer} /> : <></>}
            <Row>
                <Col xs={24} lg={24}>
                </Col>
                <Col xs={24} lg={24}>
                    <Table dataSource={commentaires} columns={columns} loading={isLoading} />
                </Col>
            </Row>
        </div>

    );
};

