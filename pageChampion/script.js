import { insertGameModel, validationLeague } from "../global/game.js";
import { listTeam, tableTeams } from "../global/teams.js";

const main = document.querySelector("main")

const divRounds = document.querySelector("#rounds")
let selectDataBase = await validationLeague()
searchRounds()

async function searchRounds() {
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
                let teams =[]
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
        tableTeams()
    } else {
        showRounds()
    }
}

export function showRounds(games, rounds) {
    divRounds.innerHTML = "";
    const ul = document.createElement("ul")
    ul.id = "roundsUl"
    divRounds.appendChild(ul)
    games.forEach((item, index) => {
        if (rounds - 5 != 0) {
            rounds = rounds - 5
        }
        if (index < rounds) {
            ul.insertAdjacentHTML("afterbegin", `
                <li>
                <p>${item}</p>
                </li>
                `)
        }
    });
    divRounds.insertAdjacentHTML("afterbegin", `
        <div id="actions">
        <button id="next">PRÓXMOS</button>
        <button id="last">ANTERIORES</button> 
        </div>
        `)
    const next = document.querySelector("#next")
    next.addEventListener("click", () => {
        rounds = rounds + 5
        nextPage(rounds)
    })
    const last = document.querySelector("#last")
    last.addEventListener("click", () => {
        rounds = rounds - 5
        lastPage(rounds)
    })
}
function nextPage(rounds) {
    showRounds(games, rounds)
}
function lastPage(rounds) {
    showRounds(games, rounds)
}


let games = [];

async function generateRoundsChampion(teams, league) {
    //pegar id no banco
    //const teams = ["Time1", "Time2", "Time3", "Time4", "Time5", "Time6", "Time7", "Time8", "Time9", "Time10"];
    const rounds = [];
    for (let round = 1; round < teams.length; round++) {
        const games = [];
        for (let i = 0; i < teams.length / 2; i++) {
            const game = [teams[i], teams[teams.length - 1 - i]];
            games.push(game);
        }
        rounds.push({ round, games });
        teams.unshift(teams.pop());
    }
    for (const round of rounds) {
        for (const game of round.games) {
            const gameDB = {
                home: game[0],
                away: game[1],
                round: round.round,
                league: league
            }
            const insertGame = await insertGameModel(gameDB)
            if(!insertGame){
                //chama o toastify avisando que deu problema
                break
            }
            games.push(`${game[0]} vs ${game[1]} (${round.round})`)
        }
    }
    const teamsReverse = teams.toReversed()
    generateRoundsReturn(teamsReverse, league)
}
async function generateRoundsReturn(teams, league) {
    //pegar id no banco
    const rounds = [];
    let roundsReturn = 9
    for (let round = 1; round < teams.length; round++) {
        const games = [];
        for (let i = 0; i < teams.length / 2; i++) {
            const game = [teams[i], teams[teams.length - 1 - i]];
            games.push(game);
        }
        roundsReturn++
        rounds.push({ roundsReturn, games });
        // Rotaciona os teams para a próxima round
        teams.unshift(teams.pop());
    }
    for (const round of rounds) {
        for (const game of round.games) {
            const gameDB = {
                home: game[0],
                away: game[1],
                league: league
            }
            const insertGame = await insertGameModel(gameDB)
            if(!insertGame){
                //chama o toastify avisando que deu problema
                break
            }
            games.push(`${game[0]} vs ${game[1]} (${round.roundsReturn})`)

        }
    }
    showRounds(games, 5)
}


