
import axios from "axios";
import { IRessource } from "../interfaces/IRessource";

export function getAllRessources() {
    return axios({
        url: 'http://localhost:3000/api/ressource',
        method: 'get'
    })
}

export function deleteRessource(idRessource: string , token: string) {
    return axios({
        url: `http://localhost:3000/api/ressource/${idRessource}`,
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`,
        },
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

export function createRessource(newRessource: IRessource, token: string) {
    return axios({
        url: 'http://localhost:3000/api/ressource',
        method: 'post',
        data: newRessource,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

// export function reactRessource(idRessource: string) {
//     return axios({
//         url: `http://localhost:3000/api/ressource/${idRessource}/reaction`,
//         method: 'patch',
//     })
// }

