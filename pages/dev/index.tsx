import * as React from 'react';
import Layout from '../../Components/generic/Layout/Layout';
import { MenuSider } from '../../Components/generic/MenuSider/MenuSider';
import Page from '../../Components/generic/Page/Page';
import FormulaireRessource from '../../Components/Ressource/FormlaireRessource/FormulaireRessource';

export default function Developement() {
    return (
        <Page
            title='Publications'
        >
            <FormulaireRessource type='create' />
        </Page>
    );
}