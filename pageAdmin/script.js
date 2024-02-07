const teamsOC = document.querySelector("#teamsOC")
const imgTeams = document.querySelector("#imgTeams")
const tableTeamsUl = document.querySelector("#tableTeamsUl")

tableTeams(tableTeamsUl)

function tableTeams() {
    tableTeamsUl.insertAdjacentHTML("afterbegin", `
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
    <li>10</li>
    `)
    tableTeamsUl.setAttribute("style", "padding:5px; margin-bottom: 10px;")
}

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