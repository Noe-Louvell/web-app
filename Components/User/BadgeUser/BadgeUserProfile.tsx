import * as React from 'react';
import { Avatar, Badge, Button, Popover, Space, Typography } from 'antd';
import { IUser } from '../../../interfaces/IUser';
import CardUserIndex from '../CardUser/CardUser';
import router from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';
const { Text } = Typography;


const BadgeUserProfile: FunctionComponent= () => {
    const [user, setUserS] = useState();
    const getUser = () => {
        const usersession = sessionStorage.getItem('user');
        setUserS(JSON.parse(usersession));
    }
    useEffect(() => {
        getUser();
        console.log(user);
    }, []);
    
    return (
        user ? 
        <Space size='middle'>
            <Popover placement="bottomRight" style={{ width: 300, backgroundColor: '#f2f2f2' }} content={<Button onClick={() => router.push('/login')}>Se déconecter</Button>} >
                <Badge dot>
                    <Avatar
                        size={40}
                        src={user.image}
                    />
                </Badge>

            </Popover>
        </Space>
        :
        <></>
    );
};

export default BadgeUserProfile;

