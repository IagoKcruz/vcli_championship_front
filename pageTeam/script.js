import { validationLeague } from "../global/game.js"
import { playersDiv, showPlayers } from "../global/player.js"
import { listOneTeam } from "../global/teams.js"

divTeam()
export async function divTeam(){
    const teamStorage = localStorage.getItem("@team")
    const main = document.querySelector("main")
    console.log(teamStorage)
    const teamDB = await listOneTeam(teamStorage) 
    console.log(teamDB.length)
    if(teamDB.length == 0){
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
    playersDiv(teamDB[0].idTeam)
    showPlayers(teamDB[0].idTeam)
    }
}



