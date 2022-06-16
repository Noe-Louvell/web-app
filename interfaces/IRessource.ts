import { ICommentaire } from "./ICommentaire";
import { IUser } from "./IUser";

export interface IRessource {
    _id?:string,
    texte : string,
    titre: string,
    image: string,
    date_creation?: string,
    utilisateur: IUser,
    commentaires?: ICommentaire[];
    like?: number,
}