import * as React from 'react';
import { Comment, List, Button, Avatar, Badge, Divider, Input, Row, Col, Empty, Form, Space } from 'antd';
import { ICommentaire } from '../../interfaces/ICommentaire';
import { User1 } from '../../mocks/user.mock';
import { SendOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { createComment } from '../../services/commentaire.service';
import { ContextApp } from '../../Context/ContextAuth/ContextAuth';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';


interface IPropsListComment {
    ressourceId: string;
    comments: ICommentaire[];
}


const ListCommentIndex: React.FunctionComponent<IPropsListComment> = ({ comments, ressourceId }) => {
    const [newCommentContent, setNewCommentContent] = useState('');
    const [newRepContent, setNewRepContent] = useState('');
    const [idComment, setIdComment] = useState('');
    const [isReply, setIsReply] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { userSession, tokenSession } = useContext(ContextApp);
    const router = useRouter();
    const [formRep] = Form.useForm();
    const addComment = async () => {
        setIsLoading(true);

        await axios({
            url: `http://localhost:3000/api/ressource/${ressourceId}/commentaire`,
            method: 'patch',
            data: {
                description: newCommentContent,
            },
            headers: {
                Authorization: `Bearer ${tokenSession.token}`,
            },
        })
        router.replace(router.asPath)
        setIsLoading(false);
    };

    const addRep = async (rep, idComment) => {
        setIsLoading(true);

        await axios({
            url: `http://localhost:3000/api/commentaire/reponse/${idComment}`,
            method: 'patch',
            data: {
                description: rep,
            },
            headers: {
                Authorization: `Bearer ${tokenSession.token}`,
            },
        })
        router.replace(router.asPath)
        setIsLoading(false);
    };

    const handleReply = (id) => {
        setIdComment(id)
        setIsReply(!isReply)
    }

    const changeRep = (e) => {
        setNewRepContent(e);
        console.log(e)
    }
    const onFinish = async (values: any) => {
        await addRep(values.rep, idComment)
        formRep.resetFields();
    }
    const ExampleComment: React.FC<{ children?: React.ReactNode, comment }> = ({ children, comment }) => (
        <>
            <Comment
                author={comment.utilisateur.pseudo}
                avatar={<Avatar src={comment.utilisateur.image} />}
                content={comment.description}
                datetime={moment(new Date(comment.date_creation)).format("DD/MM/YYYY HH:mm:ss")}
            >
                {comment.reponses.map((item) => {
                    return (
                        <>
                            <Comment
                                author={item.utilisateur.pseudo}
                                avatar={<Avatar src={item.utilisateur.image} />}
                                content={item.description}
                                datetime={moment(new Date(item.date_creation)).format("DD/MM/YYYY HH:mm:ss")}
                                key={item._id}
                            >
                            </Comment>
                        </>
                    )
                })}
            </Comment>
            {isReply === true && idComment == comment._id ?
                <Row gutter={16} style={{ marginBottom: '2%', width: '95%' }}>
                    <Col span={3}>

                    </Col>
                    <Col span={18}>
                        <Form form={formRep} onFinish={onFinish}>
                            <Row>
                                <Col span={20}>
                                    <Form.Item name="rep">
                                        <Input placeholder='Ecrivez votre réponse ...' />
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Button icon={<SendOutlined />} htmlType="submit" />
                                </Col>
                            </Row>



                        </Form>


                    </Col>
                </Row> : <></>}

            <Button type='text' size='small' style={{fontSize:'13px', color:'#ccc'}} onClick={() => handleReply(comment._id)}>Répondre à</Button>
        </>

    );
    return (
        <>
            <Row gutter={16} style={{ marginBottom: '2%' }}>
                <Col span={20}>
                    <Input.Group compact>
                        <Input placeholder='Ecrivez un commentaire ...' style={{ width: 'calc(100% - 40px)' }} onChange={(e) => setNewCommentContent(e.currentTarget.value)} />
                        <Button icon={<SendOutlined />} onClick={addComment} />
                    </Input.Group>
                </Col>
            </Row>
            <Divider />
            <List
                style={{
                    height: comments.length > 0 ? 'auto' : 70,
                    overflow: 'auto',
                }}
                dataSource={comments}
                renderItem={item => (
                    <>
                        <ExampleComment comment={item} key={item._id} />
                        <Divider />
                    </>

                )}
                locale={{ emptyText: 'Aucun commentaire' }}
            />
        </>
    );
};

export default ListCommentIndex;


