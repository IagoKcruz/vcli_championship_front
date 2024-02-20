const my_headers = {
    "Content-Type": "application/json"
}
const url = "http://localhost:3000/"

export async function insertPlayerModel(player) {
    try {
        console.log(player)
        const items = {
            playerName: player.name,
            idTeam: player.team,
            age: player.age,
            idPosition: player.position,
            status: player.status
        }
        const bodyJson = JSON.stringify(items)
        const res = await fetch(
            url + "admin/insertPlayer",
            {
                headers: my_headers,
                method: "POST",
                body: bodyJson
            })
        return res;
    } catch (error) {
        console.log(error)
    }
}

export async function listPosition() {
    try {
        const res = await fetch(url+"admin/listPosition")
        const resJson = await res.json();
        return resJson
    } catch (error) {
        console.log(error)
    }
}

export async function listPlayerInTimeModel(idTeam) {
    try {
        const res = await fetch(url+`admin/listPlayersInTeam/${idTeam}`)
        const resJson = await res.json();
        return resJson
    } catch (error) {
        console.log(error)
    }
}

export function playersDiv() {
    const tableDiv = document.querySelector("#players")
    tableDiv.insertAdjacentHTML("afterbegin", `
    <button value="1" class="openclose" id="playersOC">
    <p>JOGADORES</p>
    <img src="/global/img/fechar.png" id="imgPlayers" alt="abrir">
    </button>
    <ul id="playersUl">
    </ul>
    `)
}

export async function showPlayers() {
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

export function UlPlayerOC(){
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
}


