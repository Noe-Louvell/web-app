import * as React from 'react';
import { TableRessource } from '../../Components/Administration/Publications/TableRessource';
import Page from '../../Components/generic/Page/Page';
import { getAllRessources } from '../../services/ressource.service';

export default function AdminPublications({ publicationData = [] }) {
    return (
        <Page
            title='Admin Publication'
            siderContent={false}
        >
            <TableRessource ressources={publicationData} />
        </Page>
    );
}

export async function getStaticProps({ params }) {
    const res = await getAllRessources();
    const publicationData = await res.data;
    return {
        props: {
            publicationData
        }
    }
}