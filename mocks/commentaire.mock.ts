import { ICommentaire } from "../interfaces/ICommentaire";
import { User1, User2 } from "./user.mock";

export const Commentaire1: ICommentaire = {
    auteur: User1,
    date_creation: '17/50/2000',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur adipiscing elit duis tristique sollicitudin nibh. Aliquam sem fringilla ut morbi tincidunt augue. Vivamus at augue eget arcu dictum varius duis at.'
};

export const Commentaire2: ICommentaire = {
    auteur: User2,
    date_creation: '17/50/2000',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
};

export const Commentaire3: ICommentaire = {
    auteur: User1,
    date_creation: '17/50/2000',
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
};


export const ListCommentaire: ICommentaire[] = [
    Commentaire1,
    Commentaire2,
    Commentaire3,
    Commentaire1,
    Commentaire2,
    Commentaire3
]