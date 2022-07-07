// Citoyen non connecté
export const isNCY = (id) => {
    if (id == '62c589c3a04b6b5dedcc491b'){
        return true;
    } else {
        return false;
    }
}
// Citoyen connecté
export const isCYN = (id) => {
    if (id == '62c58a42a04b6b5dedcc491e'){
        return true;
    } else {
        return false;
    }
}
// Modérateur
export const isMOD = (id) => {
    if (id == '62c58a4fa04b6b5dedcc4921'){
        return true;
    } else {
        return false;
    }
}
// Administrateur
export const isADM = (id) => {
    if (id == '62c58a5ba04b6b5dedcc4924'){
        return true;
    } else {
        return false;
    }
}
// Super Administrateur
export const isSAM = (id) => {
    if (id == '62c58a66a04b6b5dedcc4927'){
        return true;
    } else {
        return false;
    }
}