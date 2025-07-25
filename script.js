const tabuleiroJogo = document.getElementById("tabuleiro-jogo");
const reiniciarBtn = document.getElementById("reiniciar-btn");
const contadorJogadasDisplay = document.getElementById("contador-jogadas");
const temporizadorDisplay = document.getElementById("temporizador");
const dificuldadeSelect = document.getElementById("dificuldade");

let cartas = [];
let cartasViradas = [];
let cartasPareadas = [];
let contadorJogadas = 0;
let cronometro;
let tempoDecorrido = 0;

// criar as cartas
function criarCartas(numCartas) {
    const valoresCartas = [];
    for (let i = 1; i <= numCartas / 2; i++) {
        valoresCartas.push(i, i);  // criando pares de cartas e adiconando ao array
    }
    // embaralhar as cartas
    cartas = valoresCartas.sort(() => Math.random() - 0.5);
    renderizarCartas(numCartas);
}

// renderizar as cartas no tabuleiro
function renderizarCartas(numCartas) {
    tabuleiroJogo.innerHTML = ""; // limpando tabuleiro
    const numColunas = Math.sqrt(numCartas); // fazendo o calculo número de cartas com raiz quadrada porque ela vezes ela nao funciona
    tabuleiroJogo.setAttribute('data-colunas', numColunas); 

    cartas.forEach((valor, indice) => {
        const cartaElemento = document.createElement("div");
        cartaElemento.classList.add("carta");
        cartaElemento.setAttribute("data-id", indice);

        // criando do verso e frente da carta
        const frente = document.createElement("div");
        frente.classList.add("frente");

        const verso = document.createElement("div");
        verso.classList.add("verso");
        verso.textContent = '';  // no início fica vazio se nao da a resposta

        cartaElemento.appendChild(frente);
        cartaElemento.appendChild(verso);

        tabuleiroJogo.appendChild(cartaElemento);

        // agora adicionar clique pra funcionar
        cartaElemento.addEventListener("click", () => virarCarta(cartaElemento, valor));
    });
}

function virarCarta(cartaElemento, valor) {
    // verificando se menos de 2 cartas estão viradas e se a carta não está virada ou pareada
    if (cartasViradas.length < 2) {
        if (!cartaElemento.classList.contains("virada")) {
            cartaElemento.classList.add("virada"); // Adiciona a classe 'virada' para iniciar a rotação
            
            // Aguarde a transição de rotação antes de mostrar o número
            setTimeout(() => {
                const verso = cartaElemento.querySelector(".verso");
                verso.textContent = valor; // mostrar o valor da carta
                verso.style.opacity = 1; // visível após a rotação
            }, 300); // tempo deve ser igual ao tempo de transição da rotação
            
            cartasViradas.push(cartaElemento); // adicionar a carta virada ao array

            // duas cartas estão viradas então conta as jogadas
            if (cartasViradas.length === 2) {
                contadorJogadas++; // adiciona jogada
                contadorJogadasDisplay.textContent = contadorJogadas; // atualizando o display
                setTimeout(verificarPareia, 1000); // espera um segundo e verifica as cartas
            }
        }
    }
}

// verificando se as cartas são iguais
function verificarPareia() {
    const [primeiraCarta, segundaCarta] = cartasViradas;
    const valorPrimeiraCarta = primeiraCarta.querySelector(".verso").textContent;
    const valorSegundaCarta = segundaCarta.querySelector(".verso").textContent;

    if (valorPrimeiraCarta === valorSegundaCarta) {
        primeiraCarta.classList.add("pareada");
        segundaCarta.classList.add("pareada");
        cartasPareadas.push(primeiraCarta, segundaCarta); // se forem iguais ela somente vao ficar verdes
    } else {
        primeiraCarta.classList.remove("virada"); // tudo o que nao for pareado vai ser removido o virado
        segundaCarta.classList.remove("virada");

        // se não forem iguais esconde o texto
        primeiraCarta.querySelector(".verso").textContent = '';
        segundaCarta.querySelector(".verso").textContent = '';
    }

    cartasViradas = [];

    // verificando se acabou
    if (cartasPareadas.length === cartas.length) {
        clearInterval(cronometro); // janela que limpa o temporizador
        alert(`Parabéns! Você completou o jogo em ${formatarTempo(tempoDecorrido)} e ${contadorJogadas} jogadas`);
    }
}

// fazer cronômetro
function iniciarCronometro() {
    cronometro = setInterval(() => {
        tempoDecorrido++;
        temporizadorDisplay.textContent = formatarTempo(tempoDecorrido);
    }, 1000); // o setInterval é usado para executar a função a cada 1 seg 
}

// definindo tempo
function formatarTempo(segundos) {
    let minutos = Math.floor(segundos / 60);
    let segundosRestantes = segundos % 60;
    // colocar minutos e segundos sempre com dois dígitos
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundosRestantes = segundosRestantes < 10 ? '0' + segundosRestantes : segundosRestantes;
    // retornar ele ja formatado
    return minutos + ':' + segundosRestantes;
}

// reiniciar o jogo ou seja tudo
function reiniciarJogo() {
    cartasPareadas = [];
    contadorJogadas = 0;
    tempoDecorrido = 0;
    contadorJogadasDisplay.textContent = contadorJogadas;
    temporizadorDisplay.textContent = "00:00";
    clearInterval(cronometro);
    const dificuldade = parseInt(dificuldadeSelect.value);
    criarCartas(dificuldade * dificuldade);
    iniciarCronometro();
}

//cliques no btn de reiniciar e dificudades
dificuldadeSelect.addEventListener("change", () => reiniciarJogo());
reiniciarBtn.addEventListener("click", reiniciarJogo);

reiniciarJogo();

//Desafio Paulinho 04/06/2025
 
-> Criar tela de apresentação consumindo dados de uma API
  -> Adicionar no AndroidManifest a permissão para consumo de API
	<uses-permission android:name="android.permission.INTERNET" />
<application android:supportsRtl="true" />
   -> Utilizar Lib do Retrofit
    -> http://localhost:3000/apresentacao
 
-> A tela de apresentação deve conter na parte inferir 2 botões fixos
   -> O scroll da tela deve acontecer sem que as informações da parte superior deixem de ser mostradas
   -> Primeiro botão deve abrir um Bottom Sheet Dialog que conterá as informações vindas da API no 
	Objeto presentationFlow.modal
       -> Preencher os dados de titulo, subtítulo e descrição + Os textos dos botões
   -> Segundo Botão deve levar o usuário para uma tela em Branco com um botão no centro com a ação de voltar
 
IMPORTANTE: 
Utilizar o Material UI para criação das interfaces
  -> Botões, Sheets: bottom, Lists

-> Commitar todas as alterações
   -> Commit inicial da estrutura do projeto
   -> Commit depois de adicionar as libs
   -> Commit depois de criar as estrutura das telas em XML
   -> Commit depois de criar as lógicas dentro dos arquivos KT
Padrão do Commit: 
Feat: <o que eu fiz>
 
 
Links referencia: 
Criação do Bottom Sheet Dialog: https://medium.com/@stephenmuindi241/bottom-sheet-dialogs-in-android-c13800357df9
Doc do contrato da API: https://bancopan.atlassian.net/wiki/spaces/PBD/pages/4999446625/EP+FGTS+WL+-+Contrato+do+Fluxo+de+Apresenta+o
Material UI: https://m2.material.io/components/buttons/android#text-button