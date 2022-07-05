import * as React from 'react';
import { FunctionComponent } from 'react';
import { List } from 'antd';
import { IRessource } from '../../../interfaces/IRessource';
import CardRessourceIndex from '../CardRessource/CardRessource';
import { IUser } from '../../../interfaces/IUser';

interface IPropsCardRessource {
    ressources: IRessource[];
    currentUser?: IUser
}


const ListRessources: FunctionComponent<IPropsCardRessource> = ({ ressources, currentUser }) => {
    return (
            <List
                itemLayout="horizontal"
                dataSource={ressources}
                renderItem={item => (
                    <CardRessourceIndex ressource={item} user={currentUser} />
                )}
            />
    );
};


export default ListRessources;
