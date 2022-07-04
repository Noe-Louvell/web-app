import * as React from 'react';
import { Comment, List, Button, Avatar, Badge, Divider, Input, Row, Col, Empty } from 'antd';
import { ICommentaire } from '../../interfaces/ICommentaire';
import { User1 } from '../../mocks/user.mock';
import { SendOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { createComment } from '../../services/commentaire.service';
import { ContextApp } from '../../Context/ContextAuth/ContextAuth';
import axios from 'axios';


interface IPropsListComment {
    ressourceId: string;
    comments: ICommentaire[];
}


const ListCommentIndex: React.FunctionComponent<IPropsListComment> = ({ comments, ressourceId }) => {
    const [newCommentContent, setNewCommentContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { userSession } = useContext(ContextApp);
    const addComment = async () => {
        setIsLoading(true);

        await axios({
            url: `http://localhost:3000/api/ressource/${ressourceId}/commentaire`,
            method: 'post',
            data: {
                description: newCommentContent,
            },
            headers: {
                Authorization: `Bearer ${userSession.token}`,
            },
        })
        setIsLoading(false);
    };
    return (
        <>
            <Row gutter={16} style={{ marginBottom: '2%' }}>
                <Col span={2}>
                    <Avatar src={userSession.image} />
                </Col>
                <Col span={20}>
                    <Input.Group compact>
                        <Input placeholder='Ecrivez un commentaire ...' style={{ width: 'calc(100% - 40px)' }} onChange={(e) => setNewCommentContent(e.currentTarget.value)} />
                        <Button icon={<SendOutlined />} onClick={addComment} />
                    </Input.Group>
                </Col>
            </Row>

            <List
                style={{
                    height: comments.length > 0 ? 400 : 70,
                    overflow: 'auto',
                }}
                footer={comments.length > 0 ? `${comments.length} réponses` : false}
                dataSource={comments}
                renderItem={item => (
                    <>
                        <Comment
                            author={item.utilisateur.nom + ' ' + item.utilisateur.prenom}
                            avatar={
                                <Badge color={item.utilisateur.compte_actif ? 'green' : 'red'} dot>
                                    <Avatar src={item.utilisateur.image} />
                                </Badge>
                            }
                            content={item.description}
                            datetime={item.date_creation}
                        />
                        <Divider />
                    </>

                )}
                locale={{ emptyText: 'Aucun commentaire' }}
            />
        </>
    );
};

export default ListCommentIndex;


