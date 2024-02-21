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

export async function searchPlayerController(idPlayer) {
    try {
        const res = await fetch(url+`admin//searchPlayerByName/${idPlayer}`)
        const resJson = await res.json();
        return resJson
    } catch (error) {
        console.log(error)
    }
}

export function playersDiv(idTeam) {
    const tableDiv = document.querySelector("#players"+idTeam)
    tableDiv.insertAdjacentHTML("afterbegin", `
    <ul id="playersUl${idTeam}">
    </ul>
    `)
    tableDiv.setAttribute("style", "padding: 10px; margin-top: 10px;") 
}

export async function showPlayers(idTeam) {
    const playersUl = document.querySelector("#playersUl"+idTeam)
    const dataBase = await listPlayerInTimeModel(idTeam)
    console.log(dataBase)
    if(dataBase.length == 0){
            playersUl.insertAdjacentHTML("beforeend", `
            <li >
            <p> NENHUM JOGADOR ENCONTRADO </p>
            </li>
            `)
            playersUl.setAttribute("style", "padding: 10px;")            
    }else{
        dataBase.forEach(item => {
            playersUl.insertAdjacentHTML("afterbegin", `
            <li id="playerLi">
            <div>
            <img src="" alt="">
            </div>
            <div>
            <p> NOME: ${item.playerName}</p>
            <p> IDADE: ${item.age}</p>
            <p> TIME: ${item.team}</p>
            <p> POSIÇÃO: ${item.position}</p>
            </div>
            <li>
            `)
            playersUl.setAttribute("style", "padding:10px;")
        })
    }

}

