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
    url: `http://localhost:3000/api/utilisateur/${idUtilisateur}`,
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
    url: `http://localhost:3000/api/utilisateur/${idUtilisateur}`,
    method: "PATCH",
    data: newValue,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getUtilisateurById(idUtilisateur: string, token) {
  return axios({
    url: `http://localhost:3000/api/utilisateur/${idUtilisateur}`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function followUser(idUtilisateur: string) {
  return axios({
    url: `/utilisateur/${idUtilisateur}/follow`,
    method: "patch",
  });
}

export function createUtilisateur(newUtilisateur: IUser) {
  return axios({
    url: "http://localhost:3000/api/inscription",
    method: "post",
    data: { newUtilisateur },
  });
}

export function connexion(newConnection: IConnect) {
  return axios({
    url: "http://localhost:3000/api/connexion",
    method: "post",
    data: newConnection,
  });
}
