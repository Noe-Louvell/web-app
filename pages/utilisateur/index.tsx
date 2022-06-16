import { notification } from 'antd';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Page from '../../Components/generic/Page/Page';
import AccountUser from '../../Components/User/AccountUser/AccountUser';
import UpdateUser from '../../Components/User/UpdateUser/UpdateUser';
import { IUser } from '../../interfaces/IUser';
import { getUtilisateurById } from '../../services/utilisateur.service';

export default function Publications() {
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        if (window) {
            const userIdSession: string = sessionStorage.getItem('userId');
            getUtilisateurById(userIdSession).then((res)=>{
                setUser(res.data);
            })
        }
    }, []);


    console.log(user);

    return (

        <Page
            title='Mon profile'
        >
            { user != undefined ? <AccountUser user={user} /> : <></>}
        </Page>
    );
}