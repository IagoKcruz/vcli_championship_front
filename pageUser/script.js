
// openDayGame()
// openTableChampion()
// openGames()

function openTableChampion(){
    const table = document.querySelector("#tableCampion")
    table.insertAdjacentHTML("afterbegin", `
    <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    </ul>
    `)
}
function openDayGame(){
    const game = document.querySelector("#dayGame")
    game.insertAdjacentHTML("afterbegin", `
    <div>A x B (14 hrs)</div>
    `)
}
function openGames(){
    const game = document.querySelector("#games")
    game.insertAdjacentHTML("afterbegin", `
    <div>
    <button id="nest">Próximos Jogos</button>
    <button id="last">Jogos Anteriores</button>
    </div>
    <div id="dategames">
    </div>

    `)
}