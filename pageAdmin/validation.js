import { listPlayerInTimeModel } from "../global/player.js";
import { toastify } from "../global/toastity.js";

let erro, msg;

export function validationInsertTeam(team){
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

export function validationInsertPlayer(player){
    // if(player.shield == ""){
    //     erro = "senha"
    //     msg = "Inserir Escudo"
    //     toastify(erro, msg)
    // }else 
    if(player.name == ""){
        erro = "erro"
        msg = "Inserir NOME do jogador"
        toastify(erro, msg)
        return false;
    }else if(player.age == ""){
        erro = "erro"
        msg = "Inserir IDADE do jogador"
        toastify(erro, msg)
        return false;
    }else if(player.position == ""){
        erro = "erro"
        msg = "Inserir POSIÇÃO do jogador"
        toastify(erro, msg)
        return false;
    }else if(player.team == ""){
        erro = "erro"
        msg = "Inserir TEMA do jogador"
        toastify(erro, msg)
        return false;
    }else{
        return true;
    }
}

export async function validationCountPlayer(player){
    const dataBase = await listPlayerInTimeModel(player.team)
    if(dataBase.length > 12){
        erro = "erro"
        msg = "Time com a quantidade de jogadores completa"
        toastify(erro, msg)
        return false;
    }
    let count= 0;
    dataBase.forEach(item => {
        if(item.status == "holder"){
            count ++
        }
    });
    console.log(count)
    if(count > 5){
        erro = "erro"
        msg = "Time com a quantidade de titulares completa"
        toastify(erro, msg)
        return false;
    }else{
        return true
    }
  
}
