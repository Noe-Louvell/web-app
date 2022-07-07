
import axios from "axios";
import { ICommentaire } from "../interfaces/ICommentaire";

interface newComment{
    description:string,
    validation: boolean,
    utilisateur: string,
    ressource: string
}

export function getAllComments() {
    return axios({
        url: 'http://localhost:3000/api/commentaire',
        method: 'get',
    })
}

export function deleteComment(idRessource: number, token) {
    return axios({
        url: `http://localhost:3000/api/commentaire/${idRessource}`,
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    
}
export function switchComment(idRessource: number, token) {
    return axios({
        url: `http://localhost:3000/api/commentaire/${idRessource}/switch`,
        method: 'patch',
        headers: {
            Authorization: `Bearer ${token}`,
        },
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

export function createComment(newComment: newComment, token: string) {
    return axios({
        url: 'http://localhost:3000/api/commentaire',
        method: 'post',
        data:newComment,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
