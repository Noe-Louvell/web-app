import * as React from 'react';
import { Avatar, Badge, Button, Popover, Space, Typography } from 'antd';
import { IUser } from '../../../interfaces/IUser';
import CardUserIndex from '../CardUser/CardUser';
import router from 'next/router';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { ContextApp } from '../../../Context/ContextAuth/ContextAuth';
import axios from 'axios';
import { deconnexion } from '../../../services/utilisateur.service';
const { Text } = Typography;


const BadgeUserProfile: FunctionComponent = () => {
    const { userSession, tokenSession, getDisconnect } = useContext(ContextApp);
    const [user, setUser] = useState<any>(null);


    useEffect(() => {
        if (Object.keys(userSession).length !== 0) {
            axios({
                method: 'get',
                url: 'https://projetcubesapi.herokuapp.com/api/utilisateur/monprofil',
                headers: {
                    'Authorization': 'Bearer ' + tokenSession.token
                }
            }).then((res) => {
                setUser(res.data)
            })
        }
    }, [userSession]);

    console.log(tokenSession)

    const ContentPopover = <>
        <Button onClick={() => getDisconnect(tokenSession.token)}>Se déconnecter</Button>
    </>;
    return (
        user ?
            <Space size='middle'>
                <Popover id='popoverProfil' placement="bottomRight" style={{ backgroundColor: '#f2f2f2' }} content={ContentPopover} >
                    <Avatar
                        src={user.image}
                        alt={'image de profil'}
                    />
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
