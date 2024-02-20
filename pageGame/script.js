import { showGame } from "../global/game"

const main = document.querySelector("main")

const GamedataBase = showGame(5)
if(GamedataBase){
    openGame(GamedataBase)
}

function openGame(game){
main.insertAdjacentHTML("afterbegin",`
<section>
<div>
    <section id="teamHome">
        <img src="../global/img/gol.png">
        <p>${game.teamHome}</p>
    </section>
    <span>
        <img src="../global/img/gol.png">
        <p id="goalHome">${game.goalHome}</p>
    </span>
    <span>
        <img src="../global/img/cartoes.png">
        <p>0</p>
    </span>
    <div>
        <section class="butActions">                        
            <button id="butGoalAwai">+</button>
            <label>GOLS</label>                        
            <button id="butGoalAwai">-</button>
        </section>
        <section class="butActions">
            <button id="butGoalAwai">+</button>
            <label>CARTÕES</label>                     
            <button id="butGoalAwai">-</button>
        </section>
    </div>
</div>
<h1>x</h1>
<div>
    <section id="teamAwai">
        <p>${game.teamAwai}</p>
        <img src="../global/img/gol.png">
    </section>
    <span>
        <img src="../global/img/gol.png">
        <p id="goalAwai">${game.goalAwai}</p>
    </span>
    <span>
        <img src="../global/img/cartoes.png">
        <p>0</p>
    </span>
    <div>
        <section class="butActions">                        
            <button id="moretGoalAwai">+</button>
            <label>GOLS</label>                        
            <button id="lassGoalAwai">-</button>
        </section>
        <section class="butActions">
            <button id="moreCardAwai">+</button>
            <label>CARTÕES</label>                     
            <button id="lessGoalAwai">-</button>
        </section>
    </div>
</div>
</section>
<button id="finishGame">FINALIZAR PARTIDA</button>
`)    
}

