import * as React from 'react';
import Page from '../../Components/generic/Page/Page';
import ListRessources from '../../Components/Ressource/ListRessources/ListRessources';
import { getAllRessources } from '../../services/ressource.service';

export default function Publications({ resRessources }) {
    return (
        <Page
            title='Publications'
        >
            <ListRessources ressources={resRessources} />
        </Page>
    );
}



export async function getStaticProps({ params }) {
    const res = await getAllRessources();
    const resRessources = await res.data;
    return {
        props: {
            resRessources
        }
    }
}