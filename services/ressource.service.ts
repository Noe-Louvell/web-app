import axios from "axios";
import { IRessource } from "../interfaces/IRessource";

export function getAllRessources() {
    return axios({
        url: 'http://localhost:3000/api/ressource',
        method: 'get'
    })
}

export function deleteRessource(idRessource: string) {
    return axios({
        url: `http://localhost:3000/api/ressource/${idRessource}`,
        method: 'delete'
    })
}


export function getRessourceById(idRessource: string) {
    return axios({
        url: `http://localhost:3000/api/ressource/${idRessource}`,
        method: 'get'
    })
}

export function getRessourceByIdUser(idUser: string) {
    return axios({
        url: `http://localhost:3000/api/utilisateur/${idUser}/ressources/`,
        method: 'get'
    })
}

export function createRessource(newRessource: IRessource) {
    return axios({
        url: 'http://localhost:3000/api/ressource',
        method: 'post',
        data:newRessource
    })
}

export function reactRessource(idRessource: string) {
    return axios({
        url: `http://localhost:3000/api/ressource/${idRessource}/reaction`,
        method: 'patch',
    })
}

