const my_headers = {
    "Content-Type": "application/json"
}
const url = "http://localhost:3000/"

export async function listLeagueModel() {
    try {
        const res = await fetch(url+"admin/listLeague")
        const resJson = await res.json();
        return resJson
    } catch (error) {
        console.log(error)
    }
}
export async function showGame(game) {
    try {
        const res = await fetch(url+`admin/listGame/${game}`)
        const resJson = await res.json();
        return resJson
    } catch (error) {
        console.log(error)
    }
}
export async function listGamesController(round) {
    try {
        const res = await fetch(url+`admin/listGames/${round}`)
        const resJson = await res.json();
        return resJson
    } catch (error) {
        console.log(error)
    }
}

export async function validationLeague(){
    const leagueDb = await listLeagueModel()
    if(leagueDb[0].active =='false'){
        return leagueDb
    }else{
        return leagueDb
    }
}

export async function insertGameModel(game) {
    try {
        const items = {
            teamHome: game.home,
            teamAway: game.away,
            round: game.round,
            league: game.league
        }
        const bodyJson = JSON.stringify(items);console.log(bodyJson)
        const res = await fetch(
            url + "admin/insertGame",
            {
                headers: my_headers,
                method: "POST",
                body: `${bodyJson}`
            })
        return res;
    } catch (error) {
        console.log(error)
    }
}

export async function listGames(round){
    const ul = document.querySelector("#roundUl")
    ul.innerHTML = ""
    const games = await listGamesController(round)
    games.forEach((item) => {
    ul.insertAdjacentHTML("afterend", `
        <li>
        <section>
        <p> ${item.idTeamHome} </p>x
        <p> ${item.idTeamAway} </p>
        <p> ${item.round} </p>
        </section>
        </li>
        `)
    });
}