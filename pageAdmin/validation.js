import { toastify } from "../global/toastity.js";

let erro, msg;

export function validationInsertTeam(team){
    console.log(team)
    // if(team.shield == ""){
    //     erro = "senha"
    //     msg = "Inserir Escudo"
    //     toastify(erro, msg)
    // }else 
    if(team.tag == ""){
        erro = "erro"
        msg = "Inserir SIGLA do time"
        toastify(erro, msg)
        return false;
    }else if(team.tag.length > 3){
        erro = "erro"
        msg = "Inserir uma sigla menor"
        toastify(erro, msg)
        return false;
    }
    else if(team.name == ""){
        erro = "erro"
        msg = "Inserir NOME do time"
        toastify(erro, msg)
        return false;
    }else{
        return true;
    }
}
