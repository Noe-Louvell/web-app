import { CommentOutlined, ReadOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row, Space, Typography } from 'antd';
import * as React from 'react';
import Page from '../../Components/generic/Page/Page';

const { Title } = Typography;
export default function Publications() {
    return (
        <Page
            title='Admin commentaires'
            siderContent={false}
        >
            <>
                User commentaires
            </>
        </Page>
    );
}
