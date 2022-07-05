import { LikeOutlined, MessageOutlined, ReadOutlined, TeamOutlined, UserAddOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import * as React from 'react';
import Page from '../../Components/generic/Page/Page';

export default function AdminStats() {
    return (
        <Page
            title='Admin Statistiques'
            siderContent={false}
        >
            <Row gutter={16} align='middle' justify='center' >
                <Col span={24}>
                    <Card title="Utilisateurs" bordered={false} style={{ width: '100%' }}>
                        <Row gutter={16} align='middle' justify='center' >
                            <Col span={12} style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                                <Statistic title="Nombre total d'utilisateurs" value={20} prefix={<TeamOutlined />} />
                            </Col>
                            <Col span={12} style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                                <Statistic title="Nombre total d'utilisateurs de cette semaine" value={4} prefix={<UsergroupAddOutlined />} />

                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title="Relations" bordered={false} style={{ width: '100%' }}>
                        <Row gutter={16} align='middle' justify='center' >
                            <Col span={12} style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                                <Statistic title="Nombre total de relations" value={36} prefix={<UserOutlined />} />
                            </Col>
                            <Col span={12} style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                                <Statistic title="Nombre total de relations de cette semaine" value={11} prefix={<UserAddOutlined />} />

                            </Col>
                        </Row>
                    </Card>

                </Col>
            </Row>
            <Row gutter={16} align='middle' justify='center' >
                <Col span={24}>
                     <Card title="Publications" bordered={false} style={{ width: '100%' }}>
                        <Row gutter={16} align='middle' justify='center' >
                            <Col span={12} style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                                <Statistic title="Nombre total de publications" value={56} prefix={<ReadOutlined />} />
                            </Col>
                            <Col span={12} style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                                <Statistic title="Nombre total de publications de cette semaine" value={21} prefix={<ReadOutlined />} />

                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title="Commentaires" bordered={false} style={{ width: '100%' }}>
                        <Row gutter={16} align='middle' justify='center' >
                            <Col span={12} style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                                <Statistic title="Nombre total de commentaires" value={121} prefix={<MessageOutlined />} />
                            </Col>
                            <Col span={12} style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                                <Statistic title="Nombre total de commentaires de cette semaine" value={43} prefix={<MessageOutlined />} />

                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>

        </Page>
    );
}

// export async function getStaticProps({ params }) {
//     const res = await getAllRessources();
//     const publicationData = await res.data;
//     return {
//         props: {
//             publicationData
//         }
//     }
// }