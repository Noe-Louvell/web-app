import * as React from 'react';
import { Avatar, Badge, Button, Popover, Space, Typography } from 'antd';
import { IUser } from '../../../interfaces/IUser';
import CardUserIndex from '../CardUser/CardUser';
import router from 'next/router';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { ContextApp } from '../../../Context/ContextAuth/ContextAuth';
import axios from 'axios';
const { Text } = Typography;


const BadgeUserProfile: FunctionComponent = () => {
    const { userSession, removeUserSession } = useContext(ContextApp);
    const [user, setUser] = useState<any>(null);


    useEffect(() => {
        if (Object.keys(userSession).length !== 0) {
            axios({
                method: 'get',
                url: 'http://localhost:3000/api/utilisateur/monprofil',
                headers: {
                    'Authorization': 'Bearer ' + userSession.token
                }
            }).then((res) => {
                setUser(res.data)
            })
        }
    }, [userSession]);

    const onDeconection = () => {
        removeUserSession("user")
        router.push('/login');
    }
    const ContentPopover = <>
        <Button onClick={() => onDeconection()}>Se déconecter</Button>
    </>;
    return (
        user ?
            <Space size='middle'>
                <Popover placement="bottomRight" style={{ width: 100, backgroundColor: '#f2f2f2' }} content={ContentPopover} >
                    <Badge dot>
                        <Avatar
                            // size={40}
                            src={user.image}
                        />
                    </Badge>

                </Popover>
            </Space>
            :
            <>
                <Space size='middle'>
                    <Button onClick={() => router.push('/login')}>Se connecter</Button>
                </Space>
            </>
    );
};

export default BadgeUserProfile;
