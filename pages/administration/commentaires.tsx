import * as React from 'react';
import { TableCommentaire } from '../../Components/Administration/Commentaires/TableCommentaire';
import Page from '../../Components/generic/Page/Page';
import { getAllComments } from '../../services/commentaire.service';

export default function AdminCommentaires({ commentaireData }) {
    return (
        <Page
            title='Admin Publication'
            siderContent={false}
        >
            <TableCommentaire commentaires={commentaireData} />
        </Page>
    );
}

export async function getStaticProps({ params }) {
    const res = await getAllComments();
    const commentaireData = await res.data;
    return {
        props: {
            commentaireData
        }
    }
}