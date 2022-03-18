import Title from 'antd/lib/typography/Title';
import * as React from 'react';
import Page from '../Components/generic/Page/Page';
import ListRessources from '../Components/Ressource/ListRessources/ListRessources';
import { RessourceList } from '../mocks/ressource.mock';

export default function Publications() {
    return (
        <Page
            title='Publications'
        >
            <ListRessources ressources={RessourceList} />
        </Page>
    );
}



export function getAllRessourcesIds() {

    return RessourceList.map(ressource => {
        return {
            params: {
                id: ressource.id
            }
        }
    })
}

export function getRessourceData(id) {
    return RessourceList.find(ressource => ressource.id === id);
}

