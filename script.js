import { toastify } from "../global/toastity.js"
import { registerDataBase } from "../global/userGlobal.js"
import { erro500 } from "./global/erro500.js"
const erro = await erro500()
if(erro) return
const registerbut = document.querySelector("button")
registerbut.addEventListener("click",()=>{
    registerForm()
})

function registerForm(){
    const email = document.querySelector("#email").value
    const pass = document.querySelector("#senha").value
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
        dataBase = login(email, pass)
        if(dataBase){
            window.location.href = "./pageUser"
        }
    }   
} 
