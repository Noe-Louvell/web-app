// Bibliothèques externes
import { notification } from 'antd';
import router from 'next/router';
import jwt_decode from "jwt-decode";
import React, { createContext, useState, useEffect } from 'react';
// Composants locaux
// Services

// Models
import { IUser } from '../../interfaces/IUser';
import { connexion, getUtilisateurById } from '../../services/utilisateur.service';
import { IContextApp, ITokenDecoded, IValueConnect } from './InterfaceApp';

export const ContextApp = createContext<IContextApp>({
    appLoading: false,
    setAppLoading: () => { },
    userSession: {} as IUser,
    setUserSession: () => { },
    getUserSession: () => { },
    getConnect:() => { },

});

export const ContextAppProvider: React.FunctionComponent = ({ children }) => {
    const [appLoading, setAppLoading] = useState<boolean>(false);
    const [userSession, setUserSession] = useState<IUser>({} as IUser)

    const getConnect = async (values: IValueConnect) => {
        console.log(values)
        setAppLoading(true);
        await connexion(values).then(async (res) => {
            if (res.status == 200) {
                const decoded: ITokenDecoded = jwt_decode(res.data.token);
                await getUserSession(decoded.utilisateur._id)
                sessionStorage.setItem('token', res.data.token);
            } else {
                notification.error({
                    message: 'Une erreur est survenue lors de la connexion',
                });
            }
        })
    };

    const getUserSession = async (idUser: string) => {
        setAppLoading(true);
        await getUtilisateurById(idUser).then(async (res) => {
            if (res.status == 200) {
                let utilisateur = res.data
                await setUserSession(utilisateur);
            } else {
                notification.error({
                    message: 'Une erreur est survenue',
                });
            }
            setAppLoading(false);
        })
    }

    return (
            <ContextApp.Provider value={{
                appLoading,
                setAppLoading,
                userSession,
                setUserSession,
                getUserSession,
                getConnect,
            }}>
                {children}
            </ContextApp.Provider>
    );
}
export default ContextAppProvider;

