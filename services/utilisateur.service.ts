import axios from "axios";
import { IUser } from "../interfaces/IUser";

export function getAllUtilisateurs() {
    return axios({
        url: 'http://localhost:3001/api/utilisateur',
        method: 'get'
    })
}

export function deleteUtilisateur(idUtilisateur: number) {
    return axios({
        url: `http://localhost:3001/api/utilisateur/${idUtilisateur}`,
        method: 'delete'
    })
}


export function getUtilisateurById(idUtilisateur: number) {
    return axios({
        url: `http://localhost:3001/api/utilisateur/${idUtilisateur}`,
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