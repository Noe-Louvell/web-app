import { CommentOutlined, ReadOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row, Space, Typography } from 'antd';
import * as React from 'react';
import { TableUser } from '../../Components/Administration/Utilisateurs/TableUser';
import Page from '../../Components/generic/Page/Page';
import { IUser } from '../../interfaces/IUser';
import { getAllUtilisateurs } from '../../services/utilisateur.service';
import useAuth from '../../Utils/getAuth';

export default function AdminUtilisateur({utilisateurData, errorCode}) {
    if(errorCode){
        return <>Test</>
    }
    return (
        
        <Page
            title='Admin Utilisateur'
            siderContent={false}
        >
            <TableUser users={utilisateurData} />
        </Page>
    );
}

export async function getServerSideProps({res}) {
    const data = await  getAllUtilisateurs();
    const utilisateurData : IUser[] = await data.data; 
 
    return {
        props: {
            utilisateurData
        }
    }
}