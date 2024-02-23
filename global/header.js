const body = document.body
body.insertAdjacentHTML("afterbegin", `
  <header>
  <button id="menu">MENU</button>
  <p>CAMPEONATO</p>
  </header>
`)

const menu = document.querySelector("#menu")
menu.addEventListener("click", () => {
  const token = localStorage.getItem("@token_user");
  if(token){
    body.insertAdjacentHTML("afterbegin", `
    <aside>
    <a href="../pageAdmin">HOME</a>
    <a href="../pageTeams">TIMES/JOGADORES</a>
    <a href="../pageChampion">RODADAS</a>
    <a href="../sair">SAIR</a>
    <button id="back">VOLTAR</button>
    </aside>
    `)
    const aside = document.querySelector("aside")
    const butBack = document.querySelector("#back")
    butBack.addEventListener("click", () => {
      aside.remove()
      window.history.back()
    })
  }
  body.insertAdjacentHTML("afterbegin", `
   <aside>
   <a href="../pageTeams">TIMES/JOGADORES</a>
   <a href="../pageUser">HOME</a>
   <a href="../pageChampion">RODADAS</a>
   <button id="back">VOLTAR</button>
   </aside>
   `)
  const aside = document.querySelector("aside")
  const butBack = document.querySelector("#back")
  butBack.addEventListener("click", () => {
    aside.remove()
    window.history.back()
  })

})

//${session == 1?"../pageAdmin":"../pageUser"}