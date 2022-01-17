import { IRessource } from "../interfaces/IRessource";
import { ListCommentaire } from "./commentaire.mock";
import { User1, User2 } from "./user.mock";

export const Ressource1: IRessource = {
    id:'1',
    description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    auteur: User1,
    date_creation: '17/50/2000',
    image: 'https://picsum.photos/1200/1200',
    like:5478,
    partage: 200,
    commentaires: ListCommentaire
};

export const Ressource2: IRessource = {
    id:'2',
    auteur: User1,
    date_creation: '17/50/2000',
    image: 'https://picsum.photos/1200/1200',
    like:25645,
    partage: 7521,
    commentaires: ListCommentaire
};

export const Ressource3: IRessource = {
    id:'3',
    description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    auteur: User2,
    date_creation: '17/50/2000',
    like:20,
    partage: 1,
    commentaires: ListCommentaire
};

export const RessourceList : IRessource[] = [
    Ressource1,
    Ressource2,
    Ressource3,
]