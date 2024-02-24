import { validationLeague } from "./game.js";
import { playersDiv, showPlayers } from "./player.js";

const my_headers = {
    "Content-Type": "application/json"
}
const url = "http://localhost:3000/"

export async function listTeam() {
    try {
        const res = await fetch(url + "admin/teams")
        const resJson = await res.json();
        return resJson
    } catch (error) {
        return error
    }
}

export async function listOneTeam(idTeam) {
    try {
        const res = await fetch(url + `admin/searchTeamByName/${idTeam}`)
        const resJson = await res.json();
        return resJson
    } catch (error) {
        return false
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
        return error
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
    tableTeamsUl.setAttribute("style", "margin-bottom: 10px;")
    const teamDB = await listTeam()
    teamDB.forEach(item => {
        tableTeamsUl.insertAdjacentHTML("afterbegin", `
        <li id="${item.idTeam}" class="teamLi" value="0" >
        <section id="sectionLi${item.idTeam}">
        ${item.teamName} | ${item.teamTag}     
        <img src="/global/img/abrir.png"  id="imgTeams${item.idTeam}" alt="abrir">
        </section>
        </li>
        `)
        const playerLi = document.querySelector(".teamLi")
        playerLi.setAttribute("style", " display: flex; flex-direction: column;")

    });
    const playerLi = document.querySelectorAll("li")
    playerLi.forEach(item => {
        item.addEventListener("click", async () => {
            if (item.value == 0) {
                const butImage = document.querySelector(`#imgTeams${item.id}`)
                const section = document.querySelector(`#sectionLi${item.id}`)
                butImage.src = "/global/img/fechar.png"
                item.insertAdjacentHTML("beforeend", `
                <div id="players${item.id}">
                </div>
                `)
                const id = document.querySelector(`#players${item.id}`)
                id.innerHTML = ""
                playersDiv(item.id)
                showPlayers(item.id)
                item.value = 1
                section.addEventListener("click", () => {
                    butImage.src = "/global/img/abrir.png"
                    id.remove()
                })
            } else {
                item.value = 0
            }
        })
    });
}

export async function tableTeamsToGenerateRounds() {
    const tableTeamsUl = document.querySelector("#tableTeamsUl")
    tableTeamsUl.setAttribute("style", "margin-bottom: 10px; margin-top: 15px;")
    const teamDB = await listTeam()
        teamDB.forEach(item => {
            tableTeamsUl.insertAdjacentHTML("afterbegin", `
            <li id="${item.idTeam}" value="0" > 
            <section>
            <p>${item.teamName} | ${item.teamTag}</p>     
            <section>
            <button id="pageTeam${item.idTeam}" value="${item.idTeam}">
            <p>GERENCIAR TIME</p>
            <img src=""../global/img/proximo.png"" alt=""> 
            </button>
            </section>
            </section>
            </li>
            `)
            tableTeamsUl.setAttribute("style", "padding:0px 10px 10px 10px;")
        });
        const playerLi = document.querySelectorAll("li")
        playerLi.forEach(item => {
            const butPageTeam = document.querySelector(`#pageTeam${item.id}`)
            butPageTeam.addEventListener("click",()=>{
                localStorage.setItem("@team",item.id)
                window.location.href = ".././pageTeam"
        })
    });
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
            tableTeams()
            teamsOC.value = 1
            imgTeams.src = "/global/img/fechar.png"
        }
    })
}

export function UlTeamOCGenerate() {
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
            tableTeamsToGenerateRounds()
            teamsOC.value = 1
            imgTeams.src = "/global/img/fechar.png"
        }
    })
}
