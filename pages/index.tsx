import * as React from 'react';
import Login from '../Components/generic/Login/Login';
import { getAllUtilisateurs } from '../services/utilisateur.service';

export default function Home({utilisateurData}) {
    console.log(utilisateurData)
    return (
        <Login />
    );
}

export async function getStaticProps({ params }) {
    const res = await  getAllUtilisateurs();
    const utilisateurData = await res.data; 
    return {
        props: {
            utilisateurData
        }
    }
}