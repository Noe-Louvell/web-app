import * as React from 'react';
import { FunctionComponent } from 'react';
import "antd/dist/antd.css";
import { List } from 'antd';
import { IRessource } from '../../../interfaces/IRessource';
import CardRessourceIndex from '../../Ressource/CardRessource/CardRessource';
import Layout from '../Layout/Layout';
import Head from 'next/head'

interface IPropsPage {
    title: string;
    siderContent?: React.ReactNode
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
