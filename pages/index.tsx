import * as React from 'react';
import Page from '../Components/generic/Page/Page';
import FormulaireRessource from '../Components/Ressource/FormlaireRessource/FormulaireRessource';
import ListRessources from '../Components/Ressource/ListRessources/ListRessources';
import { useContext } from "react";
import { getAllRessources } from '../services/ressource.service';
import { ContextApp } from '../Context/ContextAuth/ContextAuth';

export default function Index({ resRessources = [] }) {
    // const { userSession } = useContext(ContextApp);
    return (
        <>
            <Page
                title='Accueil'
            >
                <ListRessources ressources={resRessources} />
            </Page>
        </>

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