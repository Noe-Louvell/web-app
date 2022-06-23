import { notification } from 'antd';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import Page from '../../Components/generic/Page/Page';
import AccountUser from '../../Components/User/AccountUser/AccountUser';
import UpdateUser from '../../Components/User/UpdateUser/UpdateUser';
import { ContextApp } from '../../Context/ContextApp/ContextApp';
import { IUser } from '../../interfaces/IUser';
import { getUtilisateurById } from '../../services/utilisateur.service';

export default function Publications() {
    const { userSession } = useContext(ContextApp);

    return (

        <Page
            title='Mon profile'
        >
            { userSession != null ? <AccountUser /> : <></>}
        </Page>
    );
}