import { showGame, updatePointController } from "../global/game.js"
import { listTeam } from "../global/teams.js"
import { toastify } from "../global/toastity.js"

const main = document.querySelector("main")

const GamedataBase = await showGame(5)
if (!GamedataBase) {
    console.log("nao deu")
} else {
    openGame(GamedataBase)
}
let teamHome, teamAway
let cardHome = 0
let cardAway = 0
let goalHome = 0
let goalAway = 0

async function openGame(game) {
    const teamDataBase = await listTeam()
    teamDataBase.forEach(item => {
        if (item.idTeam == game[0].idTeamHome) {
            teamHome = item.teamName
        } else if (item.idTeam == game[0].idTeamAway) {
            teamAway = item.teamName
        }
    });
    console.log(teamAway, teamHome)
    main.insertAdjacentHTML("afterbegin", `
<div>
<section>
<div>
    <section id="teamHome">
        <img src="../global/img/gol.png">
        <p>${teamHome}</p>
    </section>
    <span>
        <img src="../global/img/gol.png">
        <p id="goalHome">${goalHome}</p>
    </span>
    <span>
        <img src="../global/img/cartoes.png">
        <p id="cardHome">${cardHome}</p>
    </span>
    <div>
        <section class="butActions">                        
            <button id="moreGoalHome">+</button>
            <label>GOLS</label>                        
            <button id="lessGoalHome">-</button>
        </section>
        <section class="butActions">
            <button id="moreCardHome">+</button>
            <label>CARTÕES</label>                     
            <button id="lessCardHome">-</button>
        </section>
    </div>
</div>
<h1>x</h1>
<div>
    <section id="teamAwai">
        <p>${teamAway}</p>
        <img src="../global/img/gol.png">
    </section>
    <span>
        <img src="../global/img/gol.png">
        <p id="goalAway">${goalAway}</p>
    </span>
    <span>
        <img src="../global/img/cartoes.png">
        <p id="cardAway">${cardAway}</p>
    </span>
    <div>
        <section class="butActions">                        
            <button id="moreGoalAway">+</button>
            <label>GOLS</label>                        
            <button id="lessGoalAway">-</button>
        </section>
        <section class="butActions">
            <button id="moreCardAway">+</button>
            <label>CARTÕES</label>                     
            <button id="lessCardAway">-</button>
        </section>
    </div>
</div>
</section>
<button id="finishGame">
<input type="hidden" value="${game[0].idGame}" id="game">
FINALIZAR PARTIDA</button>
</div>
`)
    const goalHomeP = document.querySelector("#goalHome")
    const cardHomeP = document.querySelector("#cardHome")
    const goalAwaiP = document.querySelector("#goalAway")
    const cardAwaiP = document.querySelector("#cardAway")



    const moreGoalAway = document.querySelector("#moreGoalAway")
    moreGoalAway.addEventListener("click", async () => {
        goalAway = goalAway + 1
        goalAwaiP.innerHTML = goalAway
    })
    const lessGoalAway = document.querySelector("#lessGoalAway")
    lessGoalAway.addEventListener("click", async () => {
        if (goalAway == 0) {
            lessGoalAway.setAttribute('disabled', '')
        } else {
            goalAway = goalAway - 1
            goalAwaiP.innerHTML = goalAway
        }
    })
    const moreCardAway = document.querySelector("#moreCardAway")
    moreCardAway.addEventListener("click", async () => {
        cardAway = cardAway + 1
        cardAwaiP.innerHTML = cardAway
    })
    const lessCardAway = document.querySelector("#lessCardAway")
    lessCardAway.addEventListener("click", async () => {
        if (cardAway == 0) {
            lessCardAway.setAttribute('disabled', '')
        } else {
            cardAway = cardAway - 1
            cardAwaiP.innerHTML = cardAway
        }
    })



    const moreGoalHome = document.querySelector("#moreGoalHome")
    moreGoalHome.addEventListener("click", async () => {
        goalHome = goalHome + 1
        goalHomeP.innerHTML = goalHome
    })
    const lessGoalHome = document.querySelector("#lessGoalHome")
    lessGoalHome.addEventListener("click", async () => {
        if (goalHome == 0) {
            lessGoalHome.setAttribute('disabled', '')
        } else {
            goalHome = goalHome - 1
            goalHomeP.innerHTML = goalHome
        }
    })
    const moreCardHome = document.querySelector("#moreCardHome")
    moreCardHome.addEventListener("click", async () => {
        cardHome = cardHome + 1
        cardHomeP.innerHTML = cardHome
    })
    const lessCardHome = document.querySelector("#lessCardHome")
    lessCardHome.addEventListener("click", async () => {
        if (cardHome == 0) {
            lessCardHome.setAttribute('disabled', '')
        } else {
            cardHome = cardHome - 1
            cardHomeP.innerHTML = cardHome
        }

    })

    const finishGame = document.querySelector("#finishGame")
    finishGame.addEventListener("click",()=>{
        const game = document.querySelector("#game").value
        CountPointsTeam(game, goalAway, goalHome, cardAway, cardHome)
    })
}

async function CountPointsTeam(idGame , goalAway, goalHome, cardAway, cardHome){
    console.log(idGame, goalAway, goalHome, cardAway, cardHome)
        const div = document.createElement("div")
        div.classList.add("modal")
        main.appendChild(div)
        div.insertAdjacentHTML("afterbegin",`
        <div>DESEJA ENCERAR A PARTIDA</div>
        <button id="finish">TERMINAR PARTIDA</button>
        <button id="notFinish">VOLTAR PARA PARTIDA</button>
        `)
        const finishGame = document.querySelector("#finish")
        finishGame.addEventListener("click",async()=>{
            const points = await updatePointController(idGame, goalAway, goalHome, cardAway, cardHome)
            if(!points){
                toastify(erro,"Erro ao finalizar dados do jogo")
            }else{
                console.log("jogo finalizado")
            }
        })
        const notfinishGame = document.querySelector("#notFinish")
        notfinishGame.addEventListener("click",()=>{
            div.remove()   
        })
} 