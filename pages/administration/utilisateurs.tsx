import { CommentOutlined, ReadOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row, Space, Typography } from 'antd';
import * as React from 'react';
import { TableUser } from '../../Components/Administration/Utilisateurs/TableUser';
import Page from '../../Components/generic/Page/Page';
import { getAllUtilisateurs } from '../../services/utilisateur.service';

export default function AdminUtilisateur({utilisateurData}) {
    return (
        <Page
            title='Admin Utilisateur'
            siderContent={false}
        >
            <TableUser users={utilisateurData} />
        </Page>
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