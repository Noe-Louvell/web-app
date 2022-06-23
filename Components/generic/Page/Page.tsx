import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import "antd/dist/antd.css";
import { List, notification } from 'antd';
import { IRessource } from '../../../interfaces/IRessource';
import CardRessourceIndex from '../../Ressource/CardRessource/CardRessource';
import Layout from '../Layout/Layout';
import Head from 'next/head'
import { getUtilisateurById } from '../../../services/utilisateur.service';
import { IUser } from '../../../interfaces/IUser';

interface IPropsPage {
    title: string;
    siderContent?: boolean
}


const Page: FunctionComponent<IPropsPage> = ({ title, children, siderContent }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Layout siderContent={siderContent}>
                {children}
            </Layout>
        </>
    );
};


export default Page;
