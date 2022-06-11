import { IRessource } from "./IRessource";
import { IUser } from "./IUser";

export interface ICommentaire {
    id?: number,
    description:string,
    date_creation: string,
    validation: boolean,
    robot: boolean,
    auteur: IUser,
    ressource: IRessource
}