// Bibliothèques externes
import { notification } from 'antd';
import router from 'next/router';
import jwt_decode from "jwt-decode";
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
// Composants locaux
// Services

// Models
import { IUser } from '../../interfaces/IUser';
import { connexion, deconnexion, getUtilisateurById } from '../../services/utilisateur.service';
import { IContextApp, ITokenDecoded, IValueConnect } from './InterfaceAuth';
import { useCookies } from 'react-cookie';

export const ContextApp = createContext<IContextApp>({
    appLoading: false,
    setAppLoading: () => { },

    userSession: null,
    setUserSession: () => { },
    removeUserSession: () => { },

    tokenSession: null,
    setTokenSession: () => { },
    removeTokenSession: () => { },

    getConnect: () => { },
    getDisconnect: () => { },
});

export const ContextAppProvider: React.FunctionComponent = ({ children }) => {
    const [userSession, setUserSession, removeUserSession] = useCookies(["utilisateur"]);
    const [tokenSession, setTokenSession, removeTokenSession] = useCookies(["token"]);

    const [appLoading, setAppLoading] = useState<boolean>(false);


    const getDisconnect = async (token) => {
        await deconnexion(tokenSession.token).then((res) => {
            if (res.status == 200) {
                router.push("/login");
            } else {
                notification.error({
                    message: 'Une erreur est survenue lors de la connexion',
                });
            }
        })
    }
    const getConnect = async (values: IValueConnect) => {
        setAppLoading(true);
        await connexion(values).then(async (res) => {
            if (res.status == 200) {
                setUserSession("utilisateur", res.data.utilisateur._id, {
                    path: "/"
                });
                setTokenSession("token", res.data.token, {
                    path: "/"
                });

                router.push("/");
            } else {
                notification.error({
                    message: 'Une erreur est survenue lors de la connexion',
                });
            }
        })
    };


    return (
        <ContextApp.Provider value={{
            appLoading,
            setAppLoading,

            userSession,
            setUserSession,
            removeUserSession,

            tokenSession,
            setTokenSession,
            removeTokenSession,

            getConnect,
            getDisconnect
        }}>
            {children}
        </ContextApp.Provider>
    );
}
export default ContextAppProvider;

