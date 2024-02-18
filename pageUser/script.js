import { validationLeague } from "../global/game.js"
import { openTableChampion, tableChampion, tableChampionOC } from "../global/tableChampion.js"

const game = document.querySelector("#dayGamesUl")
const games = document.querySelector("#butGames")
const dateGames = document.querySelector("#dateGames")

openDayGame()
openGames()

tableChampion()
openTableChampion()
tableChampionOC()

async function openDayGame() {
    const league = await validationLeague()
    if (!league) {
    game.insertAdjacentHTML("afterbegin", `
    <li>
    <p>NENHUMA LIGA ATIVA NO MOMENTO</p>
    </li>
    `)
        game.setAttribute("style", "padding:5px; margin-bottom: 10px;")
    } else {
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

}

async function openGames() {
    const league = await validationLeague()
    if (!league) {
        games.remove()
        dateGames.insertAdjacentHTML("afterbegin", `
        <li>
        <p>NENHUMA LIGA ATIVA NO MOMENTO</p>
        </li>
        `)
        dateGames.setAttribute("style", "padding:5px; margin-bottom: 10px;")
        OpenCloseSection()
    } else {
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
        OpenCloseSection()
    }

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

const imgGame = document.querySelector("#imgGame")
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

async function OpenCloseSection(){
    const imgGames = document.querySelector("#imgGames")
    const gamesOC = document.querySelector("#gamesOC")
    const league = await validationLeague()
    if (!league){
        gamesOC.addEventListener("click", () => {
            if (gamesOC.value == 1) {
                games.innerHTML = ""
                dateGames.innerHTML = ""
                gamesOC.value = 2
                games.setAttribute("style", "padding:0px;")
                dateGames.setAttribute("style", "padding:0px; margin-bottom: 0px;")
                imgGames.src = "/global/img/abrir.png"
            } else {
                dateGames.insertAdjacentHTML("afterbegin", `<li><p>NENHUMA LIGA ATIVA NO MOMENTO</p></li>`)
                dateGames.setAttribute("style", "padding:5px; margin-bottom: 10px;")
                gamesOC.value = 1
                imgGames.src = "/global/img/fechar.png"
            }
        })
    }else{
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
    }

}



