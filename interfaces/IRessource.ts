import { ICommentaire } from "./ICommentaire";
import { IUser } from "./IUser";

export interface IRessource {
    id?:string,
    description?: string,
    nom:string,
    texte?: string,
    idAuteur: number,
    commentaires?: ICommentaire[];
    date_creation?: string,
    audio?:  string | ArrayBuffer,
    image?: string | ArrayBuffer,
    like: number,
    partage?: number,
}