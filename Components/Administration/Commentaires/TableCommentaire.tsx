import * as React from 'react';
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Col, List, notification, Row, Space, Switch, Table, Tag, Typography } from 'antd';
import { IRessource } from '../../../interfaces/IRessource';
import { deleteUtilisateur, getUtilisateurById } from '../../../services/utilisateur.service';
import { useState } from 'react';
import Text from 'antd/lib/typography/Text';
import { ICommentaire } from '../../../interfaces/ICommentaire';
import { deleteComment, updateComment } from '../../../services/commentaire.service';
import router from 'next/router';
import { DrawerCommentaire } from './DrawerCommentaire';

interface IPropsCardCommentaire {
    commentaires: ICommentaire[];
}

const { Title } = Typography;

export const TableCommentaire: React.FunctionComponent<IPropsCardCommentaire> = ({ commentaires }) => {
    const [idEditCommentaire, setIdEditCommentaire] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const deleteCommentaire = async (IdCommentaire: number) => {
        setIsLoading(true);
        await deleteComment(IdCommentaire).then((res) => {
            if (res.status == 200) {
                notification.success({
                    message: 'Utilisateur suprimmer',
                });
            } else {
                notification.error({
                    message: 'Une erreur est survenue',
                });
            }
        });
        setIsLoading(false);
    }

    const updateCommentaire = async (commentaireId, validation, auteur, date, description, ressource) => {
        setIsLoading(true);
        const updateCommentaire: ICommentaire = {
            validation: validation,
            utilisateur: auteur,
            date_creation: date,
            description: description,
            ressource: ressource,
        }
        await updateComment(commentaireId, updateCommentaire);
        setIsLoading(false);
        router.reload();
    };
    const columns = [
        {
            title: 'Auteur',
            dataIndex: 'auteur',
            key: 'auteur',
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
            render: val => (<p> {val} </p>),
        },

        {
            title: 'date_creation',
            dataIndex: 'date_creation',
            key: 'date_creation',
        },
        {
            title: 'Validation',
            dataIndex: 'validation',
            key: 'validation',
            render: (val) => (<Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked={val.validation}
                onChange={() => { updateCommentaire(val.id, !val.validation, val.auteur, val.date, val.description, val.ressource) }}
            />)
        },
        {
            title: 'Actions',
            key: 'action',
            render: (record) => (
                <Space>
                    <Button icon={<DeleteOutlined />} onClick={() => { setIdEditCommentaire(record.id) }} />
                    <Button icon={<DeleteOutlined />} onClick={() => { deleteCommentaire(record.id) }} />
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

