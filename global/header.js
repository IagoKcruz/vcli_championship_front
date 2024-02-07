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
   const aside = document.querySelector("aside")
   const butBack = document.querySelector("#back")
   butBack.addEventListener("click",()=>{ 
      
      aside.remove()
})

})

