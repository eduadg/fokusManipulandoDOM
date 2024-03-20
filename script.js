const contexto = document.querySelector("html");
const focobt = document.querySelector(".app__card-button--foco");
const curtobt = document.querySelector(".app__card-button--curto");
const longobt = document.querySelector(".app__card-button--longo");
const botoes = document.querySelectorAll(".app__card-button");
const imagem = document.querySelector(".app__image")
const stopPlayImage = document.querySelector(".app__card-primary-butto-icon")
const titulo = document.querySelector(".app__title");
const btcomecar = document.querySelector("#start-pause");
const btccomecarpausar = document.querySelector("#start-pause span")
const musica = document.getElementById("alternar-musica");
const som = new Audio("/sons/luna-rise-part-one.mp3");
const play = new Audio ("/sons/play.wav")
const beep = new Audio("/sons/beep.mp3");
const pauseAudio = new Audio("/sons/pause.mp3");
const timer = document.querySelector("#timer")
////////////////////////
let tempo = 1500; 
let idInterval = null; 
////////////////////////

som.loop = true;

focobt.addEventListener("click", () => {
  mudacontexto("foco");
  focobt.classList.add("active");
  tempo = 1500;
  mostrarTempo();
});

curtobt.addEventListener("click", () => {
  mudacontexto("descanso-curto");
  curtobt.classList.add("active");
  tempo = 300;
  mostrarTempo();
});

longobt.addEventListener("click", () => {
  mudacontexto("descanso-longo");
  longobt.classList.add("active");
  tempo = 900;
  mostrarTempo();
});

musica.addEventListener("change", () => {
  if (musica.checked) {
    som.play();
  } else {
    som.pause();
  }
});

function mudacontexto(novoContexto) {
  mostrarTempo();
  contexto.setAttribute("data-contexto", novoContexto); // Muda o contexto da página, não dos botões
  imagem.setAttribute("src", `/imagens/${novoContexto}.png`);
  botoes.forEach((botao) => {
    botao.classList.remove("active");
  });

  switch (novoContexto) {
    case "foco":
      titulo.innerHTML = `  Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;

    case "descanso-curto":
      titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong"> Faça uma pausa curta!</strong>`;
      break;

    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
    default:
      break;
  }
}



btcomecar.addEventListener('click', start )

function cronometro() {
  if (tempo <=0) {
    tocarBeep();
    btccomecarpausar.textContent="Começar"
    stopPlayImage.src='/imagens/play_arrow.png'
    alert("tempo finalizado!");
    zerar();
    return;
  }
  tempo -= 1;
  mostrarTempo();
}

function start() {
  // Verifica se o cronômetro já terminou completamente.
  if (tempo <= 0) {
      reiniciarCronometro();
      // Não iniciar o cronômetro automaticamente, apenas reiniciar o tempo.
      // O usuário pode clicar novamente para iniciar o cronômetro.
  } else if (idInterval) {
      // Caso o cronômetro esteja rodando, pausá-lo.
      tocaPause();
      btccomecarpausar.textContent = "Começar";
      stopPlayImage.src='/imagens/play_arrow.png';
      zerar();
  } else {
      // Se o cronômetro não estiver rodando e o tempo não estiver terminado, inicie-o.
      idInterval = setInterval(cronometro, 1000);
      tocarPlay();
      btccomecarpausar.textContent = "Pausar";
      stopPlayImage.src='/imagens/pause.png';
  }
}


function zerar() {
  clearInterval(idInterval)
  idInterval = null;
}

function mostrarTempo() {
  let minutos = Math.floor(tempo / 60);
  let segundos = Math.floor(tempo % 60);

  const minutosString = String(minutos).padStart(2, '0')
  const segundosString = String(segundos).padStart(2, '0')

  const tempoFormatado = `${minutosString}:${segundosString}`

  timer.textContent = tempoFormatado;
}



function reiniciarCronometro() {
  const contextoAtual = contexto.getAttribute("data-contexto");
  switch (contextoAtual) {
      case "foco":
          tempo = 1500;
          break;
      case "descanso-curto":
          tempo = 300;
          break;
      case "descanso-longo":
          tempo = 900;
          break;
      default:

          tempo = 1500; //
          break;
  }
}
  mostrarTempo(); // Atualiza o display do tempo

function tocarPlay() {
  play.play();
}
function tocarBeep() {
  beep.play();
}

function tocaPause() {
  pauseAudio.play();
}