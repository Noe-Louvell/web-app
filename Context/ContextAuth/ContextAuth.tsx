// Bibliothèques externes
import { notification } from 'antd';
import router from 'next/router';
import jwt_decode from "jwt-decode";
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useCookies } from "react-cookie";
// Composants locaux
// Services

// Models
import { IUser } from '../../interfaces/IUser';
import { connexion, getUtilisateurById } from '../../services/utilisateur.service';
import { IContextApp, ITokenDecoded, IValueConnect } from './InterfaceAuth';

export const ContextApp = createContext<IContextApp>({
    appLoading: false,
    setAppLoading: () => { },

    userSession: null,
    setUserSession: () => { },
    removeUserSession: () => { },

    tokenSession: null,
    setTokenSession: () => { },

    getConnect: () => { },
});

export const ContextAppProvider: React.FunctionComponent = ({ children }) => {
    const [userSession, setUserSession, removeUserSession] = useCookies(["user"]);
    const [tokenSession, setTokenSession] = useCookies(["token"]);

    const [appLoading, setAppLoading] = useState<boolean>(false);


    const getConnect = async (values: IValueConnect) => {
        setAppLoading(true);
        await connexion(values).then(async (res) => {
            if (res.status == 200) {
                setUserSession("user", res.data.utilisateur, {
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

            getConnect,
        }}>
            {children}
        </ContextApp.Provider>
    );
}
export default ContextAppProvider;

