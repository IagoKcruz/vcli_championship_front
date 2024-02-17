import { openTableChampion, tableChampion, tableChampionOC } from "../global/tableChampion.js"
import { UlTeamOC, insertTeamModel, tableTeams, teamDiv } from "../global/teams.js"
import { modal, toastify } from "../global/toastity.js"
import { validationInsertTeam } from "./validation.js"

const main = document.querySelector("main")
const gamesOC = document.querySelector("#gamesOC")
const imgGames = document.querySelector("#imgGames")
const gamesUl = document.querySelector("#gamesUl")
const functionsDiv = document.querySelector("#functionsDiv")

teamDiv()
tableTeams()
UlTeamOC()

tableChampion()
openTableChampion()
tableChampionOC()

games()
actions()

function games() {
    gamesUl.insertAdjacentHTML("afterbegin", `
    <li>
    <p> A [0] x B [0] (05/02/2023 15 hrs)</p>
    </li>
    <li>
    <p> C [0] x D [0] (05/02/2023 16 hrs)</p>
    </li>
    <li>
    <p> E [0] x F [0] (05/02/2023 17 hrs)</p>
    </li>
    `)
    gamesUl.setAttribute("style", "padding:5px; margin-bottom: 10px;")
}

gamesOC.addEventListener("click", () => {
    if (gamesOC.value == 1) {
        gamesOC.value = 2
        gamesUl.innerHTML = ""
        gamesUl.setAttribute("style", "padding:0px;")
        imgGames.src = "/global/img/abrir.png"
    } else {
        games(gamesUl)
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
newPlayer.addEventListener("click", () => {
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
        <label>Foto</label>
        <input type="text" id="photo">
    </div>
    <div>
        <label>Idade</label>
        <input type="number" id="age" min="18" oninput="validity.valid||(value='');">
    </div>
    <div>
        <label>Posição</label>
        <select id="position"></select>
    </div>
    <div>
        <label>Time</label>
        <select id="team"></select>
    </div>
    <button type="submit">INSERIR</button>
    </form>
    `)
    modal()
    // const position = document.querySelector("position")
    // const positionDB = positionDataBase()
    // positionDB.forEach(item => {
    //     position.insertAdjacentHTML("beforebegin",`
    //     <option value="${item.id}">${item.descr}</option>
    //     `)
    // });
    // const team = document.querySelector("team")
    // const teamDB = teamDataBase()
    // teamDB.forEach(item => {
    //     team.insertAdjacentHTML("beforebegin",`
    //     <option value="${item.id}">${item.descr}</option>
    //     `)
    // });
    const form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        const formPlayer =
        {
            name: document.querySelector("#name").value,
            photo: document.querySelector("#photo").value,
            age: document.querySelector("#age").value,
            position: document.querySelector("#position").value,
            team: document.querySelector("#team").value
        }
        event.preventDefault()
        insertPlayerDataBase(formPlayer)
    })
    const butExit = document.querySelector("#exitPlayer")
    butExit.addEventListener("click", () => {
        div.remove();
    })
})

function insertPlayerDataBase(form) {
    const div = document.createElement("div")
    div.classList.add("modal")
    main.appendChild(div)
    div.insertAdjacentHTML("afterbegin", `  
        <button id="updatePlayer">VOLTAR</button>
        <div>
        <img src="" alt="">
        </div>
        <div>
        <p> NOME: ${form.name}</p>
        <p> IDADE: ${form.age}</p>
        <p> POSIÇÃO: ${form.position}</p>
        <p> TIME: ${form.team}</p>
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
    const insertPlayer = document.querySelector("#insertPlayer")
    insertPlayer.addEventListener("click", (event) => {
        //updateAction()
    })
    const cancelPlayer = document.querySelector("#cancelPlayer")
    cancelPlayer.addEventListener("click", (event) => {
        //inativeAction()
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
        console.log(validation)
        if(validation){
            insertTeamDataBase(formTeam)
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
        <img src="" alt="">
        </div>
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
        const dataBase =  await insertTeamModel(form)
        console.log(dataBase)
        if(dataBase.status == 201){
            setTimeout(() => {
                window.location.href = "./pageAdmin"
            }, 5000);
            toastify("erro","Time cadastrado")
        }else{
            setTimeout(() => {
                window.location.href = "./"
            }, 5000);
            toastify("erro","Erro ao cadastrar time ou time já existente")
        }
    })
    const cancelTeam = document.querySelector("#cancelTeam")
    cancelTeam.addEventListener("click", (event) => {
        div.remove()
    })
}

// <select id="status">
// <option value="holder">TITULAR</option>
// <option value="reserve">RESERVA</option>
// <option value="injured">LESIONADO</option>
// <option value="suspended"></option>
// </select>