
openDayGame()
openTableChampion()
openGames()

function openTableChampion(){
    const table = document.querySelector("#tableCampionUl")
    table.insertAdjacentHTML("afterbegin", `
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
    <li>10</li>
    `)
}
function openDayGame(){
    const game = document.querySelector("#dayGamesUl")
    //consulta ao banco por jogos na data de hoje
    game.insertAdjacentHTML("afterbegin", `
    <li>
    <p> A [0] x B [0] (05/02/2023 15 hrs)</p>
    </li>
    <li>
    <p> C [0] x D [0] (05/02/2023 16 hrs)</p>
    </li>
    <li>
    <p> E [0] x F [0] (05/02/2023 17 hrs)</p>
    </li>
    `)
}
function openGames(){
    const games = document.querySelector("#games")
    games.insertAdjacentHTML("beforebegin", `
    <div>
    <button id="next">Próximos Jogos</button>
    <button id="last">Jogos Anteriores</button>
    </div>
    `)
    const next = document.querySelector("#next")
    const last = document.querySelector("#last")
    next.addEventListener("click",()=>{
        nextGame()
    })
    last.addEventListener("click",()=>{
        lastGame()
    })
}

const dateGames = document.querySelector("#dateGames")

function nextGame(){
    dateGames.innerHTML = ""
    //consulta ao bando de dados para pegar os jogos
    //resultado foreach()...
    dateGames.insertAdjacentHTML("afterbegin",`
    <li>
    <p> A [1] x C [3] (04/02/2023 15 hrs)</p>
    </li>
    <li>
    <p> D [1] x F [3] (04/02/2023 15 hrs)</p>
    </li>
    <li>
    <p> B [1] x E [3] (04/02/2023 15 hrs)</p>
    </li>
    `)
}
function lastGame(){
    dateGames.innerHTML = ""
    //consulta ao bando de dados para pegar os jogos
    //resultado foreach()...
    dateGames.insertAdjacentHTML("afterbegin",`
    <li>
    <p> C [0] x D [0] (06/02/2023 15 hrs)</p>
    </li>
    <li>
    <p> A [0] x E [0] (06/02/2023 16 hrs)</p>
    </li>
    <li>
    <p> B [0] x F [0] (06/02/2023 17 hrs)</p>
    </li>
    `)
}

    const tableOC = document.querySelector("#tableOC")
    tableOC.addEventListener("click",()=>{
        
    })
    const dayGameOC = document.querySelector("#dayGameOC")
    dayGameOC.addEventListener("click",()=>{

    })
    const gamesOC = document.querySelector("#gamesOC")
    gamesOC.addEventListener("click",()=>{
        
    })

