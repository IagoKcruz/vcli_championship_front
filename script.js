import { toastify } from "../global/toastity.js"
import { login } from "./global/userGlobal.js"

const registerform = document.querySelector("form")
registerform.addEventListener("submit",(event)=>{
    event.preventDefault()
    registerForm()
})

async function registerForm(){
    console.log("cheguei")
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
            window.location.href = "./pageAdmin"
        },1000)
        }else{
            erro = "senha"
            msg = "Não encontrado usuario"
            toastify(erro, msg)
        }

        
    }   
} 

// divRounds.insertAdjacentHTML("afterbegin", `
//         <div>
//         <ul id="tableTeamsUl">
//         </ul>
//         <button id="generateRounds">GERAR RODADAS DO CAMPEONATO</button>
//         </div>
//         `
//         )
//         tableTeamsToGenerateRounds()
//         const butGenerate = document.querySelector("#generateRounds")
//         butGenerate.addEventListener("click", () => {
//             const div = document.createElement("div")
//             div.classList.add("modal")
//             main.appendChild(div)
//             div.insertAdjacentHTML("afterbegin", `  
//             <div>
//             <p>DESEJA CRIAR AS RODADAS DO CAMPEONATO?</p>
//             </div>
//             <div>
//             <button id="insertRounds">GERAR</button>
//             <button id="cancelRounds">CANCELAR</button>
//             </div>
//             `)
//             const insertRounds = document.querySelector("#insertRounds")
//             insertRounds.addEventListener("click", async (event) => {
//                 div.remove()
//                 let teams = []
//                 const teamsDataBase = await listTeam();
//                 if (teamsDataBase) {
//                     for (let i = 0; i < teamsDataBase.length; i++) {
//                         console.log(teamsDataBase[i])
//                         teams.push(teamsDataBase[i].idTeam)
//                     }
//                     console.log(teams)
//                     selectDataBase = await validationLeague()
//                     console.log(selectDataBase[0].idLeague)
//                     generateRoundsChampion(teams, selectDataBase[0].idLeague)
//                 }
//             })
//             const cancelRounds = document.querySelector("#cancelRounds")
//             cancelRounds.addEventListener("click", (event) => {
//                 div.remove()
//             })
            
        // })