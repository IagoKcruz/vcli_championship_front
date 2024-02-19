const main = document.querySelector("main")

function openGame(game){

main.insertAdjacentHTML("afterbegin",`
<section id="teams">
<div id="teamHome">
    <div>
        <p>${game.TeamHome}</p>
        <p>${game.GoalHome}</p>
    </div>
</div>
<span>X</span>
<div id="teamAwai">
    <div>
        <p>${game.TeamAwai}</p>
        <p>${game.GoalAwai}</p>
    </div>
</div>
</section>
<section id="">
<button id="butTeamHome">TeamHome</button>
<button id="butTeamAwai">TeamAwai</button>
</section>
<section>
<ul class="playersUl" id="playersHome">
    <li>
        <p>NOME</p>
        <div id="actions">
            <p>CARTÃO</p><button>-</button>
            <p>${game}</p><button>+</button>
            <p>GOLS</p><button>-</button>
            <p>${game}</p><button>+</button>
        </div>
    </li>
</ul>
<ul class="playersUl" id="playersAwai">
    <li>
        <p>NOME</p>
        <div id="actions">
            <p>CARTÃO</p><button>-</button>
            <p>${game}</p><button>+</button>
            <p>GOLS</p><button>-</button>
            <p>${game}</p><button>+</button>
        </div>
    </li>
</ul>
</section>
<button id="finishGame">FINALIZAR PARTIDA</button>
`)    

}

