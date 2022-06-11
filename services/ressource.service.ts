import axios from "axios";
import { IRessource } from "../interfaces/IRessource";

export function getAllRessources() {
    return axios({
        url: 'http://localhost:3001/api/ressource',
        method: 'get'
    })
}

export function deleteRessource(idUtilisateur: number) {
    return axios({
        url: `http://localhost:3001/api/ressource/${idUtilisateur}`,
        method: 'delete'
    })
}


export function getRessourceById(idUtilisateur: number) {
    return axios({
        url: `http://localhost:3001/api/ressource/${idUtilisateur}`,
        method: 'get'
    })
}

export function getRessourceByIdUser(idUtilisateur: number) {
    return axios({
        url: `http://localhost:3001/api/utilisateur/${idUtilisateur}/ressources/`,
        method: 'get'
    })
}

export function createRessource(newRessource: IRessource) {
    return axios({
        url: 'http://localhost:3001/api/ressource',
        method: 'post',
        data:newRessource
    })
}