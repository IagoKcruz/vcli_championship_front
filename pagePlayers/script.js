const main = document.querySelector("main")
const tableDiv = document.querySelector("#players")

playersDiv()
showPlayers()


function playersDiv() {
    tableDiv.insertAdjacentHTML("afterbegin", `
    <button value="1" class="openclose" id="playersOC">
    <p>JOGADORES</p>
    <img src="/global/img/fechar.png" id="imgPlayers" alt="abrir">
    </button>
    <ul id="playersUl">
    </ul>
    `)

}
function showPlayers() {
    const playersUl = document.querySelector("#playersUl")
    playersUl.insertAdjacentHTML("afterbegin", `
    <li id="playerLi">
    <div>
    <img src="" alt="">
    </div>
    <div>
    <p> NOME: </p>
    <p> IDADE: </p>
    <p> IDADE: </p>
    <p> POSIÇÃO: </p>
    </div>
    <li>
    `)
    playersUl.setAttribute("style", "padding:5px; margin-bottom: 10px;")
}
const playersUl = document.querySelector("#playersUl")
const imgPlayers = document.querySelector("#imgPlayers")
const playersOC = document.querySelector("#playersOC")
playersOC.addEventListener("click", () => {
    if (playersOC.value == 1) {
        playersUl.innerHTML = ""
        playersOC.value = 2
        playersUl.setAttribute("style", "padding:0px;")
        imgPlayers.src = "/global/img/abrir.png"
    } else {
        showPlayers()
        playersOC.value = 1
        imgPlayers.src = "/global/img/fechar.png"
    }
})

const updatePlayer = document.querySelector("#playerLi")
updatePlayer.addEventListener("click", () => {
    const div = document.createElement("div")
    div.classList.add("modal")
    main.appendChild(div)
    div.insertAdjacentHTML("afterbegin", `  
    <button id="exitPlayer">X</button>
    <form id="formPlayer">
    <div>
        <label>Nome</label>
        <input type="text" id="name">
    </div>
    <div>
        <label>Foto</label>
        <input type="text" id="photo">
    </div>
    <div>
        <label>Idade</label>
        <input type="number" id="age" min="18" oninput="validity.valid||(value='');">
    </div>
    <div>
        <label>Posição</label>
        <select id="position"></select>
    </div>
    <div>
        <label>Time</label>
        <select id="team"></select>
    </div>
    <div>
    <button id="update">ALTERAR</button>
    <button id="inative">INATIVAR</button>
    </div>
    </form>
    `)
    const butExit = document.querySelector("#exitPlayer")
    butExit.addEventListener("click",()=>{
        div.remove();
    })
    const butUpdate = document.querySelector("#update")
    butUpdate.addEventListener("click",(event)=>{
        event.preventDefault()
        updateAction()
    })
    const butInative = document.querySelector("#inative")
    butInative.addEventListener("click",(event)=>{
        event.preventDefault()
        inativeAction()
    })
})

function updateAction(){
    const div = document.createElement("div")
    div.classList.add("modal")
    main.appendChild(div)
    div.insertAdjacentHTML("afterbegin", `  
    <div>
    <label>CONFIRMAR ALTERAÇÃO</label>
    <button id="confirmUpdate">SIM</button>
    <button id="exitConfirm">NÃO</button>
    </div>
    `)
    const confirmUpdate = document.querySelector("#confirmUpdate")
    confirmUpdate.addEventListener("click",()=>{
        console.log("banco de dados")
        window.location.reload()
    })
    const exitConfirm = document.querySelector("#exitConfirm")
    exitConfirm.addEventListener("click",()=>{
        div.remove();
    })
}

function inativeAction(){
    const div = document.createElement("div")
    div.classList.add("modal")
    main.appendChild(div)
    div.insertAdjacentHTML("afterbegin", `
    <div>
    <label>CONFIRMAR INATIVIDADE PARA O JOGADOR</label>
    <button id="confirmInative">SIM</button>
    <button id="exitConfirm">NÃO</button> 
    </div>
    `)
    const confirmInative = document.querySelector("#confirmInative")
    confirmInative.addEventListener("click",()=>{
        console.log("banco de dados")
        window.location.reload()
    })
    const exitConfirm = document.querySelector("#exitConfirm")
    exitConfirm.addEventListener("click",()=>{
        div.remove();
    })
}