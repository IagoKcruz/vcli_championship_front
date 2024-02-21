import { validationLeague } from "../global/game.js"
import { playersDiv, showPlayers } from "../global/player.js"
import { listOneTeam } from "../global/teams.js"

divTeam()
export async function divTeam(){
    const main = document.querySelector("main")
    const teamDB = await listOneTeam(7) 
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
            <section>
            <button id="active" value="1">ATIVO</button>
            <button id="inative" value="0">INATIVO</button>
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



