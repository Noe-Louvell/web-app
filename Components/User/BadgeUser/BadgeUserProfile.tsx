import * as React from 'react';
import { Avatar, Badge, Button, Popover, Space, Typography } from 'antd';
import { IUser } from '../../../interfaces/IUser';
import CardUserIndex from '../CardUser/CardUser';
import router from 'next/router';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { ContextApp } from '../../../Context/ContextAuth/ContextAuth';
const { Text } = Typography;


const BadgeUserProfile: FunctionComponent= () => {
    const { userSession, setUserSession } = useContext(ContextApp);

const onDeconection = () => {
    sessionStorage.clear();
    setUserSession(null);
    router.push('/login');
}
    
    return (
        userSession ? 
        <Space size='middle'>
            <Popover placement="bottomRight" style={{ width: 100, backgroundColor: '#f2f2f2' }} content={<Button onClick={() => onDeconection()}>Se déconecter</Button>} >
                <Badge dot>
                    <Avatar
                        size={40}
                        src={userSession.image}
                    />
                </Badge>

            </Popover>
        </Space>
        :
        <></>
    );
};

export default BadgeUserProfile;

