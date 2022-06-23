import * as React from 'react';
import Page from '../Components/generic/Page/Page';
import FormulaireRessource from '../Components/Ressource/FormlaireRessource/FormulaireRessource';
import ListRessources from '../Components/Ressource/ListRessources/ListRessources';
import { RessourceList } from '../mocks/ressource.mock';
import { getUtilisateurById } from '../services/utilisateur.service';
import { useContext, useEffect } from "react";
import { notification } from 'antd';
import { getAllRessources, getRessourceById, getRessourceByIdUser } from '../services/ressource.service';
import { IUser } from '../interfaces/IUser';
import { ContextApp } from '../Context/ContextAuth/ContextAuth';

export default function Index({ resRessources }) {
    const { userSession } = useContext(ContextApp);
    return (
        <Page
            title='Accueil'
        >
            <ListRessources ressources={resRessources} />
            <FormulaireRessource type='create' />
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