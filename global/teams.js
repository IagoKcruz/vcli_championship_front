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

export function tableTeams() {
    const tableTeamsUl = document.querySelector("#tableTeamsUl")
    tableTeamsUl.insertAdjacentHTML("afterbegin", `
    <li>GRE (Gremio)</li>
    <li> int (inter)</li>
    `)
    tableTeamsUl.setAttribute("style", "padding:5px; margin-bottom: 10px;")
}

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