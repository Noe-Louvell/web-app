export interface IUser {
    _id?: number,
    nom: string,
    prenom: string,
    mail: string,
    mot_de_passe: string,
    date_creation?: string,
    ressources?: [],
    compte_actif?: boolean,
    image?: string | ArrayBuffer,
    abonement?: number,
    abonnés?: number,
}

export interface IAuteur {
    nom: string,
    prenom: string,
}

