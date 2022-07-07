import * as React from 'react';
import { useContext } from 'react';
import { TableUser } from '../../Components/Administration/Utilisateurs/TableUser';
import Page from '../../Components/generic/Page/Page';
import { ContextApp } from '../../Context/ContextAuth/ContextAuth';
import { IUser } from '../../interfaces/IUser';
import axios from 'axios';

export default function AdminUtilisateur({ utilisateurData, errorCode }) {

    return (

        <Page
            title='Admin Utilisateur'
            siderContent={false}
        >
            <TableUser users={utilisateurData} />
        </Page>
    );
}




export async function getServerSideProps(context) {
    const response = await axios({
        method: 'get',
        url: 'https://projetcubesapi.herokuapp.com/api/utilisateur',
        headers: {
            'Authorization': `Bearer ${context.req.headers.cookie.split('token=')[1]}`
        }
    })
    const utilisateurData: IUser[] = response.data;
    return {
        props: {
            utilisateurData
        }
    }
}