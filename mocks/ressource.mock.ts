import { IRessource } from "../interfaces/IRessource";
// import { [] } from "./commentaire.mock";
import { User1, User2 } from "./user.mock";

export const Ressource1: IRessource = {
    id:'1',
    utilisateur: User1,
    date_creation: '17/03/2022',
    texte: "Nouveau bar ouvert",
    titre:'Titre',
    image: 'https://picsum.photos/1200/1200',
    like:25645,
    // partage: 7521,
    commentaires: []
};

export const Ressource2: IRessource = {
    id:'2',
    utilisateur: User1,
    date_creation: '17/03/2022',
    texte: "Nouveau bar ouvert",
    titre:'Titre',
    image: 'https://picsum.photos/1200/1200',
    like:25645,
    // partage: 7521,
    commentaires: []
};

export const Ressource3: IRessource = {
    id:'3',
    utilisateur: User1,
    date_creation: '17/03/2022',
    texte: "Nouveau bar ouvert",
    titre:'Titre',
    image: 'https://picsum.photos/1200/1200',
    like:25645,
    // partage: 7521,
    commentaires: []
};

export const RessourceList : IRessource[] = [
    Ressource1,
    Ressource2,
    Ressource3,
]