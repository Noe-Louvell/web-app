import * as React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, List, Row, Typography } from 'antd';
import { IUser } from '../../../interfaces/IUser';
import BadgeUserIndex from '../BadgeUser/BadgeUser';

interface IPropsCardUser {
    users: IUser[];
}

const { Title } = Typography;


const ListUserIndex: React.FunctionComponent<IPropsCardUser> = ({ users }) => {

    return (
        <div className='center'>
            <List
                style={{ width: '100%', overflow:'hidden', padding: '5px' }}
                header={
                    <Row gutter={16}>
                        <Col className="gutter-row" span={19}>
                            <Title level={5}>Contacts </Title>
                        </Col>
                        <Col className="gutter-row" span={2}>
                            <Button type="text" icon={<SearchOutlined />}></Button>
                        </Col>
                    </Row>
                }
                footer={null}
                dataSource={users}
                renderItem={item => (
                    <List.Item>
                        <BadgeUserIndex user={item} />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default ListUserIndex;

