const my_headers = {
    "Content-Type": "application/json"
}
const url = "http://localhost:3000/"

export function tableChampion() {
    const tableDiv = document.querySelector("#tableChampion")
    tableDiv.insertAdjacentHTML("afterbegin", `
    <button value="1" class="openclose" id="tableOC">
    <p>TABELA</p>
    <img src="/global/img/fechar.png" id="imgTable" alt="abrir">
    </button>
    <ul id="tableCampionUl">
    </ul>
    `)
    
}
export function openTableChampion() {
    const table = document.querySelector("#tableCampionUl")
    table.insertAdjacentHTML("afterbegin", `
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
    table.setAttribute("style", "margin-bottom: 10px;")
}
export function tableChampionOC() {
    const table = document.querySelector("#tableCampionUl")
    const imgTable = document.querySelector("#imgTable")
    const tableOC = document.querySelector("#tableOC")
    tableOC.addEventListener("click", () => {
        if (tableOC.value == 1) {
            table.innerHTML = ""
            tableOC.value = 2
            table.setAttribute("style", "padding:0px;")
            imgTable.src = "/global/img/abrir.png"
        } else {
            openTableChampion()
            tableOC.value = 1
            imgTable.src = "/global/img/fechar.png"
        }
    })
}
