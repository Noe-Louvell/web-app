import axios from 'axios';
import { GetServerSideProps } from 'next';
import * as React from 'react';
import Page from '../../Components/generic/Page/Page';
import AccountUser from '../../Components/User/AccountUser/AccountUser';

export default function ProfileById({user}) {
    return (
        <Page
            title={`Profil de ${user.pseudo}`}
        >
            <AccountUser user={user} />
        </Page>
    );
}


export const getServerSideProps: GetServerSideProps = async context =>  {
    const response = await axios({
        method: 'get',
        url: `http://localhost:3000/api/${context.resolvedUrl}`,
        headers: {
            'Authorization': `Bearer ${context.req.headers.cookie.split('token=')[1]}`
        }
    })
    
    const user = await response.data;
    return { props: { user }}
}