
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
        url: 'https://projetcubesapi.herokuapp.com/api/commentaire',
        method: 'get',
    })
}

export function deleteComment(idRessource: number, token) {
    return axios({
        url: `https://projetcubesapi.herokuapp.com/api/commentaire/${idRessource}`,
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    
}
export function switchComment(idRessource: number, token) {
    return axios({
        url: `https://projetcubesapi.herokuapp.com/api/commentaire/${idRessource}/switch`,
        method: 'patch',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    
}

export function getCommentById(idComment: number) {
    return axios({
        url: `https://projetcubesapi.herokuapp.com/api/commentaire/${idComment}`,
        method: 'get'
    })
}

export function getCommentByIdRessource(idRessource: number) {
    return axios({
        url: `https://projetcubesapi.herokuapp.com/api/commentaire/${idRessource}`,
        method: 'get'
    })
}
export function updateComment(idComment: number, newValue: ICommentaire) {
    return axios({
        url: `https://projetcubesapi.herokuapp.com/api/commentaire/${idComment}`,
        method: 'PATCH',
        data:newValue
    })
}

export function createComment(newComment: newComment, token: string) {
    return axios({
        url: 'https://projetcubesapi.herokuapp.com/api/commentaire',
        method: 'post',
        data:newComment,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
