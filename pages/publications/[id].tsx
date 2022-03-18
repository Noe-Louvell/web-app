import * as React from 'react';
import { getAllRessourcesIds, getRessourceData } from '.';
import Page from '../../Components/generic/Page/Page';
import CardRessourceIndex from '../../Components/Ressource/CardRessource/CardRessource';
import { IRessource } from '../../interfaces/IRessource';

export default function Publication({publicationData}) {
    return (
        <Page
            title='Publication'
        >
            <CardRessourceIndex ressource={publicationData} />
        </Page>
    );
}



export async function getStaticPaths() {
    const paths = getAllRessourcesIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const publicationData = getRessourceData(params.id)
    return {
        props: {
            publicationData
        }
    }
}