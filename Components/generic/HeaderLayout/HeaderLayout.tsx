import * as React from 'react';
import { FunctionComponent } from 'react';
import { Col, Layout, Row, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;



export const HeaderLayout: FunctionComponent = () => {
    const dot = true;
    
    return (
        <Header className='header-layout'>
            <Row style={{ height: '100%' }} gutter={16} justify="space-between">
                <Col className='header-col' span={24}><Title level={3} style={{ marginBottom: '0px!important', fontSize: '17px!important' }}>Ressources Relationnelles</Title></Col>
            </Row>
        </Header>
    );
};
