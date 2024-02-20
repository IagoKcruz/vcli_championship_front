import { UlTeamOC, tableTeams, teamDiv } from "../global/teams";

teamDiv()
await tableTeams()
UlTeamOC()

async function liPlayers(){
    const playerLi = document.querySelectorAll("li")
    console.log(playerLi)
}
liPlayers()