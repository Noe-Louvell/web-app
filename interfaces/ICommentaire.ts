import { IRessource } from "./IRessource";
import { IUser } from "./IUser";

export interface ICommentaire {
    _id?: number,
    description:string,
    date_creation: string,
    validation: boolean,
    utilisateur: IUser,
    ressource: IRessource
}