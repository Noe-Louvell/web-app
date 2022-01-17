import * as React from 'react';
import { Avatar, Badge, Popover, Space, Typography } from 'antd';
import { IUser } from '../../../interfaces/IUser';
import CardUserIndex from '../CardUser/CardUser';

interface IPropsBadgeUser {
    user: IUser;
    date?: string;
}

const { Text } = Typography;


const BadgeUserIndex: React.FunctionComponent<IPropsBadgeUser> = ({ user = null, date }) => {
    if (user === null) return null;
    return (
        <Space size='middle'>
            <Popover placement="leftTop" style={{ width: 300, backgroundColor: '#f2f2f2' }} content={<CardUserIndex user={user} />} >
                <Badge color={user.isActif ? 'green' : 'red'} dot>
                    <Avatar
                        size={{ xs: 45, lg: 45, xl: 45, xxl: 45 }}
                        src={user.avatar} 
                    />
                </Badge>

            </Popover>
            <Space direction='vertical' className='space-badge-user'>
                <Text>{user.nom} {user.prenom}</Text>
                {date && (
                    <Text className='antDateType' type='secondary'>{date}</Text>
                )}
            </Space>

        </Space>
    );
};

export default BadgeUserIndex;

