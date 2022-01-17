import axios from "axios";
import { IUser } from "../interfaces/IUser";

export function getAllUtilisateurs() {
    return axios({
        url: 'http://localhost:3001/api/utilisateur',
        method: 'get'
    })
}

export function createUtilisateur(newUtilisateur: IUser) {
    return axios({
        url: 'http://localhost:3001/api/utilisateur',
        method: 'post',
        data:newUtilisateur
    })
}