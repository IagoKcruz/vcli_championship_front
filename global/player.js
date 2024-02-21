import { listTeam } from "./teams.js"

const my_headers = {
    "Content-Type": "application/json"
}
const url = "http://localhost:3000/"

export async function insertPlayerModel(player) {
    try {
        console.log(player)
        const items = {
            playerName: player.name,
            idTeam: player.team,
            age: player.age,
            idPosition: player.position,
            status: player.status
        }
        const bodyJson = JSON.stringify(items)
        const res = await fetch(
            url + "admin/insertPlayer",
            {
                headers: my_headers,
                method: "POST",
                body: bodyJson
            })
        return res;
    } catch (error) {
        console.log(error)
    }
}

export async function listPosition() {
    try {
        const res = await fetch(url+"admin/listPosition")
        const resJson = await res.json();
        return resJson
    } catch (error) {
        console.log(error)
    }
}

export async function listPlayerInTimeModel(idTeam) {
    try {
        const res = await fetch(url+`admin/listPlayersInTeam/${idTeam}`)
        const resJson = await res.json();
        return resJson
    } catch (error) {
        console.log(error)
    }
}

export async function searchPlayerController(idPlayer) {
    try {
        const res = await fetch(url+`admin/searchPlayerById/${idPlayer}`)
        const resJson = await res.json();
        console.log(resJson)
        return resJson
    } catch (error) {
        console.log(error)
    }
}

export function playersDiv(idTeam) {
    const tableDiv = document.querySelector("#players"+idTeam)
    tableDiv.insertAdjacentHTML("afterbegin", `
    <ul id="playersUl${idTeam}">
    </ul>
    `)
    tableDiv.setAttribute("style", "padding: 10px; margin-top: 10px;") 
}

export async function showPlayers(idTeam) {
    const playersUl = document.querySelector("#playersUl"+idTeam)
    const dataBase = await listPlayerInTimeModel(idTeam)
    console.log(dataBase)
    if(dataBase.length == 0){
            playersUl.insertAdjacentHTML("beforeend", `
            <li >
            <p> NENHUM JOGADOR ENCONTRADO </p>
            </li>
            `)
            playersUl.setAttribute("style", "padding: 10px;")            
    }else{
        dataBase.forEach(item => {
            playersUl.insertAdjacentHTML("afterbegin", `
            <li id="playerLi${item.idPlayer}" class="playersClass" value="${item.idPlayer}">
            <div>
            <img src="" alt="">
            </div>
            <div>
            <p> NOME: ${item.playerName}</p>
            <p> IDADE: ${item.age}</p>
            <p> TIME: ${item.teamName}</p>
            <p> POSIÇÃO: ${item.description}</p>
            <p> STATUS: ${item.status}</p>
            </div>
            </li>
            `)
            })
            playersUl.setAttribute("style", "padding:10px;")
            const playerLi = document.querySelectorAll(".playersClass")
            console.log(playerLi)
            playerLi.forEach(item => {
            item.addEventListener("click",()=>{
                showUpdate(item.value)
            })
            })
        }

}



async function showUpdate(id){
    console.log(id)
    const main = document.querySelector("main")
    const item = await searchPlayerController(id)
    console.log(item)
    if(item){
        const div = document.createElement("div")
        div.classList.add("modal")
        main.appendChild(div)
        div.insertAdjacentHTML("afterbegin", `  
        <button id="exitPlayer">X</button>
        <div>
        <img src="" alt="">
        </div>
        <div>
        <label>Nome: ${item[0].playerName}</label>
        <input type="text" id="name" value="${item[0].playerName}">
        </div>
        <div>
        <label>Idade: ${item[0].age}</label>
        <input type="number" id="age" min="18" oninput="validity.valid||(value=''); " value="${item[0].age}">
        </div>
        <div>
        <label>Posição: ${item[0].description}</label>
        <select id="position"></select>
        </div>
        <div>
        <label>Time ${item[0].teamName}</label>
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
        const position = document.querySelector("#position")
        const positionDB = await listPosition()
        positionDB.forEach(item => {
            position.insertAdjacentHTML("afterbegin", `
            <option value="${item.idPosition}">${item.description}</option>
            `)
        });
        const team = document.querySelector("#team")
        const teamDB = await listTeam()
        teamDB.forEach(item => {
            team.insertAdjacentHTML("afterbegin", `
            <option value="${item.idTeam}">${item.teamName}</option>
            `)
        });
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