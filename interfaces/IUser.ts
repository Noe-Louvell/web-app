import { IRole } from "./IRole";

export interface IUser {
    _id?: number,
    nom: string,
    prenom: string,
    pseudo: string,
    mail: string,
    mot_de_passe?: string,
    date_creation?: string,
    compte_actif?: boolean,
    image: string,
    ressources?: [],
    owner?: IRole,
    abonement?: number,
    abonnés?: number,
}