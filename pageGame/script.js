import { showGame, updatePointController } from "../global/game.js"
import { listTeam } from "../global/teams.js"
import { toastify } from "../global/toastity.js"

const main = document.querySelector("main")

const GamedataBase = await showGame(localStorage.getItem("@game"))
if (!GamedataBase) {
console.log("nao deu")
} else {
openGame(GamedataBase)
}

async function openGame(game) {
    let cardHome = 0
    let cardAway = 0
    let goalHome = 0
    let goalAway = 0
    main.insertAdjacentHTML("afterbegin", `
<div  id="space1">
<section>
<div class="space2">
    <section id="teamHome">
        <img src="../global/img/gol.png">
        <p>${game[0].teamNameHome}</p>
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
<div class="space2">
    <section id="teamAwai">
        <p>${game[0].teamNameAway}</p>
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

    const lessCardHome = document.querySelector("#lessCardHome")
    const lessGoalHome = document.querySelector("#lessGoalHome")
    const lessGoalAway = document.querySelector("#lessGoalAway")
    const lessCardAway = document.querySelector("#lessCardAway")

    const moreGoalAway = document.querySelector("#moreGoalAway")
    moreGoalAway.addEventListener("click", async () => {
        lessGoalAway.removeAttribute('disabled')
        goalAway = goalAway + 1
        goalAwaiP.innerHTML = goalAway
    })
    
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
        lessCardAway.removeAttribute('disabled')
        cardAway = cardAway + 1
        cardAwaiP.innerHTML = cardAway
    })
    
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
        lessGoalHome.removeAttribute('disabled')
        goalHome = goalHome + 1
        goalHomeP.innerHTML = goalHome
    })
    
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
        lessCardHome.removeAttribute('disabled')
        cardHome = cardHome + 1
        cardHomeP.innerHTML = cardHome
    })
    
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
                localStorage.removeItem("@game")
                window.location.href = ".././pageAdmin"
            }
        })
        const notfinishGame = document.querySelector("#notFinish")
        notfinishGame.addEventListener("click",()=>{
            div.remove()   
        })
} 