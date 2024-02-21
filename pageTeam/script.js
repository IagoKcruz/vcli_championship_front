import { UlPlayerOC, playersDiv, showPlayers } from "../global/player.js"
import { listOneTeam } from "../global/teams.js"

divTeam()
export async function divTeam(){
    const main = document.querySelector("main")
    const teamDB = listOneTeam() 
    if(!teamDB){
        main.insertAdjacentHTML("afterbegin",`
        <div>
            <p>NÃO FOI POSSIVEL ENCONTRAR TIME OU JOGADORES</p>
        </div>
        `)
    }else{
        main.insertAdjacentHTML("afterbegin",`
        <div>
        <section>
            <p>${teamDB[0].teamName}</p>
            <img src="" alt="">
        </section>
        <div id="players">
        </div>
        </div>
        `)
    }
    playersDiv(teamDB[0].idTeam)
    showPlayers(teamDB[0].idTeam)
}



export async function updatePlayer() {
    const playerLi = document.querySelector("#playerLi")
    playerLi.addEventListener("click", () => {
        const div = document.createElement("div")
        div.classList.add("modal")
        main.appendChild(div)
        div.insertAdjacentHTML("afterbegin", `  
        <button id="exitPlayer">X</button>
        <div>
        <img src="" alt="">
        </div>
        <div>
        <p> NOME: </p>
        <p> IDADE: </p>
        <p> IDADE: </p>
        <p> POSIÇÃO: </p>
        </div>
        <div>
        <button id="update">ALTERAR</button>
        <button id="inative">INATIVAR</button>
        </div>
        </form>
        `)
        const butExit = document.querySelector("#exitPlayer")
        butExit.addEventListener("click", () => {
            div.remove();
        })
        const butUpdate = document.querySelector("#update")
        butUpdate.addEventListener("click", (event) => {
            event.preventDefault()
            updateAction()
        })
        const butInative = document.querySelector("#inative")
        butInative.addEventListener("click", (event) => {
            event.preventDefault()
            inativeAction()
        })
    })
}


function updateAction() {
    const div = document.createElement("div")
    div.classList.add("modal")
    main.appendChild(div)
    div.insertAdjacentHTML("afterbegin", `  
    <div>
    <label>CONFIRMAR ALTERAÇÃO</label>
    <button id="confirmUpdate">SIM</button>
    <button id="exitConfirm">NÃO</button>
    </div>
    `)
    const confirmUpdate = document.querySelector("#confirmUpdate")
    confirmUpdate.addEventListener("click", () => {
        console.log("banco de dados")
        window.location.reload()
    })
    const exitConfirm = document.querySelector("#exitConfirm")
    exitConfirm.addEventListener("click", () => {
        div.remove();
    })
}

function inativeAction() {
    const div = document.createElement("div")
    div.classList.add("modal")
    main.appendChild(div)
    div.insertAdjacentHTML("afterbegin", `
    <div>
    <label>CONFIRMAR INATIVIDADE PARA O JOGADOR</label>
    <button id="confirmInative">SIM</button>
    <button id="exitConfirm">NÃO</button> 
    </div>
    `)
    const confirmInative = document.querySelector("#confirmInative")
    confirmInative.addEventListener("click", () => {
        console.log("banco de dados")
        window.location.reload()
    })
    const exitConfirm = document.querySelector("#exitConfirm")
    exitConfirm.addEventListener("click", () => {
        div.remove();
    })
}



