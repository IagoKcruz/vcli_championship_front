import { UlTeamOC, tableTeams, tableTeamsToGenerateRounds, teamDiv } from "../global/teams.js";


teamDiv()
const token = localStorage.getItem("@token_user");
if(token){
   await tableTeamsToGenerateRounds()    
}else{
   await tableTeams()   
}

UlTeamOC()

