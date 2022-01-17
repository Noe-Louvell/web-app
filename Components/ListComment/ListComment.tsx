import * as React from 'react';
import { Comment, Tooltip, List, Typography, Button, Avatar, Modal, Popover, Badge, Divider, Input, Space, Row, Col } from 'antd';
import moment from 'moment';
import CardUserIndex from '../User/CardUser/CardUser';
import { ListCommentaire } from '../../mocks/commentaire.mock';
import { ICommentaire } from '../../interfaces/ICommentaire';
import { User1 } from '../../mocks/user.mock';
import { SendOutlined } from '@ant-design/icons';
// import { User1, User2 } from '../../mocks/user.mock'


interface IPropsListComment {
    comments: ICommentaire[];
}


const ListCommentIndex: React.FunctionComponent<IPropsListComment> = ({ comments }) => {

    return (
        <>
            <Row gutter={16} style={{marginBottom:'2%'}}>
                <Col span={2}>
                    <Avatar src={User1.avatar} />
                </Col>
                <Col span={20}>
                    <Input.Group compact>
                        <Input placeholder='Ecrivez un commentaire ...' style={{ width: 'calc(100% - 40px)' }}/>
                        <Button icon={<SendOutlined />}/>
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
                            author={item.auteur.nom + ' ' + item.auteur.prenom}
                            avatar={
                                <Badge color={item.auteur.isActif ? 'green' : 'red'} dot>
                                    <Avatar src={item.auteur.avatar} />
                                </Badge>
                            }
                            content={item.content}
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


