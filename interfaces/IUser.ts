export interface IUser {
    mail : string,
    mot_de_passe : string,
    nom : string,
    prenom : string,
    description?: string,
    avatar?: string,
    abonement?: number,
    abonnés?: number,
    publication?: number,
    compte_actif?: boolean,
    pseudo?: string,
    date_creation? : Date
}

export interface IAuteur {
    nom: string,
    prenom: string,
}

