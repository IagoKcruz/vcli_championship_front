import { insertGameModel, validationLeague } from "../global/game.js";
import { tableTeamsToGenerateRounds } from "../global/teams.js";

const main = document.querySelector("main")
const divRounds = document.querySelector("#createrounds")
let selectDataBase = await validationLeague()
let roundGame = 1
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
    }else{
        showRounds(roundGame)
}


export async function generateRoundsChampion(teams, league) {
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
            if (!insertGame) {
                return false
            }
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
                round: round.roundsReturn,
                league: league
            }
            const insertGame = await insertGameModel(gameDB)
            if (!insertGame) {
                break
            }
        }
    }
    searchRounds()
}


