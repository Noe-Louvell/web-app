import { IUser } from "../interfaces/IUser";

export const User1: IUser = {
    mail: 'tohmas.back@viacesi.fr',
    mot_de_passe: 'root',
    nom: 'Back',
    prenom: 'Thomas',
    // description: 'Chômeur',
    image: 'https://joeschmoe.io/api/v1/random',
    abonement: 120,
    abonnés: 530,
    ressources: [],
    compte_actif: false,
    pseudo:'a'
};

export const User2: IUser = {
    mail: 'tohmas.back@viacesi.fr',
    mot_de_passe: 'root',
    nom: 'Back',
    prenom: 'Thomas',
    // description: 'Chômeur',
    image: 'https://joeschmoe.io/api/v1/random',
    abonement: 120,
    abonnés: 530,
    ressources: [],
    compte_actif: false,
    pseudo:'a'
};

export const UserList: IUser[] = [
    User1,
    User2,
    User1,
    User2,
    User1,
    User2,
    User1,
    User2,
    User1,
    User2,
];