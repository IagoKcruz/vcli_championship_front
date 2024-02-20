const body = document.body
body.insertAdjacentHTML("afterbegin", `
  <header>
  <div id="headerTitle">
  <button id="menu">MENU</button>
  <p>CAMPEONATO</p>
  <div>
  <section id="spaceSearch">
  <img id="iconSearch" src="../global/img/lupa.png">
  <input class="inputSearch" type="text" id="search">
  <input class="inputSearch" type="date">
  </section>
  </header>
`)

const menu = document.querySelector("#menu")
menu.addEventListener("click", () => {

  body.insertAdjacentHTML("afterbegin", `
   <aside>
   <a href="../pagePlayers">JOGADORES</a>
   <a href="">TIMES</a>
   <a href="../pageAdmin">HOME</a>
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