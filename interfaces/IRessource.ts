import { ICommentaire } from "./ICommentaire";
import { IUser } from "./IUser";

export interface IRessource {
    id:string,
    description?: string,
    auteur: IUser,
    commentaires?: ICommentaire[];
    date_creation: string,
    image?: string,
    like: number,
    partage?: number,
}