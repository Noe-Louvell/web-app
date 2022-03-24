import { notification } from 'antd';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Page from '../../Components/generic/Page/Page';
import AccountUser from '../../Components/User/AccountUser/AccountUser';
import UpdateUser from '../../Components/User/UpdateUser/UpdateUser';
import { IUser } from '../../interfaces/IUser';

export default function Publications() {
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem('user')))
    }, []);
    return (
        <Page
            title='Mon profile'
        >
            <AccountUser user={user} />
        </Page>
    );
}