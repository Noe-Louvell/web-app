import { IUser } from "../interfaces/IUser";
import axios from "axios";

interface IConnect {
  mail: string;
  mot_de_passe: string;
}
export async function getAllUtilisateurs() {
  return axios({
    url: "/utilisateur",
    method: "get",
  });
}

export function deleteUtilisateur(idUtilisateur: string, token: string) {
  return axios({
    url: `https://projetcubesapi.herokuapp.com/api/utilisateur/${idUtilisateur}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updateUtilisateur(
  idUtilisateur: string,
  newValue: IUser,
  token
) {
  return axios({
    url: `https://projetcubesapi.herokuapp.com/api/utilisateur/${idUtilisateur}`,
    method: "PATCH",
    data: newValue,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getUtilisateurById(idUtilisateur: string, token) {
  return axios({
    url: `https://projetcubesapi.herokuapp.com/api/utilisateur/${idUtilisateur}`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function followUser(idUtilisateur: string, token: string) {
  return axios({
    url: `https://projetcubesapi.herokuapp.com/api/utilisateur/follow/${idUtilisateur}`,
    method: "patch",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function createUtilisateur(newUtilisateur: IUser) {
  return axios({
    url: "https://projetcubesapi.herokuapp.com/api/inscription",
    method: "patch",
    data: { newUtilisateur },
  });
}

export function connexion(newConnection: IConnect) {
  return axios({
    url: "https://projetcubesapi.herokuapp.com/api/connexion",
    method: "post",
    data: newConnection,
  });
}
export function deconnexion(token) {
  return axios({
    url: "https://projetcubesapi.herokuapp.com/api/deconnexion",
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function getUtilisateurAbonnement(token) {
  return axios({
    url: `https://projetcubesapi.herokuapp.com/api/utilisateur/abonnement`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function getUtilisateurAbonne(token) {
  return axios({
    url: `https://projetcubesapi.herokuapp.com/api/utilisateur/abonne`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function deleteAccount(token) {
  return axios({
    url: `https://projetcubesapi.herokuapp.com/api/utilisateur/delete`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function switchUser(utilisateurId: number, token) {
  return axios({
    url: `https://projetcubesapi.herokuapp.com/api/utilisateur/${utilisateurId}/switch`,
    method: 'patch',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

}