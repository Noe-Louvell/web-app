export interface IUser {
    mail: string,
    mot_de_passe: string,
    nom: string,
    prenom: string,
    description?: string,
    avatar?: Blob,
    abonement?: number,
    abonnés?: number,
    publication?: number,
    compte_actif?: boolean,
    pseudo: string
}

export interface IAuteur {
    nom: string,
    prenom: string,
}

