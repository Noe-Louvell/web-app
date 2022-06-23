// Bibliothèques externes
import { notification } from 'antd';
import router from 'next/router';
import jwt_decode from "jwt-decode";
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie'
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
    getUserSession: () => { },
    getConnect: () => { },
});

export const ContextAppProvider: React.FunctionComponent = ({ children }) => {
    const getSessionCookie: any = () => {
        const sessionCookie = Cookies.get("sessionUser");

        if (sessionCookie === undefined) {
            return null;
        } else {
            return JSON.parse(sessionCookie);
        }
    };

    const setSessionCookie = (session: any): void => {
        Cookies.remove("session");
        Cookies.set("session", session, { expires: 14 });
    };

    const setSessionUserCookie = (user: IUser): void => {
        Cookies.remove("sessionUser");
        Cookies.set("sessionUser", JSON.stringify(user), { expires: 14 });
    };

    const [appLoading, setAppLoading] = useState<boolean>(false);
    const [userSession, setUserSession] = useState<IUser>(getSessionCookie);



    const getConnect = async (values: IValueConnect) => {
        setAppLoading(true);
        await connexion(values).then(async (res) => {
            if (res.status == 200) {
                const decoded: ITokenDecoded = jwt_decode(res.data.token);
                await getUserSession(decoded.utilisateur._id)
                setSessionCookie(decoded.iat);
                router.push("/");
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
                let utilisateur = res.data;
                console.log(utilisateur);
                setSessionUserCookie(utilisateur);
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

