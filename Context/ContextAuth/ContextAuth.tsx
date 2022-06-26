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
import { connexion, getUtilisateurById } from '../../services/utilisateur.service';
import { IContextApp, ITokenDecoded, IValueConnect } from './InterfaceAuth';
import instance from '../../axiosinstance';
import { setupAxiosInterceptors } from '../../Utils/getAuth';

export const ContextApp = createContext<IContextApp>({
    appLoading: false,
    setAppLoading: () => { },

    userSession: null,
    setUserSession: () => { },
    getUserSession: () => { },

    tokenSession: null,
    setTokenSession: () => { },

    getConnect: () => { },
});

export const ContextAppProvider: React.FunctionComponent = ({ children }) => {
    const getSessionUserCookie: any = () => {
        const sessionCookie = Cookies.get("sessionUser");
        if (sessionCookie === undefined) {
            return null;
        } else {
            return sessionCookie;
        }
    };

    const getSessionTokenCookie: any = () => {
        const sessionTokenCookie = Cookies.get("sessionToken");
        if (sessionTokenCookie === undefined) {
            return null;
        } else {
            return sessionTokenCookie;
        }
    };

    const setSessionTokenCookie = (sessionToken: any): void => {
        Cookies.remove("sessionToken");
        Cookies.set("sessionToken", sessionToken, { expires: 14 });
    };

    const setSessionUserCookie = (user: IUser): void => {
        Cookies.remove("sessionUser");
        Cookies.set("sessionUser", JSON.stringify(user), { expires: 14 });
    };

    const [appLoading, setAppLoading] = useState<boolean>(false);
    const [userSession, setUserSession] = useState<IUser>(getSessionUserCookie);
    const [tokenSession, setTokenSession] = useState<string>(getSessionTokenCookie);


    const getConnect = async (values: IValueConnect) => {
        setAppLoading(true);
        await connexion(values).then(async (res) => {
            if (res.status == 200) {
                await setSessionUserCookie(res.data.utilisateur);
                await setSessionTokenCookie(res.data.token);
                await setupAxiosInterceptors(res.data.token);
                // router.push("/administration/utilisateurs");
            } else {
                notification.error({
                    message: 'Une erreur est survenue lors de la connexion',
                });
            }
        })
    };
    if(Cookies.get("sessionToken") !== undefined){
        
    }
    const getUserSession = async (idUser: string) => {
        setAppLoading(true);
        await getUtilisateurById(idUser).then(async (res) => {
            if (res.status == 200) {
                let utilisateur = res.data;
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

            tokenSession, 
            setTokenSession,

            getConnect,
        }}>
            {children}
        </ContextApp.Provider>
    );
}
export default ContextAppProvider;

