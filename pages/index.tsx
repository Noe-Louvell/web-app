import * as React from 'react';
import Page from '../Components/generic/Page/Page';
import FormulaireRessource from '../Components/Ressource/FormlaireRessource/FormulaireRessource';
import ListRessources from '../Components/Ressource/ListRessources/ListRessources';
import { RessourceList } from '../mocks/ressource.mock';
import { getUtilisateurById } from '../services/utilisateur.service';
import { useEffect } from "react";
import { notification } from 'antd';
import { getAllRessources } from '../services/ressource.service';


export default function Publications(ressourcesData) {
    console.log(ressourcesData);
    const getUser = (async () => {
        const idUser = sessionStorage.getItem('idUser');

        await getUtilisateurById(idUser).then(async (res) => {
            if (res.status == 200) {
                const utilisateurData = res.data;
                console.log(utilisateurData[0]);
            } else {
                notification.error({
                    message: 'Une erreur est survenue lors de la récupération de votre compte',
                });
            }
        })
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