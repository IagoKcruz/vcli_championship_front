const my_headers = {
    "Content-Type": "application/json"
}
const url = "http://localhost:3000/"

export async function listLeagueModel() {
    try {
        const res = await fetch("http://localhost:3000/admin/listLeague")
        const resJson = await res.json();
        return resJson
    } catch (error) {
        console.log(error)
    }
}
export async function showGame(game) {
    try {
        const res = await fetch(url + `admin/listGame/${game}`)
        const resJson = await res.json();
        return resJson
    } catch (error) {
        console.log(error)
    }
}
export async function listGamesController(round) {
    try {
        const res = await fetch(url + `admin/listGames/${round}`)
        const resJson = await res.json();
        return resJson
    } catch (error) {
        console.log(error)
    }
}

export async function validationLeague() {
    const leagueDb = await listLeagueModel()
    if (leagueDb[0].active == 'false') {
        return leagueDb
    } else {
        return leagueDb
    }
}

export async function insertGameModel(game) {
    try {
        const items = {
            idTeamHome: game.home,
            idTeamAway: game.away,
            round: game.round,
            idLeague: game.league
        }
        const bodyJson = JSON.stringify(items)
        console.log(bodyJson)
        const res = await fetch(
            url + "admin/insertGame",
            {
                headers: my_headers,
                method: "POST",
                body: `${bodyJson}`,
                autorization: ""
            })
        return res;
    } catch (error) {
        console.log(error)
    }
}

export async function updatePointController(idGame, goalHome, goalAway, cardHome, cardAway) {
    try {
        const items = {
            idGame: idGame,
            goalHome: goalHome,
            goalAway: goalAway,
            cardHome: cardHome,
            cardAway: cardAway
        }
        const bodyJson = JSON.stringify(items); console.log(bodyJson)
        const res = await fetch(
            url + "admin/updateGame",
            {
                headers: my_headers,
                method: "PATCH",
                body: `${bodyJson}`
            })
        return res;
    } catch (error) {
        console.log(error)
    }
}

export async function generateRoundsChampion(teams, league) {
    const rounds = [];
    for (let round = 1; round < teams.length; round++) {
        const games = [];
        for (let i = 0; i < teams.length / 2; i++) {
            const game = [teams[i], teams[teams.length - 1 - i]];
            games.push(game);
        }
        rounds.push({ round, games });
        teams.unshift(teams.pop());
    }
    for (const round of rounds) {
        for (const game of round.games) {
            const gameDB = {
                home: game[0],
                away: game[1],
                round: round.round,
                league: league
            }
            const insertGame = await insertGameModel(gameDB)
            if (!insertGame) {
                return false
            }
        }
    }
    const teamsReverse = teams.toReversed()
    generateRoundsReturn(teamsReverse, league)
}

async function generateRoundsReturn(teams, league) {
    //pegar id no banco
    const rounds = [];
    let roundsReturn = 9
    for (let round = 1; round < teams.length; round++) {
        const games = [];
        for (let i = 0; i < teams.length / 2; i++) {
            const game = [teams[i], teams[teams.length - 1 - i]];
            games.push(game);
        }
        roundsReturn++
        rounds.push({ roundsReturn, games });
        // Rotaciona os teams para a próxima round
        teams.unshift(teams.pop());
    }
    for (const round of rounds) {
        for (const game of round.games) {
            const gameDB = {
                home: game[0],
                away: game[1],
                round: round.roundsReturn,
                league: league
            }
            const insertGame = await insertGameModel(gameDB)
            if (!insertGame) {
                break
            }
        }
    }
    showRounds(1)
}

export async function showRounds(round) {
    const divRounds = document.querySelector("#generate")
    divRounds.innerHTML = "";
    divRounds.insertAdjacentHTML("afterbegin", `
        <div id="actions">
        <button id="next">PRÓXMOS</button>
        <button id="last">ANTERIORES</button> 
        <ul id="roundUl">
        </ul>
        </div>
        `)
    divRounds.setAttribute("style", "padding: 10px;")
    listGames(round)
    const next = document.querySelector("#next")
    next.addEventListener("click", () => {
        if (round > 17) {
            next.setAttribute('disabled', '')
        } else {
            round = round + 1
            showRounds(round)
        }
    })
    const last = document.querySelector("#last")
    last.addEventListener("click", () => {
        if (round == 1) {
            last.setAttribute('disabled', '')
        } else {
            round = round - 1
            showRounds(round)
        }
    })
}
export async function showRoundsAdmin(round) {
    const divRounds = document.querySelector("#generate")
    divRounds.innerHTML = "";
    divRounds.insertAdjacentHTML("afterbegin", `
        <div id="actions">
        <button id="next">PRÓXMOS</button>
        <button id="last">ANTERIORES</button> 
        <ul id="roundUl">
        </ul>
        </div>
        `)
    divRounds.setAttribute("style", "padding: 10px;")
    listGamesAdmin(round)
    const next = document.querySelector("#next")
    next.addEventListener("click", () => {
        if (round > 17) {
            next.setAttribute('disabled', '')
        } else {
            round = round + 1
            showRoundsAdmin(round)
        }
    })
    const last = document.querySelector("#last")
    last.addEventListener("click", () => {
        if (round == 1) {
            last.setAttribute('disabled', '')
        } else {
            round = round - 1
            showRoundsAdmin(round)
        }
    })
}

export async function listGames(round) {
    const ul = document.querySelector("#roundUl")
    ul.innerHTML = ""
    const games = await listGamesController(round)
    console.log(games)
    games.forEach(async (item) => {
        ul.insertAdjacentHTML("afterend", `
        <li>
        <section class="showrounds">
        <p> ${item.idTeamHome} [${item.goalHome}] X [${item.goalAway}] ${item.idTeamAway} Rodada:${item.round}</p>
        </section>
        </li>
        `)
    });

}
export async function listGamesAdmin(round) {
    const ul = document.querySelector("#roundUl")
    ul.innerHTML = ""
    const games = await listGamesController(round)
    console.log(games)
    games.forEach(async (item) => {
            ul.insertAdjacentHTML("afterend", `
        <li class="listaGamesAdmin" id="${item.idGame}">
        <section class="showrounds">
        <p> ${item.idTeamHome} [${item.goalHome}] X [${item.goalAway}] ${item.idTeamAway} Rodada:${item.round}</p>
        <button id="img${item.idGame}">MUDARJOGO</button>
        </section>
        </li>
        `)
        const playerLi = document.querySelectorAll("li.listaGamesAdmin")
        playerLi.forEach(item => {
                console.log(item)
                const butImage = document.querySelector(`#img${item.id}`)
                butImage.addEventListener("click", () => {
                console.log("aqui")
                localStorage.setItem("@game", item.id)
                localStorage.removeItem("@team")
                window.location.href = ".././pageGame"
            })
        });

    });

}


export async function listRound(round) {
    const ul = document.querySelector("#roundOne")
    ul.innerHTML = ""
    const games = await listGamesController(round)
    games.forEach((item) => {
        ul.insertAdjacentHTML("afterend", `
        <li>
        <section class="showrounds">
        <p> ${item.idTeamHome} [${item.goalHome}] X [${item.goalAway}] ${item.idTeamAway} Rodada:${item.round}</p>
        </section>
        </li>
        `)
    });
}