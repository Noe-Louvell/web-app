import axios from 'axios';
import { GetServerSideProps } from 'next';
import * as React from 'react';
import Page from '../../Components/generic/Page/Page';
import AccountUser from '../../Components/User/AccountUser/AccountUser';
import { IUser } from '../../interfaces/IUser';

export default function ProfileById({user}) {
    return (
        <Page
            title='Publication'
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
// export async function getServerSideProps({context }) {
//     console.log(context);
//     const { locales } = context.query
//     console.log(locales);
    
    // const response = await axios({
    //     method: 'get',
    //     url: `http://localhost:3000/api/utilisateur/${context.params._id}`,
    //     headers: {
    //         'Authorization': `Bearer ${context.req.headers.cookie.split('token=')[1]}`
    //     }
    // })
//     const user: IUser = response.data;
//     return {
//         props: {
//             user
//         }
//     }
// }