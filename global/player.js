const my_headers = {
    "Content-Type": "application/json"
}
const url = "http://localhost:3000/"

export async function insertPlayerModel(player) {
    try {
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
        console.log(idTeam)
        const res = await fetch(url+`admin/listPlayersInTeam/idTeam=${idTeam}`)
        const resJson = await res.json();
        return resJson
    } catch (error) {
        console.log(error)
    }
}





