export interface IUser {
    mail_uti: string,
    mot_de_passe_uti: string,
    nom_uti: string,
    prenom_uti: string,
    description?: string,
    avatar?: string,
    abonement?: number,
    abonnés?: number,
    publication?: number,
    compte_actif_uti?: boolean,
    pseudo_uti: string
}

export interface IAuteur {
    nom: string,
    prenom: string,
}

