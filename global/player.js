import { validationCountUpdate, validationInsertPlayer } from "../pageAdmin/validation.js"
import { toastify } from "./toastity.js"

const my_headers = {
    "Content-Type": "application/json"
}
const url = "http://localhost:3000/"

export async function insertPlayerModel(player) {
    try {
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
        return error
    }
}

export async function updatePlayerModel(player) {
    try {
        const items = {
            idPlayer: player.id,
            playerName: player.name,
            status: player.status
        }
        const bodyJson = JSON.stringify(items)
        const res = await fetch(
            url + "admin/updatePlayer",
            {
                headers: my_headers,
                method: "PATCH",
                body: bodyJson
            })
        console.log(res)
        return res;
    } catch (error) {
        return error
    }
}

export async function listPosition() {
    try {
        const res = await fetch(url+"admin/listPosition")
        const resJson = await res.json();
        return resJson
    } catch (error) {
        return error
    }
}

export async function listPlayerInTimeModel(idTeam) {
    try {
        const res = await fetch(url+`admin/listPlayersInTeam/${idTeam}`)
        const resJson = await res.json();
        return resJson
    } catch (error) {
        return error
    }
}

export async function searchPlayerController(idPlayer) {
    try {
        const res = await fetch(url+`admin/searchPlayerById/${idPlayer}`)
        const resJson = await res.json();
        return resJson
    } catch (error) {
        return error
    }
}

export function playersDiv(idTeam) {
    const tableDiv = document.querySelector("#players"+idTeam)
    tableDiv.insertAdjacentHTML("afterbegin", `
    <ul id="playersUl${idTeam}">
    </ul>
    `) 
}

export async function showPlayers(idTeam) {
    const playersUl = document.querySelector("#playersUl"+idTeam)
    const dataBase = await listPlayerInTimeModel(idTeam)
    if(dataBase.length == 0){
            playersUl.insertAdjacentHTML("beforeend", `
            <li>
            <p> NENHUM JOGADOR ENCONTRADO </p>
            </li>
            `)
            playersUl.setAttribute("style", "padding: 5px 5px;")            
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
            playersUl.setAttribute("style", "padding:5px;")
            const token = localStorage.getItem("@token_user");
            if(token){
                    const playerLi = document.querySelectorAll(".playersClass")
            playerLi.forEach(item => {
            item.addEventListener("click",()=>{
                showUpdate(item.value)
            })
            })
            }

        }

}



async function showUpdate(id){
    const main = document.querySelector("main")
    const item = await searchPlayerController(id)
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
        <label>Time :${item[0].description}</label>
        </div>
        <div>
        <label>SITUAÇÃO: ${item[0].status}</label>
        <select id="status">
            <option value="holder">TITULAR</option>
            <option value="reserve">RESERVA</option>
        </select>
        </div>
        <div>
        <button id="update">ALTERAR</button>
        </div>
        </form>
        `)
        const butExit = document.querySelector("#exitPlayer")
        butExit.addEventListener("click", () => {
            window.location.href = "./"
        })
        const position = document.querySelector("#position")
        const positionDB = await listPosition()
        positionDB.forEach(item => {
            position.insertAdjacentHTML("afterbegin", `
            <option value="${item.idPosition}">${item.description}</option>
            `)
        });
        const butUpdate = document.querySelector("#update")
        butUpdate.addEventListener("click", async(event) => {
            event.preventDefault()
            const formPlayer =
            {
                id: id,
                name: document.querySelector("#name").value,
                age: document.querySelector("#age").value,
                position: document.querySelector("#position").value,
                team: item[0].teamName,
                idTeam: item[0].idTeam,
                status: document.querySelector("#status").value
            }
            const validation = validationInsertPlayer(formPlayer)
            if (validation){
                const count = await validationCountUpdate(formPlayer)
                if(count){
                    updateAction(formPlayer)
                } 
            }
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

async function updateAction(form) {
    let posicao
    const main = document.querySelector("main")
    const div = document.createElement("div")
    div.classList.add("modal")
    main.appendChild(div)
    const positionDB = await listPosition()
    positionDB.forEach(item => {
        if (item.idPosition == form.position) {
            posicao = item.description
        }
    })
    div.insertAdjacentHTML("afterbegin", `  
    <div>
    <div>
    <img src="" alt="">
    </div>
    <div>
    <p> NOME: ${form.name}</p>
    <p> IDADE: ${form.age}</p>
    <p> POSIÇÃO: ${posicao}</p>
    <p> TIME: ${form.team}</p>
    <p> SITUAÇÃO: ${form.status}</p>
    </div>
    <div>
    <label>CONFIRMAR ALTERAÇÃO</label>
    <button id="confirmUpdate">SIM</button>
    <button id="exitConfirm">NÃO</button>
    </div>
    `)
    const exitConfirm = document.querySelector("#exitConfirm")
    exitConfirm.addEventListener("click", () => {
        div.remove();
    })
    const confirmUpdate = document.querySelector("#confirmUpdate")
    confirmUpdate.addEventListener("click", async() => {
        const dataBase = await updatePlayerModel(form)
        if (dataBase.status == 200) {
            exitConfirm.setAttribute('disabled', '')
            setTimeout(() => {
                window.location.href = "./"
            }, 5000);
            toastify("erro", "Jogador alterado com sucesso")
        } else {
            toastify("erro", "Erro ao alterar jogador tente novamente mais tarde")
        }
    })

}

