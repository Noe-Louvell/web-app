import axios from "axios";
import { IRessource } from "../interfaces/IRessource";

export function getAllComments() {
    return axios({
        url: 'http://localhost:3000/api/commentaire',
        method: 'get'
    })
}

export function deleteComment(idRessource: number) {
    return axios({
        url: `http://localhost:3000/api/commentaire/${idRessource}`,
        method: 'delete'
    })
}


export function getCommentByIdRessource(idRessource: number) {
    return axios({
        url: `http://localhost:3000/api/commentaire/${idRessource}`,
        method: 'get'
    })
}

export function createComment(newComment: string) {
    return axios({
        url: 'http://localhost:3000/api/commentaire',
        method: 'post',
        data:newComment
    })
}