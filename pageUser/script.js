

openPage()

function openTableChampion(){
    const table = document.querySelector("#tableCampion")
    table.insertAdjacentHTML("afterbegin", `
    `)
}
function openDayGame(){
    const game = document.querySelector("#dayGame")
    game.insertAdjacentHTML("afterbegin", `
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