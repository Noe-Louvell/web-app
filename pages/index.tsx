import * as React from 'react';
import Page from '../Components/generic/Page/Page';
import FormulaireRessource from '../Components/Ressource/FormlaireRessource/FormulaireRessource';
import ListRessources from '../Components/Ressource/ListRessources/ListRessources';
import { RessourceList } from '../mocks/ressource.mock';
import { getUtilisateurById } from '../services/utilisateur.service';
import { useEffect } from "react";
import { notification } from 'antd';
import { getAllRessources, getRessourceById, getRessourceByIdUser } from '../services/ressource.service';
import { IUser } from '../interfaces/IUser';


export default function Publications(ressourcesData) {
    console.log(ressourcesData)
    const getUser = (async () => {
        const user : IUser = await JSON.parse(sessionStorage.getItem('user'));
    });

    useEffect(() => {
        getUser();
    }, [])


    return (
        <Page
            title='Acceuil'
        >
            <ListRessources ressources={RessourceList} />
            <FormulaireRessource type='create' />
        </Page>
    );
}

export async function getStaticProps({ params }) {
    const res = await  getAllRessources();
    const ressourcesData = await res.data; 
    return {
        props: {
            ressourcesData
        }
    }
}