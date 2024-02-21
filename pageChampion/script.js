import { insertGameModel, searchRounds, } from "../global/game.js";
import { listTeam, tableTeams } from "../global/teams.js";

const main = document.querySelector("main")

searchRounds()

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
            if (!insertGame) {
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
                round: round.roundsReturn,
                league: league
            }
            const insertGame = await insertGameModel(gameDB)
            console.log(`${game[0]} vs ${game[1]} (${round.roundsReturn})`)
            console.log(insertGame)
            if (!insertGame) {
                //chama o toastify avisando que deu problema
                break
            }
            games.push(`${game[0]} vs ${game[1]} (${round.roundsReturn})`)

        }
    }
    showRounds()
}


