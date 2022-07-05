import * as React from 'react';
import { Avatar, Badge, Popover, Space, Typography } from 'antd';
import { IUser } from '../../../interfaces/IUser';
import CardUserIndex from '../CardUser/CardUser';
import moment from 'moment';
import { ContextApp } from '../../../Context/ContextAuth/ContextAuth';

interface IPropsBadgeUser {
    user: IUser;
    size?: number;
    date?: string;
}

const { Text } = Typography;


const BadgeUser: React.FunctionComponent<IPropsBadgeUser> = ({ user = null, date, size }) => {
    if (user === null) return null;
    let dateFormated = new Date(date);
    return (
        <Space size='middle'>
            <Popover placement="leftTop" style={{ width: 300, backgroundColor: '#f2f2f2' }} content={<CardUserIndex user={user} />} >
                <Badge color={user.compte_actif ? 'green' : 'red'} dot>
                    <Avatar
                        size= {size ? size : 45}
                        src={user.image ? user.image : null} 
                    />
                </Badge>

            </Popover>
            <Space direction='vertical' className='space-badge-user'>
                <Text>{user.nom} {user.prenom}</Text>
                {date && (
                    
                    <Text className='antDateType' type='secondary'>{moment(dateFormated).format('L')}</Text>
                )}
            </Space>

        </Space>
    );
};

export default BadgeUser;

