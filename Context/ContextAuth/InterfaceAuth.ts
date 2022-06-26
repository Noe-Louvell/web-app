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

    userSession: IUser,
    setUserSession: (userSession: IUser) => void,
    getUserSession: (idUser: string)=> void

    tokenSession: string,
    setTokenSession: (tokenSession: string) => void,

    getConnect: (value: IValueConnect)=> void
}
