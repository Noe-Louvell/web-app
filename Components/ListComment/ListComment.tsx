import * as React from 'react';
import { Comment, List, Button, Avatar, Badge, Divider, Input, Row, Col } from 'antd';
import { ICommentaire } from '../../interfaces/ICommentaire';
import { User1 } from '../../mocks/user.mock';
import { SendOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { createComment } from '../../services/commentaire.service';


interface IPropsListComment {
    ressourceId: string;
    utilisateurId: string;
    comments: ICommentaire[];
}


const ListCommentIndex: React.FunctionComponent<IPropsListComment> = ({ comments, ressourceId, utilisateurId }) => {
    const [newCommentContent, setNewCommentContent]= useState('');
    const [isLoading, setIsLoading] = useState(false);


    const addComment = async () => {
        setIsLoading(true);
        const newComment = {
            description:newCommentContent,
            validation: false,
            utilisateur: utilisateurId,
            ressource: ressourceId
        }
        await createComment(newComment);
        setIsLoading(false);
    };
    return (
        <>
            <Row gutter={16} style={{marginBottom:'2%'}}>
                <Col span={2}>
                    <Avatar src={User1.image} />
                </Col>
                <Col span={20}>
                    <Input.Group compact>
                        <Input placeholder='Ecrivez un commentaire ...' style={{ width: 'calc(100% - 40px)' }} onChange={(e)=> setNewCommentContent(e.currentTarget.value)}/>
                        <Button icon={<SendOutlined />} onClick={addComment}/>
                    </Input.Group>
                </Col>
            </Row>

            <List
                style={{
                    height: 400,
                    overflow: 'auto',
                }}
                footer={`${comments.length} réponses`}
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
            />
        </>
    );
};

export default ListCommentIndex;


