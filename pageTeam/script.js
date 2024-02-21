import { playersDiv, searchPlayerController, showPlayers } from "../global/player.js"
import { listOneTeam } from "../global/teams.js"

divTeam()
export async function divTeam(){
    const main = document.querySelector("main")
    const teamDB = await listOneTeam(7) 
    console.log(teamDB[0].idTeam)
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
        <div id="players${teamDB[0].idTeam}">
        </div>
        </div>
        `)
    }
    playersDiv(teamDB[0].idTeam)
    showPlayers(teamDB[0].idTeam)
}

export async function updatePlayer() {
    const item = searchPlayerController()
    if(item.length > 0){
    const main = document.querySelector("main")
    const playerLi = document.querySelector("#playerLi")
    playerLi.addEventListener("click", async() => {
        let posicao, teamDb;
        const position = document.querySelector("#position")
        const positionDB = await listPosition()
        positionDB.forEach(item => {
            position.insertAdjacentHTML("beforebegin", `
            <option value="${item.idPosition}">${item.description}</option>
            `)
            if (item.idPosition == form.position) {
                posicao = item.description
            }
        });
        const team = document.querySelector("#team")
        const teamDB = await listTeam()
        teamDB.forEach(item => {
            team.insertAdjacentHTML("beforebegin", `
            <option value="${item.idTeam}">${item.teamName}</option>
            `)
            if (form.team == item.idTeam) {
                teamDb = item.teamName
            }
        });
        const div = document.createElement("div")
        div.classList.add("modal")
        main.appendChild(div)
        div.insertAdjacentHTML("afterbegin", `  
        <button id="exitPlayer">X</button>
        <div>
        <img src="" alt="">
        </div>
        <div>
        <label>Nome</label>
        <input type="text" id="name" value="${item[0].playerName}">
        </div>
        <div>
        <label>Idade</label>
        <input type="number" id="age" min="18" oninput="validity.valid||(value=''); " value="${item[0].playerName}">
        </div>
        <div>
        <label>Posição: ${position}</label>
        <select id="position"></select>
        </div>
        <div>
        <label>Time ${timeDb}</label>
        <select id="team"></select>
        </div>
        <div>
        <label>SITUAÇÃO: ${item.status}</label>
        <select id="status">
            <option value="holder">TITULAR</option>
            <option value="reserve">RESERVA</option>
        </select>
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
            const formPlayer =
            {
                name: document.querySelector("#name").value,
                photo: document.querySelector("#photo").value,
                age: document.querySelector("#age").value,
                position: document.querySelector("#position").value,
                team: document.querySelector("#team").value,
                status: document.querySelector("#status").value
            }
            //banco de dados
            event.preventDefault()
            updateAction()
        })
        const butInative = document.querySelector("#inative")
        butInative.addEventListener("click", (event) => {
            event.preventDefault()
            inativeAction()
        })
    })
    }else{
        const div = document.createElement("div")
        div.classList.add("modal")
        main.appendChild(div)
        div.insertAdjacentHTML("afterbegin", `
        <div>
        <p>NÃO FOI POSSIVEL ENCONTRAR TIME OU JOGADORES</p>
        </div>
        `)
    }
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



