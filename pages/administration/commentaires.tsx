import axios from 'axios';
import * as React from 'react';
import { TableCommentaire } from '../../Components/Administration/Commentaires/TableCommentaire';
import Page from '../../Components/generic/Page/Page';

export default function AdminCommentaires({ commentaireData }) {
    return (
        <Page
            title='Admin Commentaires'
            siderContent={false}
        >
            <TableCommentaire commentaires={commentaireData} />
        </Page>
    );
}

export async function getServerSideProps(context) {
    const response = await axios({
        method: 'get',
        url: 'http://localhost:3000/api/commentaire',
        headers: {
            'Authorization': `Bearer ${context.req.headers.cookie.split('token=')[1]}`
        }
    })
    const commentaireData = response.data;
    return {
        props: {
            commentaireData
        }
    }
}