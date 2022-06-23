import { notification } from 'antd';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import Page from '../../Components/generic/Page/Page';
import AccountUser from '../../Components/User/AccountUser/AccountUser';
import UpdateUser from '../../Components/User/UpdateUser/UpdateUser';
import { ContextApp } from '../../Context/ContextAuth/ContextAuth';
import { IUser } from '../../interfaces/IUser';
import { getUtilisateurById } from '../../services/utilisateur.service';

export default function Publications() {

    return (

        <Page
            title='Mon profile'
        >
            <AccountUser /> 
        </Page>
    );
}