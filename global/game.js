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

export async function validationLeague(){
    const leagueDb = await listLeagueModel()
    if(leagueDb[0].active =='false'){
        return false
    }else{
        return true
    }
}