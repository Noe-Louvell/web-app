import { ICommentaire } from "./ICommentaire";
import { IUser } from "./IUser";

export interface IRessource {
    id?:string,
    texte : string,
    titre: string,
    image: Buffer,
    date_creation?: string,
    utilisateur: IUser,
    commentaires?: ICommentaire[];
    like?: number,
}