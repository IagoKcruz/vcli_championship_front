import { playersDiv, showPlayers } from "../global/player.js";
import { UlTeamOC, tableTeams, teamDiv } from "../global/teams.js";

teamDiv()
await tableTeams()
UlTeamOC()

async function liPlayers(){
    const playerLi = document.querySelectorAll("li")
    console.log(playerLi)
    playerLi.forEach(item => {
        item.addEventListener("click",async()=>{
            const id = document.querySelector(`#players${item.id}`)
            if(id){
                id.remove()
            }else{
            item.insertAdjacentHTML("beforeend",`
            <div id="players${item.id}">
            </div>
            `)
            playersDiv(item.id)
            showPlayers(item.id)                
            }
        })
    });
}
liPlayers()