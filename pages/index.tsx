import * as React from 'react';
import Page from '../Components/generic/Page/Page';
import FormulaireRessource from '../Components/Ressource/FormlaireRessource/FormulaireRessource';
import ListRessources from '../Components/Ressource/ListRessources/ListRessources';
import { useContext } from "react";
import { getAllRessources } from '../services/ressource.service';
import { ContextApp } from '../Context/ContextAuth/ContextAuth';

export default function Index({ resRessources = [] }) {
    const { userSession } = useContext(ContextApp);
    return (
        <>
            <Page
                title='Accueil'
            >
                <ListRessources ressources={resRessources} />
                <FormulaireRessource disable={Object.keys(userSession).length !== 0 ? false : false} type='create' />
            </Page>
        </>

    );
}



export async function getServerSideProps() {
    const res = await getAllRessources();
    const resRessources = await res.data;
    return {
        props: {
            resRessources
        }
    }
}