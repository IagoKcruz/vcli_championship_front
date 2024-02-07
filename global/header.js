const body = document.body
body.insertAdjacentHTML("afterbegin", `
 <header>
   <button id="menu">MENU</button>
   <p>CAMPEONATO</p>
 </header>
`)

const menu = document.querySelector("#menu")
menu.addEventListener("click",()=>{
   body.insertAdjacentHTML("afterbegin", `
   <aside>
   <a href="">JOGADORES</a>
   <a href="">TIMES</a>
   <a href="">PARTIDAS</a>
   <button id="back">VOLTAR</button>
   </aside>
   `)
})
const butBack = document.querySelector("#back")
butBack.addEventListener("click",()=>{ 
    back("pageUser")
})

function back(action){
   console.log(action)
   window.location.href = `./${action}`
}
