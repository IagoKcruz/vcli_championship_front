import { playersDiv, showPlayers } from "../global/player.js";
import { UlTeamOC, tableTeams, teamDiv } from "../global/teams.js";

teamDiv()
await tableTeams()
UlTeamOC()

async function liPlayers(){
    const playerLi = document.querySelectorAll("li")
    playerLi.forEach(item => {
        item.addEventListener("click",async()=>{
            const butImage = document.querySelector(`#imgTeams${item.id}`)
            butImage.src = "/global/img/fechar.png"
            item.insertAdjacentHTML("beforeend",`
            <div id="players${item.id}">
            </div>
            `)
            playersDiv(item.id)
            showPlayers(item.id)
            close(item.id)
        })
    });

}
liPlayers()

function close(idBut){
    const butImage = document.querySelector(`#imgTeams${idBut}`)
    const id = document.querySelector(`#players${idBut}`)
    butImage.addEventListener("click",()=>{
        id.remove()     
        
    })   
}