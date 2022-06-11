import { ICommentaire } from "./ICommentaire";
import { IUser } from "./IUser";

export interface IRessource {
    id?:string,
    nom:string,
    description?: string,
    date_creation?: string,
    texte?: string,
    image?: string | ArrayBuffer,
    audio?:  string | ArrayBuffer,
    utilisateur: IUser,
    commentaires?: ICommentaire[];
    like?: number,
    partage?: number,
}