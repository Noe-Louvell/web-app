import * as React from 'react';
import { Avatar, Badge, Popover, Space, Typography } from 'antd';
import { IUser } from '../../../interfaces/IUser';
import CardUserIndex from '../CardUser/CardUser';

interface IPropsBadgeUserProfile {
    user: IUser;
    date?: string;
}

const { Text } = Typography;


const BadgeUserProfile: React.FunctionComponent<IPropsBadgeUserProfile> = ({ user = null, date }) => {
    if (user === null) return null;
    return (
        <Space size='middle'>
            <Popover placement="bottomRight" style={{ width: 300, backgroundColor: '#f2f2f2' }} content={<p>Oui</p>} >
                <Badge dot>
                    <Avatar
                        size= {40}
                        src={user.avatar} 
                    />
                </Badge>

            </Popover>
        </Space>
    );
};

export default BadgeUserProfile;

