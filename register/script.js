import { toastify } from "../global/toastity.js"
import { registerDataBase } from "../global/userGlobal.js"

const registerbut = document.querySelector("button")
registerbut.addEventListener("click",()=>{
    registerForm()
})

function registerForm(){
    const name = document.querySelector("#name").value
    const email = document.querySelector("#email").value
    const pass = document.querySelector("#senha").value
    const emailConfirm = document.querySelector("#emailonfirm").value
    const passConfirm = document.querySelector("#senhaonfirm").value
    let erro;
    let msg;

    if(!name || !email || !emailConfirm || !pass || !passConfirm){
        erro = "todos"
        msg = "Faltam campos para a inserção"
        toastify(erro, msg)
    }else if(!name){
        erro = "nome"
        msg = "Inserir nome"
        toastify(erro, msg)
    }else if(email == ""){
        erro = "email"
        msg = "Inserir email"
        toastify(erro, msg)
    }else if(email == ""){
        erro = "email"
        msg = "Inserir confirmação de email"
        toastify(erro, msg)
    }else if(email != emailConfirm){
        erro = "email"
        msg = "Confirmação de email não coincide com o email"
        toastify(erro, msg)
    }else if(pass == ""){
        erro = "senha"
        msg = "Inserir senha"
        toastify(erro, msg)
    }else if(passConfirm == ""){
        erro = "senha"
        msg = "Inserir confirmação de senha"
        toastify(erro, msg)
    }else if(pass != passConfirm){
        erro = "senha"
        msg = "Confirmação de senha não coincide com o email"
        toastify(erro, msg)
    }else{
        registerDataBase(name, pass, email)
    }

} 


