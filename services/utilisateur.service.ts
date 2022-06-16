import axios from "axios";
import { IUser } from "../interfaces/IUser";

interface IConnect {
    mail: string,
    mot_de_passe: string
}

export function getAllUtilisateurs() {
    return axios({
        url: 'http://localhost:3000/api/utilisateur',
        method: 'get'
    })
}

export function deleteUtilisateur(idUtilisateur: string) {
    return axios({
        url: `http://localhost:3000/api/utilisateur/${idUtilisateur}`,
        method: 'delete'
    })
}

export function updateUtilisateur(idUtilisateur: string, newValue: IUser) {
    return axios({
        url: `http://localhost:3000/api/utilisateur/${idUtilisateur}`,
        method: 'PATCH',
        data:newValue
    })
}

export function getUtilisateurById(idUtilisateur: string) {
    return axios({
        url: `http://localhost:3000/api/utilisateur/${idUtilisateur}`,
        method: 'get'
    })
}

export function createUtilisateur(image :string | ArrayBuffer, newUtilisateur: IUser) {
    return axios({
        url: 'http://localhost:3000/api/utilisateur',
        method: 'post',
        data: {image, newUtilisateur}
    })
}

export function connexion(newConnection : IConnect) {
    return axios({
        url: 'http://localhost:3000/api/connexion',
        method: 'post',
        data:newConnection
    })
}
