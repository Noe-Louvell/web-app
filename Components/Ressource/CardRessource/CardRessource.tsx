import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import { Image, Button, Card, Col, Dropdown, Menu, Row, Space, Typography, Divider } from 'antd';
import { EllipsisOutlined, MessageOutlined, LikeOutlined, ShareAltOutlined, CommentOutlined, HeartOutlined } from '@ant-design/icons';
import BadgeUserIndex from '../../User/BadgeUser/BadgeUser';
import { IRessource } from '../../../interfaces/IRessource';
import ListCommentIndex from '../../ListComment/ListComment';
import { reactRessource } from '../../../services/ressource.service';

interface IPropsCardRessource {
    ressource: IRessource;
}

const { Text, Paragraph } = Typography;

const handleMenuClick = ({ key }) => {
};




const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key='message'>
            <Space>
                <MessageOutlined />
                <Text > Envoyer un message </Text>
            </Space>
        </Menu.Item>
    </Menu>
);

const CardRessourceIndex: FunctionComponent<IPropsCardRessource> = ({ ressource }) => {
    const [isShowComment, setIsShowComment] = useState(false);
    const onClick = () => isShowComment ? setIsShowComment(false) : setIsShowComment(true);
    console.log(ressource)
    return (

        <Row gutter={16} style={{ marginTop: '10px' }}>
            <Col xs={{ span: 24 }} lg={{ span: 2 }}></Col>
            <Col xs={{ span: 24 }} lg={{ span: 20 }}>
                <Card bodyStyle={{ paddingBottom: 6 }} style={{ backgroundColor: '#fbfbfb', marginBottom: '5%', width: '750px', paddingBottom: '6px !important' }} >

                    <Row gutter={16}>
                        <Col xs={{ span: 22 }} lg={{ span: 23 }}>
                            <Space direction='vertical'>
                                <BadgeUserIndex user={ressource.utilisateur} date={ressource.date_creation} />
                            </Space>

                        </Col>
                        <Col xs={{ span: 2 }} lg={{ span: 1 }}>
                            {/* <Dropdown overlay={menu} placement='bottomRight'>
                                <Button type="text" icon={<EllipsisOutlined />}></Button>
                            </Dropdown> */}
                        </Col>

                    </Row>
                    <Row gutter={16} style={{ marginTop: '10px' }}>

                        {ressource.texte && (
                            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                                <Paragraph>
                                    {ressource.texte}
                                </Paragraph>
                            </Col>
                        )}
                        {ressource.image && (
                            <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                                <Row gutter={16}>
                                    <Col xs={{ span: 24 }} lg={{ span: 5 }}>
                                    </Col>
                                    <Col xs={{ span: 24 }} lg={{ span: 14 }}>
                                        <Image
                                            width='auto'
                                            height='auto'
                                            style={{ maxWidth: '700px', maxHeight: '450px' }}
                                            alt="image publciation"
                                            src={ressource.image}
                                        />
                                    </Col>
                                    <Col xs={{ span: 24 }} lg={{ span: 5 }}>
                                    </Col>
                                </Row>
                            </Col>
                        )}

                    </Row>
                    <Row gutter={16} style={{ textAlign: 'start', marginTop: '5px' }}>
                        <Col xs={{ span: 12 }} lg={{ span: 19 }}>
                            <HeartOutlined style={{ color: '#000091' }} />
                            <Text type='secondary'> {ressource.nb_reaction == undefined ? '0 like' : ressource.nb_reaction > 1 ? ressource.nb_reaction + ' likes' : ressource.nb_reaction + ' like'} </Text>
                        </Col>
                        <Col xs={{ span: 12 }} lg={{ span: 5 }} >
                            <CommentOutlined style={{ color: '#000091' }} />
                            <Text type='secondary'> {ressource.commentaires.length > 1 ? ressource.commentaires.length + ' commentaires' : ressource.commentaires.length + ' commentaire'} </Text>
                        </Col>

                    </Row>

                    <Row gutter={16} align='middle' justify='space-around'>
                        <Divider style={{ minWidth: '97%', margin: 5, marginTop: 15 }} />

                        <Col xs={{ span: 12 }} lg={{ span: 5 }}>
                            <Button className='button-card-ressrource' type='text' onClick={() => reactRessource(ressource._id)} icon={<LikeOutlined style={{ marginRight: '5px', color: 'rgba(0, 0, 0, 0.45)' }} title="J'aime" />}>
                                <Text type='secondary'> J&apos;aime </Text>
                            </Button>
                        </Col>
                        <Col xs={{ span: 12 }} lg={{ span: 5 }}>
                            <Button className='button-card-ressrource' type='text' onClick={onClick} icon={<MessageOutlined style={{ marginRight: '5px', color: 'rgba(0, 0, 0, 0.45)' }} title="Commenter" />}>
                                <Text type='secondary'> Commenter </Text>
                            </Button>
                        </Col>
                        <Col xs={{ span: 12 }} lg={{ span: 5 }}>
                            <Button className='button-card-ressrource' type='text' icon={<ShareAltOutlined style={{ marginRight: '5px', color: 'rgba(0, 0, 0, 0.45)' }} title="Partager" />}>
                                <Text type='secondary'> Partager </Text>
                            </Button>
                        </Col>
                    </Row>
                    {isShowComment && (
                        <>
                            <Divider />
                            <ListCommentIndex ressourceId={ressource._id} comments={ressource.commentaires} />
                        </>
                    )}
                </Card>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 2 }}></Col>
        </Row>
    );
};


export default CardRessourceIndex;
