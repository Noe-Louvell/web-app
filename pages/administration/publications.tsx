import axios from 'axios';
import * as React from 'react';
import { TableRessource } from '../../Components/Administration/Publications/TableRessource';
import Page from '../../Components/generic/Page/Page';
import { getAllRessources } from '../../services/ressource.service';

export default function AdminPublications({ publicationData }) {
    return (
        <Page
            title='Admin Publication'
            siderContent={false}
        >
            <TableRessource ressources={publicationData} />
        </Page>
    );
}

export async function getStaticProps() {
    const response = await axios({
        method: 'get',
        url: 'http://localhost:3000/api/ressource',
    })
    const publicationData = await response.data;
    return {
        props: {
            publicationData
        }
    }
}