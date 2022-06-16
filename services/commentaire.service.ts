import axios from "axios";
import { ICommentaire } from "../interfaces/ICommentaire";
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

export function getCommentById(idComment: number) {
    return axios({
        url: `http://localhost:3000/api/commentaire/${idComment}`,
        method: 'get'
    })
}

export function getCommentByIdRessource(idRessource: number) {
    return axios({
        url: `http://localhost:3000/api/commentaire/${idRessource}`,
        method: 'get'
    })
}
export function updateComment(idComment: number, newValue: ICommentaire) {
    return axios({
        url: `http://localhost:3000/api/commentaire/${idComment}`,
        method: 'PATCH',
        data:newValue
    })
}
export function createComment(newComment: string) {
    return axios({
        url: 'http://localhost:3000/api/commentaire',
        method: 'post',
        data:newComment
    })
}
