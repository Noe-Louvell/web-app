import { CommentOutlined, ReadOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row, Space, Typography } from 'antd';
import * as React from 'react';
import Page from '../../Components/generic/Page/Page';
import Link from 'next/link'
const { Title } = Typography;

export default function Publications() {
    return (
        <Page
            title='Publications'
            siderContent={false}
        >
            <Row gutter={16} justify='space-around' align='middle' style={{ height: '80%', margin: 0 }} >
                <Col xs={24} lg={4}>
                    <Link href={`/administration/utilisateurs`} passHref>
                        <Card className='card-button'>
                            <Space className='center'>
                                <TeamOutlined style={{ fontSize: 50 }} />
                                <Title level={3}>Utilisateurs</Title>
                            </Space>
                        </Card>
                    </Link>
                </Col>
                <Col xs={24} lg={4}>
                    <Link href={`/administration/publications`} passHref>
                        <Card className='card-button'>
                            <Space className='center'>
                                <ReadOutlined style={{ fontSize: 50 }} />
                                <Title level={3}>Publications</Title>
                            </Space>
                        </Card>
                    </Link>

                </Col>
                <Col xs={24} lg={4}>
                    <Link href={`/administration/commentaires`} passHref>
                        <Card className='card-button'>
                            <Space className='center'>
                                <CommentOutlined style={{ fontSize: 50 }} />
                                <Title level={3}>Commentaires</Title>
                            </Space>
                        </Card>
                    </Link>

                </Col>
            </Row>
        </Page>
    );
}
