import { toastify } from "../global/toastity.js"
import { login } from "../global/userGlobal.js"

const registerform = document.querySelector("form")
registerform.addEventListener("submit",(event)=>{
    event.preventDefault()
    registerForm()
})

async function registerForm(){
    const email = document.querySelector("#name").value
    const pass = document.querySelector("#pass").value
    let erro;
    let msg;

    if(!email || !pass ){
        erro = "todos"
        msg = "Inserir dados nos dois campos"
        toastify(erro, msg)
    }else if(email == ""){
        erro = "email"
        msg = "Inserir email"
        toastify(erro, msg)
    }else if(pass == ""){
        erro = "senha"
        msg = "Inserir senha"
        toastify(erro, msg)
    }else{
        const dataBase = await login(email, pass)
        if(dataBase.token){
        localStorage.setItem("@token",dataBase.token)
        localStorage.setItem("@token_user",JSON.stringify(dataBase.token))
        setTimeout(()=>{
            window.location.href = ".././pageAdmin"
        },1000)
        }else{
            erro = "senha"
            msg = "Não encontrado usuario"
            toastify(erro, msg)
        }

        
    }   
} 
