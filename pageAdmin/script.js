
import { insertTeamModel, listTeam, } from "../global/teams.js"
import { insertPlayerModel, listPosition } from "../global/player.js"
import { modal, toastify } from "../global/toastity.js"
import { validationCountPlayer, validationCountTeam, validationInsertPlayer, validationInsertTeam } from "./validation.js"
import { showRoundsAdmin, validationLeague } from "../global/game.js"



const token = localStorage.getItem("@token_user");
if(token){
    localStorage.removeItem("@team")

const main = document.querySelector("main")
main.insertAdjacentHTML("afterbegin", `
<div id="functionsDiv">
</div>
<div id="games">
    <button value="1" class="openclose" id="gamesOC">
        <p>JOGOS</p>
        <img src="/global/img/fechar.png" id="imgGames" alt="abrir">
    </button>
    <div id="generate"></div>
</div>
`)
const functionsDiv = document.querySelector("#functionsDiv")

gamesChampion()
actions()

const divRounds = document.querySelector("#generate")

async function gamesChampion() {
    const league = await validationLeague()
    if (league[0].active == "false") {
    divRounds.insertAdjacentHTML("beforeend", `
            <div id="aviso">
            <p>NENHUMA LIGA ATIVA NO MOMENTO</P>
            <button id="generateRounds">IR PARA A TELA DE CRIAÇÃO</button>
            </div>
            `
            )
            divRounds.setAttribute("style", "padding:0px 10px 10px 10px;")
            const butGenerate = document.querySelector("#generateRounds")
            butGenerate.addEventListener("click",()=>{
                window.location.href = ".././pageChampion"
            })
    }else{
        showRoundsAdmin(1)
    }
}
const gamesOC = document.querySelector("#gamesOC")
const imgGames = document.querySelector("#imgGames")
gamesOC.addEventListener("click", () => {
    if(gamesOC.value == 1){
        divRounds.setAttribute("style", "padding:0px;")
        divRounds.innerHTML = ""
        gamesOC.value = 2
        imgGames.src = "/global/img/abrir.png"
    }else {
        gamesChampion()
        gamesOC.value = 1
        imgGames.src = "/global/img/fechar.png"
    }
})

function actions() {
    functionsDiv.insertAdjacentHTML("afterbegin", `
    <button class="buttonsAdmin" id="newTeam">
    <p>NOVO TIME</p>
    </button>
    <button class="buttonsAdmin" id="newPlayer">
    <p>NOVO JOGADOR</p>
    </button>
    `)
}

const newPlayer = document.querySelector("#newPlayer")
newPlayer.addEventListener("click", async () => {
    const div = document.createElement("div")
    div.classList.add("modal")
    main.appendChild(div)
    div.insertAdjacentHTML("afterbegin", `
    <button id="exitPlayer">X</button>
    <form id="formPlayer">
    <div>
        <label>Nome</label>
        <input type="text" id="name">
    </div>
    <div>
        <label>Idade</label>
        <input type="number" id="age" min="18" oninput="validity.valid||(value='');" value="18">
    </div>
    <div>
        <label>Posição</label>
        <select id="position"></select>
    </div>
    <div>
        <label>Time</label>
        <select id="team"></select>
    </div>
    <div>
        <label>SITUAÇÃO</label>
        <select id="status">
            <option value="holder">TITULAR</option>
            <option value="reserve">RESERVA</option>
        </select>
    </div>
    <button type="submit">INSERIR</button>
    </form>
    `)
    modal()
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
    const form = document.querySelector("form")
    form.addEventListener("submit", async(event) => {

        event.preventDefault()
        const formPlayer =
        {
            name: document.querySelector("#name").value,
            age: document.querySelector("#age").value,
            position: document.querySelector("#position").value,
            team: document.querySelector("#team").value,
            status: document.querySelector("#status").value
        }
         
         const validation = validationInsertPlayer(formPlayer)
         if (validation) {
             const countValidation =  await validationCountPlayer(formPlayer)
             if(countValidation){
                 insertPlayerDataBase(formPlayer)
             } 
         }
    })
})

async function insertPlayerDataBase(form) {
    const div = document.createElement("div")
    div.classList.add("modal")
    main.appendChild(div)
    let posicao, team
    const positionDB = await listPosition()
    positionDB.forEach(item => {
        if (item.idPosition == form.position) {
            posicao = item.description
        }
    })
    const teamDB = await listTeam()
    teamDB.forEach(item => {
        if (form.team == item.idTeam) {
            team = item.teamName
        }
    })
    div.insertAdjacentHTML("afterbegin", `  
        <button id="updatePlayer">VOLTAR</button>
        <div>
        <img src="" alt="">
        </div>
        <div>
        <p> NOME: ${form.name}</p>
        <p> IDADE: ${form.age}</p>
        <p> POSIÇÃO: ${posicao}</p>
        <p> TIME: ${team}</p>
        <p> SITUAÇÃO: ${form.status}</p>
        </div>
        <div>
        <button id="insertPlayer">INSERIR</button>
        <button id="cancelPlayer">CANCELAR</button>
        </div>
        `)
    const updatePlayer = document.querySelector("#updatePlayer")
    updatePlayer.addEventListener("click", (event) => {
        div.remove()
    })
    const cancelPlayer = document.querySelector("#cancelPlayer")
    cancelPlayer.addEventListener("click", (event) => {
            window.location.href = "./"
    })
    const insertPlayer = document.querySelector("#insertPlayer")
    insertPlayer.addEventListener("click", async() => {
        const dataBase = await insertPlayerModel(form)
        if (dataBase.status == 201) {
            cancelPlayer.setAttribute('disabled', '')
            updatePlayer.setAttribute('disabled', '')
            setTimeout(() => {
                window.location.href = "./"
            }, 5000);
            toastify("erro", "Jogador cadastrado")
        } else {
            toastify("erro", "Erro ao cadastrar jogador ou jogador já existente")
        }
    })

}

const newTeam = document.querySelector("#newTeam")
newTeam.addEventListener("click", () => {
    const div = document.createElement("div")
    div.classList.add("modal")
    main.appendChild(div)
    div.insertAdjacentHTML("afterbegin", `  
    <button id="exitTeam">X</button>
    <form id="formTeam">
        <div>
            <label>Nome</label>
            <input type="text" id="name">
        </div>
        <div>
            <label>TAG(abreviação)</label>
            <input type="text" id="tag">
        </div>
        <button type="submit">INSERIR</button>
    </form>
    `)
    modal()
    const form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        const formTeam =
        {
            name: document.querySelector("#name").value,
            tag: document.querySelector("#tag").value,
        }
        event.preventDefault()
        const validation = validationInsertTeam(formTeam)
        if (validation) {
            const countValidation = validationCountTeam(formTeam)
            if(countValidation){
                insertTeamDataBase(formTeam)
            }             
        }
    })
    const butExit = document.querySelector("#exitTeam")
    butExit.addEventListener("click", () => {
        div.remove();
    })
})

function insertTeamDataBase(form) {
    const div = document.createElement("div")
    div.classList.add("modal")
    main.appendChild(div)
    div.insertAdjacentHTML("afterbegin", `  
        <button id="updateTeam">VOLTAR</button>
        <div>
        <p> NOME: ${form.name}</p>
        <p> IDADE: ${form.tag}</p>
        </div>
        <div>
        <button id="insertTeam">INSERIR</button>
        <button id="cancelTeam">CANCELAR</button>
        </div>
        `)
    const updateTeam = document.querySelector("#updateTeam")
    updateTeam.addEventListener("click", (event) => {
        div.remove()
    })
    const insertTeam = document.querySelector("#insertTeam")
    insertTeam.addEventListener("click", async (event) => {
        const dataBase = await insertTeamModel(form)
        if (dataBase.status == 201) {
            setTimeout(() => {
                window.location.href = "./"
            }, 5000);
            toastify("erro", "Time cadastrado")
        } else {
            setTimeout(() => {
                window.location.href = "./"
            }, 5000);
            toastify("erro", "Erro ao cadastrar time ou time já existente")
        }
    })
    const cancelTeam = document.querySelector("#cancelTeam")
    cancelTeam.addEventListener("click", (event) => {
        div.remove()
    })
}
}else{
    window.location.protocol = ".././pageUser"
}