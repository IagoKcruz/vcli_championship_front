import { validationLeague } from "../global/game.js"
import { playersDiv, showPlayers } from "../global/player.js"
import { listOneTeam } from "../global/teams.js"

export async function pageTeam(team){
    console.log(team)
    divTeam(team)
    window.location.href = ".././pageTeam"
}
export async function divTeam(team){
    const main = document.querySelector("main")
    const teamDB = await listOneTeam(team) 
    console.log(teamDB[0].idTeam)
    if(!teamDB){
        main.insertAdjacentHTML("afterbegin",`
        <div>
            <p>NÃO FOI POSSIVEL ENCONTRAR TIME OU JOGADORES</p>
        </div>
        `)
    }else{
        const league = await validationLeague()
        if (league[0].active == "false") {
        main.insertAdjacentHTML("afterbegin",`
        <div>
        <section>
            <section>
            <p>${teamDB[0].teamName}</p>
            <img src="" alt="">
            </section>
        </section>
        <div id="players${teamDB[0].idTeam}">
        </div>
        </div>
        `)
        }else{
            main.insertAdjacentHTML("afterbegin",`
            <div>
            <section>
                <p>${teamDB[0].teamName}</p>
                <img src="" alt="">
            </section>
            <div id="players${teamDB[0].idTeam}">
            </div>
            </div>
            `)
        }
    }
    playersDiv(teamDB[0].idTeam)
    showPlayers(teamDB[0].idTeam)
}



