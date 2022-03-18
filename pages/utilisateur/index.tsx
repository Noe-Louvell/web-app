import * as React from 'react';
import Page from '../../Components/generic/Page/Page';
import AccountUser from '../../Components/User/AccountUser/AccountUser';
import UpdateUser from '../../Components/User/UpdateUser/UpdateUser';

export default function Publications() {
    return (
        <Page
            title='Mon profile'
        >
            <UpdateUser />
            <AccountUser />
        </Page>
    );
}