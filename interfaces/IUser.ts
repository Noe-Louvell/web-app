import { IRole } from "./IRole";

export interface IUser {
    id?: number,
    nom: string,
    prenom: string,
    mail: string,
    mot_de_passe?: string,
    date_creation?: string,
    compte_actif?: boolean,
    pseudo?:string,
    avatar: string | ArrayBuffer,
    ressources?: [],
    roleentities: IRole,
    abonement?: number,
    abonnés?: number,
}