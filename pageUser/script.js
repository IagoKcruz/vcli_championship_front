import { listRound, showRounds, validationLeague } from "../global/game.js"

const game = document.querySelector("#round")

openDayGame()
gamesChampion()

async function openDayGame() {
    const gamesDiv = document.querySelector("#round")
    const league = await validationLeague()
    if (league[0].active == "false") {
        gamesDiv.insertAdjacentHTML("afterbegin", `
        <p>NENHUMA LIGA ATIVA NO MOMENTO</p>
    `)
    gamesDiv.setAttribute("style", "padding:0px 10px; margin-bottom: 10px;")
    } else {
        gamesDiv.insertAdjacentHTML("afterbegin", `
        <ul id="roundOne">
        </ul>
        `)
        gamesDiv.setAttribute("style", "padding:0px 10px; margin-bottom: 10px;")
        listRound(3)
    }
}
const imgGame = document.querySelector("#imgGame")
const dayGameOC = document.querySelector("#dayGameOC")
dayGameOC.addEventListener("click", () => {
    if (dayGameOC.value == 1) {
        game.innerHTML = ""
        dayGameOC.value = 2
        game.setAttribute("style", "padding:0px;")
        imgGame.src = "/global/img/abrir.png"
    } else {
        openDayGame()
        dayGameOC.value = 1
        imgGame.src = "/global/img/fechar.png"
    }
})

async function gamesChampion() {
    const gamesDiv = document.querySelector("#rounds")
    const league = await validationLeague()
    if (league[0].active == "false") {
        gamesDiv.insertAdjacentHTML("afterbegin", `
        <p>NENHUMA LIGA ATIVA NO MOMENTO</p>
    `)
    gamesDiv.setAttribute("style", "padding:0px 10px 10px 10px; ")
    } else {
        showRounds(1)
    }
}
const divRounds = document.querySelector("#generate")
const gamesOC = document.querySelector("#gamesOC")
const imgGames = document.querySelector("#imgGames")
gamesOC.addEventListener("click", () => {
    if(gamesOC.value == 1){
        divRounds.setAttribute("style", "padding:0px;")
        divRounds.innerHTML = ""
        gamesOC.value = 2
        imgGames.src = "/global/img/abrir.png"
    }else {
        gamesChampion()
        gamesOC.value = 1
        imgGames.src = "/global/img/fechar.png"
    }
})


// async function openGames() {
//     const league = await validationLeague()
//     if (league[0].active == "false") {
//         games.insertAdjacentHTML("afterbegin", `
//         <p>NENHUMA LIGA ATIVA NO MOMENTO</p>
//         `)
//         games.setAttribute("style", "padding:0px 10px; margin-bottom: 10px;")
//     } else {
//         showRounds(1)
//         OpenCloseSection()
//     }

// }

// async function OpenCloseSection(){
//     const imgGames = document.querySelector("#imgGames")
//     const gamesOC = document.querySelector("#gamesOC")
//     const league = await validationLeague()
//     if (league[0].active == "false"){
//         gamesOC.addEventListener("click", () => {
//             if (gamesOC.value == 1) {
//                 games.innerHTML = ""
//                 gamesOC.value = 2
//                 games.setAttribute("style", "padding:0px;")
//                 games.setAttribute("style", "padding:0px; margin-bottom: 0px;")
//                 imgGames.src = "/global/img/abrir.png"
//             } else {
//                 openGames()
//                 games.insertAdjacentHTML("afterbegin", `<p>NENHUMA LIGA ATIVA NO MOMENTO</p>`)
//                 games.setAttribute("style", "padding:5px; margin-bottom: 10px;")
//                 gamesOC.value = 1
//                 imgGames.src = "/global/img/fechar.png"
//             }
//         })
//     }
// }



