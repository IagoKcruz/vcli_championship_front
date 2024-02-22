import { generateRoundsChampion } from "../pageChampion/script.js";
import { listTeam, tableTeamsToGenerateRounds } from "./teams.js";

const my_headers = {
    "Content-Type": "application/json"
}
const url = "http://localhost:3000/"

export async function listLeagueModel() {
    try {
        const res = await fetch("http://localhost:3000/admin/listLeague")
        const resJson = await res.json();
        return resJson
    } catch (error) {
        console.log(error)
    }
}
export async function showGame(game) {
    try {
        const res = await fetch(url+`admin/listGame/${game}`)
        const resJson = await res.json();
        return resJson
    } catch (error) {
        console.log(error)
    }
}
export async function listGamesController(round) {
    try {
        const res = await fetch(url+`admin/listGames/${round}`)
        const resJson = await res.json();
        return resJson
    } catch (error) {
        console.log(error)
    }
}

export async function validationLeague(){
    const leagueDb = await listLeagueModel()
    if(leagueDb[0].active =='false'){
        return leagueDb
    }else{
        return leagueDb
    }
}

export async function insertGameModel(game) {
    try {
        const items = {
            teamHome: game.home,
            teamAway: game.away,
            round: game.round,
            league: game.league
        }
        const bodyJson = JSON.stringify(items);console.log(bodyJson)
        const res = await fetch(
            url + "admin/insertGame",
            {
                headers: my_headers,
                method: "POST",
                body: `${bodyJson}`
            })
        return res;
    } catch (error) {
        console.log(error)
    }
}

export async function updatePointController(idGame, goalHome, goalAway, cardHome, cardAway) {
    try {
        const items = {
            idGame: idGame,
            teamHome: goalHome,
            teamAway: goalAway,
            cardHome: cardHome,
            cardAway: cardAway
        }
        const bodyJson = JSON.stringify(items);console.log(bodyJson)
        const res = await fetch(
            url + "admin/updateGame",
            {
                headers: my_headers,
                method: "POST",
                body: `${bodyJson}`
            })
        return res;
    } catch (error) {
        console.log(error)
    }
}

export async function searchRounds() {
    const token = localStorage.getItem("@token_user");
    if(token){
        const main = document.querySelector("main")
    let selectDataBase = await validationLeague()
    let roundGame = 1
    const divRounds = document.querySelector("#rounds")
    if (selectDataBase[0].active == "false") {
        divRounds.insertAdjacentHTML("afterbegin", `
        <div>
        <ul id="tableTeamsUl">
        </ul>
        <button id="generateRounds">GERAR RODADAS DO CAMPEONATO</button>
        </div>
        `
        )
        const butGenerate = document.querySelector("#generateRounds")
        butGenerate.addEventListener("click", () => {
            const div = document.createElement("div")
            div.classList.add("modal")
            main.appendChild(div)
            div.insertAdjacentHTML("afterbegin", `  
        <div>
        <p>DESEJA CRIAR AS RODADAS DO CAMPEONATO?</p>
        </div>
        <div>
        <button id="insertRounds">GERAR</button>
        <button id="cancelRounds">CANCELAR</button>
        </div>
        `)
            const insertRounds = document.querySelector("#insertRounds")
            insertRounds.addEventListener("click", async (event) => {
                div.remove()
                let teams = []
                const teamsDataBase = await listTeam();
                if (teamsDataBase) {
                    for (let i = 0; i < teamsDataBase.length; i++) {
                        console.log(teamsDataBase[i])
                        teams.push(teamsDataBase[i].idTeam)
                    }
                    console.log(teams)
                    selectDataBase = await validationLeague()
                    console.log(selectDataBase[0].idLeague)
                    generateRoundsChampion(teams, selectDataBase[0].idLeague)
                }
            })
            const cancelRounds = document.querySelector("#cancelRounds")
            cancelRounds.addEventListener("click", (event) => {
                div.remove()
            })
        })
        tableTeamsToGenerateRounds()
    } else {
        showRounds(roundGame)
    }
    }else{
        if (selectDataBase[0].active == "false") {
            divRounds.insertAdjacentHTML("afterbegin", `
            <div>
            <ul id="tableTeamsUl">
            </ul>
            <button id="generateRounds">GERAR RODADAS DO CAMPEONATO</button>
            </div>
            `
        )}
    }
    
}


export async function showRounds(round) {
    const divRounds = document.querySelector("#rounds")
    divRounds.innerHTML = "";
    divRounds.insertAdjacentHTML("afterbegin", `
        <div id="actions">
        <button id="next">PRÓXMOS</button>
        <button id="last">ANTERIORES</button> 
        <ul id="roundUl">
        </ul>
        </div>
        `)
    divRounds.setAttribute("style", "padding: 10px;")
    listGames(round)
    const next = document.querySelector("#next")
    next.addEventListener("click", () => {
        if(round > 17){
            next.setAttribute('disabled', '')
        }else{
            round = round + 1
            showRounds(round) 
        }
    })
    const last = document.querySelector("#last")
    last.addEventListener("click", () => {
        if(round == 1){
            last.setAttribute('disabled', '')
        }else{
            round = round - 1
            showRounds(round) 
        }
    })
}

export async function listGames(round){
    const ul = document.querySelector("#roundUl")
    ul.innerHTML = ""
    const games = await listGamesController(round)
    console.log(games)
    games.forEach((item) => {
    ul.insertAdjacentHTML("afterend", `
        <li>
        <section>
        <p> ${item.idTeamHome} [${item.goalHome}] X [${item.goalAway}] ${item.idTeamAway} Rodada:${item.round}</p>
        </section>
        </li>
        `)
    });
}

export async function listRound(round){
    const ul = document.querySelector("#roundOne")
    ul.innerHTML = ""
    const games = await listGamesController(round)
    games.forEach((item) => {
    ul.insertAdjacentHTML("afterend", `
        <li>
        <section>
        <p> ${item.idTeamHome} [${item.goalHome}] X [${item.goalAway}] ${item.idTeamAway} Rodada:${item.round}</p>
        </section>
        </li>
        `)
    });
}