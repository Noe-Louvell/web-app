import axios from "../axiosinstance";
import { IUser } from "../interfaces/IUser";

interface IConnect {
    mail: string,
    mot_de_passe: string
}

export function getAllUtilisateurs() {
    return axios({
        url: '/utilisateur',
        method: 'get'
    })
}

export function deleteUtilisateur(idUtilisateur: string) {
    return axios({
        url: `/utilisateur/${idUtilisateur}`,
        method: 'delete'
    })
}

export function updateUtilisateur(idUtilisateur: string, newValue: IUser) {
    return axios({
        url: `/${idUtilisateur}`,
        method: 'PATCH',
        data:newValue
    })
}

export function getUtilisateurById(idUtilisateur: string) {
    return axios({
        url: `/${idUtilisateur}`,
        method: 'get'
    })
}
export function followUser(idUtilisateur: string) {
    return axios({
        url: `/utilisateur/${idUtilisateur}/follow`,
        method: 'patch'
    })
}

export function createUtilisateur(image :string | ArrayBuffer, newUtilisateur: IUser) {
    return axios({
        url: '/utilisateur',
        method: 'post',
        data: {image, newUtilisateur}
    })
}

export function connexion(newConnection : IConnect) {
    return axios({
        url: '/connexion',
        method: 'post',
        data:newConnection
    })
}
