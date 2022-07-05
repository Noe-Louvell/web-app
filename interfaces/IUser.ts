import { IRessource } from "./IRessource";
import { IRole } from "./IRole";

export interface IUser {
    _id?: string,
    nom: string,
    prenom: string,
    pseudo: string,
    mail: string,
    description: string,
    mot_de_passe?: string,
    date_creation?: string,
    compte_actif?: boolean,
    image: ArrayBuffer,
    ressources?: IRessource[],
    owner?: IRole,
    nbdabonnement?: number,
    nbdabonne?: number,
}