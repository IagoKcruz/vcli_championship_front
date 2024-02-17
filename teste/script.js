


const times = ["Time1", "Time2", "Time3", "Time4", "Time5", "Time6", "Time7", "Time8", "Time9", "Time10"];
const rodadas = criarRodadas(times);

function criarRodadas(times) {
  const rodadas = [];
  for (let rodada = 1; rodada < times.length; rodada++) {
    const jogos = [];
    for (let i = 0; i < times.length / 2; i++) {
      const jogo = [times[i], times[times.length - 1 - i]];
      jogos.push(jogo);
    }
    rodadas.push({ rodada, jogos });
    // Rotaciona os times para a próxima rodada
    times.unshift(times.pop());
  }
  for (const rodada of rodadas) {
  console.log(`Rodada ${rodada.rodada}:`);
  for (const jogo of rodada.jogos) {
    //inserir no banco
    console.log(`${jogo[0]} vs ${jogo[1]}`);
  }
  const timesreverso = times.toReversed()
  criarRodadasVolta(timesreverso)
}
}




function criarRodadasVolta(times) {
  const rodadas_volta = [];
  let n_rodada = 10
  for (let rodada = 1; rodada < times.length; rodada++) {
    const jogos_volta = [];
    for (let i = 0; i < times.length / 2; i++) {
      const jogo_volta = [times[i], times[times.length - 1 - i]];
      jogos_volta.push(jogo_volta);
    }
    n_rodada++
    rodadas_volta.push({ n_rodada, jogos_volta });
    // Rotaciona os times para a próxima rodada
    times.unshift(times.pop());
  }
  for (const rodada_volta of rodadas_volta) {
  console.log(`Rodada ${rodada_volta.n_rodada}:`);
  for (const jogo_volta of rodada_volta.jogos_volta) {
    //10 - 19
    console.log(`${jogo_volta[0]} vs ${jogo_volta[1]}`);
  }
}
}






