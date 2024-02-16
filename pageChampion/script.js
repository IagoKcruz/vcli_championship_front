import { tableTeams } from "../global/teams.js";

const main = document.querySelector("main")

const divRounds = document.querySelector("#rounds")

searchRounds()

function searchRounds(){
    //consulta banco
    // if(selectDataBase > 0){
    //     return true;
    // }else{
    //     return false;   
    // }
    return false
}

if(!searchRounds()){
    divRounds.insertAdjacentHTML("afterbegin", `
    <div>
    <ul id="tableTeamsUl">
    </ul>
    <button id="generateRounds">GERAR RODADAS DO CAMPEONATO</button>
    </div>
    `
    )
    tableTeams()    
}

export function showRounds(games, rounds){
    console.log(games)
        divRounds.innerHTML = "";
        const ul = document.createElement("ul")
        ul.id = "roundsUl"
        divRounds.appendChild(ul)
        games.forEach((item, index) => {
            if(rounds-5 != 0){
                rounds = rounds - 5
            }
            if(index < rounds){
                ul.insertAdjacentHTML("afterbegin",`
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
        next.addEventListener("click", ()=>{
            rounds = rounds +5
            nextPage(rounds)
        })
        const last = document.querySelector("#last")
        last.addEventListener("click", ()=>{
            rounds = rounds -5
            lastPage(rounds)
        })
}
function nextPage(rounds){
    showRounds(games, rounds)
}
function lastPage(rounds){
    showRounds(games, rounds)
}



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
    insertRounds.addEventListener("click", (event) => {
        div.remove()
        generateroundsChampion()
    })
    const cancelRounds = document.querySelector("#cancelRounds")
    cancelRounds.addEventListener("click", (event) => {
        div.remove()
    })
})

let games = [];

function generateroundsChampion(){
    //pegar id no banco
    const teams = ["Time1", "Time2", "Time3", "Time4", "Time5", "Time6", "Time7", "Time8", "Time9", "Time10"];
    const rounds = [];
    for (let round = 1; round < teams.length; round++) {
    const games = [];
    for (let i = 0; i < teams.length / 2; i++) {
      const game = [teams[i], teams[teams.length - 1 - i]];
      games.push(game);
    }
    rounds.push({ round, games });
    // Rotaciona os teams para a próxima round
    teams.unshift(teams.pop());
    }
    for (const round of rounds) {
    for (const game of round.games) {
    //inserir no banco
    games.push(`${game[0]} vs ${game[1]} (${round.round})`)
    console.log(`${game[0]} vs ${game[1]} (${round.round})`);
    }
    }    
    const teamsReverse = teams.toReversed()
    generateRoundsReturn(teamsReverse)
}
function generateRoundsReturn(teams){
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
    games.push(`${game[0]} vs ${game[1]} (${round.roundsReturn})`)
    console.log(`${game[0]} vs ${game[1]} (${round.roundsReturn})`);
    }
    }    
    console.log(games)
    showRounds(games, 5)
}


