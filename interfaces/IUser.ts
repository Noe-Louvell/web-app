import { IRole } from "./IRole";

export interface IUser {
    _id?: string,
    nom: string,
    prenom: string,
    pseudo: string,
    mail: string,
    mot_de_passe?: string,
    date_creation?: string,
    compte_actif?: boolean,
    image: ArrayBuffer,
    ressources?: [],
    owner?: IRole,
    nbdabonnement?: number,
    nbdabonne?: number,
}