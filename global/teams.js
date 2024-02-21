const my_headers = {
    "Content-Type": "application/json"
}
const url = "http://localhost:3000/"

export async function listTeam() {
    try {
        const res = await fetch(url+"admin/teams")
        const resJson = await res.json();
        return resJson
    } catch (error) {
        console.log(error)
    }
}

export async function listOneTeam(idTeam) {
    try {
        const res = await fetch(url+`admin/searchTeamByName/${idTeam}`)
        const resJson = await res.json();
        return resJson
    } catch (error) {
        console.log(error)
    }
}

export async function insertTeamModel(team) {
    try {
        const items = {
            teamName: team.name,
            teamTag: team.tag
        }
        const bodyJson = JSON.stringify(items)
        const res = await fetch(
            url + "admin/insertTeam",
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
export function teamDiv() {
    const teams = document.querySelector("#teams")
    teams.insertAdjacentHTML("afterbegin", `
    <button value="1" class="openclose" id="teamsOC">
    <p>TIMES</p>
    <img src="/global/img/fechar.png" id="imgTeams" alt="abrir">
    </button>
    <ul id="tableTeamsUl">
    </ul>
    `)
}


export async function tableTeams() {
    const tableTeamsUl = document.querySelector("#tableTeamsUl")
    tableTeamsUl.setAttribute("style", "padding:5px; margin-bottom: 10px;")
    const teamDB = await listTeam()
    teamDB.forEach(item => {
        tableTeamsUl.insertAdjacentHTML("afterbegin", `
        <li id="${item.idTeam}" value="0" > ${item.teamName} | ${item.teamTag}     
        <img src="/global/img/abrir.png"  id="imgTeams${item.idTeam}" alt="abrir">
        </li>
        `)
    });
}
// tableTeamsUl.insertAdjacentHTML("afterbegin", `
// <li>
// <section>        
// <p>${item.teamName} [${item.teamTag}]</p>
// </section>
// <button>
// <p>GERENCIAR TIME</p>
// <img src=""../global/img/proximo.png"" alt=""> 
// </button>
// </li>
// `)

export function UlTeamOC() {
    const tableTeamsUl = document.querySelector("#tableTeamsUl")
    const teamsOC = document.querySelector("#teamsOC")
    const imgTeams = document.querySelector("#imgTeams")
    teamsOC.addEventListener("click", () => {
        if (teamsOC.value == 1) {
            teamsOC.value = 2
            tableTeamsUl.innerHTML = ""
            tableTeamsUl.setAttribute("style", "padding:0px;")
            imgTeams.src = "/global/img/abrir.png"
        } else {
            tableTeams(tableTeamsUl)
            teamsOC.value = 1
            imgTeams.src = "/global/img/fechar.png"
        }
    })
}