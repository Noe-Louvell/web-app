import { ICommentaire } from "../interfaces/ICommentaire";
import { Ressource1 } from "./ressource.mock";
import { User1, User2 } from "./user.mock";

export const Commentaire1: ICommentaire = {
    utilisateur: User1,
    date_creation: '17/50/2000',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur adipiscing elit duis tristique sollicitudin nibh. Aliquam sem fringilla ut morbi tincidunt augue. Vivamus at augue eget arcu dictum varius duis at.',
    ressource: Ressource1,
    validation: true
};

export const Commentaire2: ICommentaire = {
    utilisateur: User1,
    date_creation: '17/50/2000',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur adipiscing elit duis tristique sollicitudin nibh. Aliquam sem fringilla ut morbi tincidunt augue. Vivamus at augue eget arcu dictum varius duis at.',
    ressource: Ressource1,
    validation: true
};

export const Commentaire3: ICommentaire = {
    utilisateur: User1,
    date_creation: '17/50/2000',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur adipiscing elit duis tristique sollicitudin nibh. Aliquam sem fringilla ut morbi tincidunt augue. Vivamus at augue eget arcu dictum varius duis at.',
    ressource: Ressource1,
    validation: true
};


export const ListCommentaire: ICommentaire[] = [
    Commentaire1,
    Commentaire2,
    Commentaire3,
    Commentaire1,
    Commentaire2,
    Commentaire3
]