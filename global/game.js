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