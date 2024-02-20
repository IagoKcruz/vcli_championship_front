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
            teamAwai: game.awai,
            league: game.league,
        }
        const bodyJson = JSON.stringify(items)
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