import { IUser } from "../../interfaces/IUser";

export interface IValueConnect {
    mail: string,
    mot_de_passe: string
}

export interface ITokenDecoded {
    token: string,
    utilisateur: IUser
}

export interface IContextApp{
    appLoading: boolean,
    setAppLoading: (appLoading: boolean) => void,

    userSession: any,
    setUserSession: any,
    removeUserSession: any,

    tokenSession: any,
    setTokenSession: any,
    removeTokenSession:any,

    getConnect: (value: IValueConnect)=> void
    getDisconnect: (value: IValueConnect)=> void
}
