import { IUser } from "./IUser";

export interface ICommentaire {
    auteur: IUser,
    content: string;
    date_creation: string,
}