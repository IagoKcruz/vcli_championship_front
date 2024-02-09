const main = document.querySelector("main")
const teamsOC = document.querySelector("#teamsOC")
const imgTeams = document.querySelector("#imgTeams")
const tableTeamsUl = document.querySelector("#tableTeamsUl")
const gamesOC = document.querySelector("#gamesOC")
const imgGames = document.querySelector("#imgGames")
const gamesUl = document.querySelector("#gamesUl")
const functionsDiv = document.querySelector("#functionsDiv")

tableTeams()
games()
actions()

function tableTeams() {
    tableTeamsUl.insertAdjacentHTML("afterbegin", `
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
    <li>10</li>
    `)
    tableTeamsUl.setAttribute("style", "padding:5px; margin-bottom: 10px;")
}

teamsOC.addEventListener("click", () => {
    if (teamsOC.value == 1) {
        teamsOC.value = 2
        tableTeamsUl.innerHTML = ""
        tableTeamsUl.setAttribute("style", "padding:0px;")
        imgTeams.src = "/global/img/abrir.png"
    } else {
        tableTeams(tableTeamsUl)
        teamsOC.value = 1
        imgTeams.src = "/global/img/fechar.png"
    }
})


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
    console.log(main)
    main.appendChild(div)
    div.insertAdjacentHTML("afterbegin", `
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
        <select id="position"></select>
    </div>
    <div>
        <select id="team"></select>
    </div>
    </form>
    `)
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
})

const newTeam = document.querySelector("#newTeam")
newTeam.addEventListener("click", () => {
    const div = document.createElement("div")
    div.classList.add("modal")
    main.appendChild(div)
    div.insertAdjacentHTML("afterbegin", `
    <form id="formTeam">
        <div>
            <label>Nome</label>
            <input type="text" id="name">
        </div>
        <div>
            <label>TAG(abreviação)</label>
            <input type="text" id="tag">
        </div>
        <div>
            <label>Brasão</label>
            <input type="text" id="shield">
        </div>
    </form>
    `)
})

// <select id="status">
// <option value="holder">TITULAR</option>
// <option value="reserve">RESERVA</option>
// <option value="injured">LESIONADO</option>
// <option value="suspended"></option>
// </select>