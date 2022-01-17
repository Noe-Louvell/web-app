import * as React from 'react';
import { FunctionComponent } from 'react';
import { List } from 'antd';
import { IRessource } from '../../../interfaces/IRessource';
import CardRessourceIndex from '../CardRessource/CardRessource';

interface IPropsCardRessource {
    ressources: IRessource[];
}


const ListRessources: FunctionComponent<IPropsCardRessource> = ({ ressources }) => {
    return (
            <List
                itemLayout="horizontal"
                dataSource={ressources}
                renderItem={item => (
                    <CardRessourceIndex ressource={item} />
                )}
            />
    );
};


export default ListRessources;
