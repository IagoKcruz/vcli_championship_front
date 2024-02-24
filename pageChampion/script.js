import { generateRoundsChampion, showRounds, showRoundsAdmin, validationLeague } from "../global/game.js";
import { listTeam, tableTeamsToGenerateRounds } from "../global/teams.js";

const main = document.querySelector("main")
main.insertAdjacentHTML("afterbegin", `
<div id="generate">
</div>
`)

export async function tokenVal() {
    const token = localStorage.getItem("@token");
    console.log(token)
    if (token != null && token.trim() != "") {
        return true
    } else {
        return false
    }
}

const token = await tokenVal();
if (token) {
    const divRounds = document.querySelector("#generate")
    const league = await validationLeague()
    if (league[0].active == "false") {
        divRounds.insertAdjacentHTML("afterbegin", `
            <div>
            <ul id="tableTeamsUl">
            </ul>
            <button id="generateRounds">GERAR RODADAS DO CAMPEONATO</button>
            </div>
            `
        )
        divRounds.setAttribute("style", "padding:10px 0px;")
        tableTeamsToGenerateRounds()
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

                        teams.push(teamsDataBase[i].idTeam)
                    }
                    const selectDataBase = await validationLeague()
                    generateRoundsChampion(teams, selectDataBase[0].idLeague)
                }
            })
            const cancelRounds = document.querySelector("#cancelRounds")
            cancelRounds.addEventListener("click", (event) => {
                div.remove()
            })

        })
    } else {
        showRoundsAdmin(1)
    }

} else {
    showRounds(1)
}




