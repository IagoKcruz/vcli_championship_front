import { playersDiv, showPlayers } from "../global/player.js";
import { UlTeamOC, tableTeams, teamDiv } from "../global/teams.js";

teamDiv()
await tableTeams()
UlTeamOC()

const playerLi = document.querySelectorAll("li")
playerLi.forEach(item => {
    item.addEventListener("click",async()=>{
            if(item.value == 0){
                const butImage = document.querySelector(`#imgTeams${item.id}`)
                butImage.src = "/global/img/fechar.png"
                item.insertAdjacentHTML("beforeend",`
                <div id="players${item.id}">
                </div>
                `)
                const id = document.querySelector(`#players${item.id}`)
                id.innerHTML = ""
                playersDiv(item.id)
                showPlayers(item.id)
                item.value = 1
                butImage.addEventListener("click",()=>{
                    butImage.src = "/global/img/abrir.png"
                    console.log(item.value)
                id.remove()   
                })   
            }else{
                item.value = 0
            }  
        })
});
