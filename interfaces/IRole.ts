import { IUser } from "./IUser";

export interface IRole {
    id?: number,
    nom: string,
    trigramme: string,
    userentities: IUser[]
}