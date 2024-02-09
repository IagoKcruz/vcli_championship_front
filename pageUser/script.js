const table = document.querySelector("#tableCampionUl")
const game = document.querySelector("#dayGamesUl")
const games = document.querySelector("#butGames")

openDayGame()
openTableChampion()
openGames()

function openTableChampion() {
    table.insertAdjacentHTML("afterbegin", `
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
    table.setAttribute("style", "padding:5px; margin-bottom: 10px;")
}
function openDayGame() {

    game.insertAdjacentHTML("afterbegin", `
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
    game.setAttribute("style", "padding:5px; margin-bottom: 10px;")
}

function openGames() {
    games.insertAdjacentHTML("afterbegin", `
    <button id="next">Próximos Jogos</button>
    <button id="last">Jogos Anteriores</button>
    `)

    const next = document.querySelector("#next")
    const last = document.querySelector("#last")
    next.addEventListener("click", () => {
        nextGame()
    })
    last.addEventListener("click", () => {
        lastGame()
    })
    games.setAttribute("style", "padding:5px; margin-bottom: 10px;")
}



function nextGame() {
    dateGames.innerHTML = ""
    //consulta ao bando de dados para pegar os jogos
    //resultado foreach()...
    dateGames.insertAdjacentHTML("afterbegin", `
    <li>
    <p> A [1] x C [3] (04/02/2023 15 hrs)</p>
    </li>
    <li>
    <p> D [1] x F [3] (04/02/2023 15 hrs)</p>
    </li>
    <li>
    <p> B [1] x E [3] (04/02/2023 15 hrs)</p>
    </li>
    `)
    dateGames.setAttribute("style", "padding:5px; margin-bottom: 10px;")
}
function lastGame() {
    dateGames.innerHTML = ""
    //consulta ao bando de dados para pegar os jogos
    //resultado foreach()...
    dateGames.insertAdjacentHTML("afterbegin", `
    <li>
    <p> C [0] x D [0] (06/02/2023 15 hrs)</p>
    </li>
    <li>
    <p> A [0] x E [0] (06/02/2023 16 hrs)</p>
    </li>
    <li>
    <p> B [0] x F [0] (06/02/2023 17 hrs)</p>
    </li>
    `)
    dateGames.setAttribute("style", "padding:5px; margin-bottom: 10px;")
}

const imgTable = document.querySelector("#imgTable")
const imgGame = document.querySelector("#imgGame")
const imgGames = document.querySelector("#imgGames")

const tableOC = document.querySelector("#tableOC")
tableOC.addEventListener("click", () => {
    if (tableOC.value == 1) {
        table.innerHTML = ""
        tableOC.value = 2
        table.setAttribute("style", "padding:0px;")
        imgTable.src = "/global/img/abrir.png"
    } else {
        openTableChampion(table)
        tableOC.value = 1
        imgTable.src = "/global/img/fechar.png"
    }
})
const dayGameOC = document.querySelector("#dayGameOC")
dayGameOC.addEventListener("click", () => {
    if (dayGameOC.value == 1) {
        game.innerHTML = ""
        dayGameOC.value = 2
        game.setAttribute("style", "padding:0px;")
        imgGame.src = "/global/img/abrir.png"
    } else {
        openDayGame(game)
        dayGameOC.value = 1
        imgGame.src = "/global/img/fechar.png"
    }
})
const gamesOC = document.querySelector("#gamesOC")
gamesOC.addEventListener("click", () => {
    if (gamesOC.value == 1) {
        games.innerHTML = ""
        dateGames.innerHTML = ""
        gamesOC.value = 2
        games.setAttribute("style", "padding:0px;")
        dateGames.setAttribute("style", "padding:0px; margin-bottom: 0px;")
        imgGames.src = "/global/img/abrir.png"
    } else {
        dateGames.insertAdjacentHTML("afterbegin", `<p id="comment">Não há nenhuma seleção</p>`)
        dateGames.setAttribute("style", "padding:10px; margin-bottom: 10px;")
        openGames(games)
        gamesOC.value = 1
        imgGames.src = "/global/img/fechar.png"
    }
})

