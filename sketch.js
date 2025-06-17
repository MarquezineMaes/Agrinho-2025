// Quiz elaborado com ajuda de IA. prompt:crie um quiz no p5js sobre "origem dos alimentos".
  let perguntas = [
  {
    pergunta: "De onde vem o arroz?",
    opcoes: ["Brasil", "China", "Índia", "Egito"],
    resposta: 1 // Resposta correta é "China"
  },
  {
    pergunta: "Onde a batata foi cultivada pela primeira vez?",
    opcoes: ["Europa", "América do Sul", "África", "Ásia"],
    resposta: 1 // Resposta correta é "América do Sul"
  },
  {
    pergunta: "O chocolate é originário de qual país?",
    opcoes: ["México", "Brasil", "França", "Espanha"],
    resposta: 0 // Resposta correta é "México"
  },
  {
    pergunta: "De onde vem o café?",
    opcoes: ["Brasil", "Colômbia", "Etiópia", "Vietnã"],
    resposta: 2 // Resposta correta é "Etiópia"
  }
];

let perguntaAtual = 0;
let acertos = 0;
let respostaSelecionada = -1; // -1 significa nenhuma opção selecionada
let proximaPerguntaBotao;
let quizFinalizado = false; // Variável para controlar o estado do quiz
let estadoDoJogo = 'capa'; // Novo estado: 'capa', 'quiz', 'resultado'
let botaoComecar; // Novo botão para iniciar o quiz

function setup() {
  createCanvas(600, 400);
  textSize(18);
  textAlign(CENTER);
  noLoop(); // Desativa o loop de draw automático para controlar as atualizações manualmente

  // Criando o botão "Próxima Pergunta" (ou "Reiniciar Quiz")
  proximaPerguntaBotao = createButton('Próxima Pergunta');
  proximaPerguntaBotao.position(width / 2 - 80, height - 50);
  proximaPerguntaBotao.mousePressed(avancarOuReiniciarQuiz);
  proximaPerguntaBotao.hide(); // Esconde o botão inicialmente

  // Criando o botão "Começar Quiz" para a capa
  botaoComecar = createButton('Começar Quiz');
  botaoComecar.position(width / 2 - 60, height / 2 + 50);
  botaoComecar.mousePressed(iniciarQuiz);
}

function draw() {
  // A cor de fundo geral do canvas continua sendo definida aqui
  // Mas a função exibirCapa() vai sobrescrever para a capa
  background(255);

  if (estadoDoJogo === 'capa') {
    // Exibe a tela de capa
    exibirCapa();
  } else if (estadoDoJogo === 'quiz') {
    // Exibe o quiz
    // Exibe título do quiz
    textSize(24);
    text("Quiz: A Origem dos Alimentos", width / 2, 40);

    // Exibe pergunta
    textSize(20);
    text(perguntas[perguntaAtual].pergunta, width / 2, 100);

    // Exibe opções
    let yOffset = 150;
    for (let i = 0; i < perguntas[perguntaAtual].opcoes.length; i++) {
      // Cor de fundo das opções
      if (respostaSelecionada === i) {
        fill(200, 255, 200); // Cor de destaque para a opção selecionada
      } else {
        fill(255);
      }
      rect(width / 2 - 150, yOffset - 20, 300, 40, 10);

      // Cor do texto das opções
      fill(0);
      text(perguntas[perguntaAtual].opcoes[i], width / 2, yOffset);
      yOffset += 60;
    }
  } else if (estadoDoJogo === 'resultado') {
    // Exibe o resultado
    mostrarResultado();
  }
}

function exibirCapa() {
  // Define o fundo como roxo (RGB: 128, 0, 128)
  background(128, 0, 128);

  // Define a cor do texto para branco para melhor contraste no fundo roxo
  fill(255);
  
  textSize(32);
  text("Quiz sobre a origem dos alimentos", width / 2, height / 2 - 60);
  textSize(18);
  // O texto foi ajustado para refletir o número total de perguntas (perguntas.length)
  text("Responda as perguntas sobre a origem dos alimentos e\nno final do Quiz vai aparecer quantos acertos você teve no total de " + perguntas.length + " perguntas feitas.", width / 2, height / 2);
  
  botaoComecar.show(); // Garante que o botão "Começar Quiz" está visível
}

function iniciarQuiz() {
  estadoDoJogo = 'quiz'; // Muda o estado para o quiz
  botaoComecar.hide(); // Esconde o botão "Começar Quiz"
  redraw(); // Redesenha para exibir a primeira pergunta
}

function mousePressed() {
  // Apenas processa cliques se o jogo estiver no estado de quiz
  if (estadoDoJogo !== 'quiz') {
    return;
  }

  let yOffset = 150;

  // Verifica se o clique foi em alguma opção
  for (let i = 0; i < perguntas[perguntaAtual].opcoes.length; i++) {
    if (mouseX > width / 2 - 150 && mouseX < width / 2 + 150 &&
      mouseY > yOffset - 20 && mouseY < yOffset + 20) {

      // Se uma opção já foi selecionada, não permite selecionar outra
      if (respostaSelecionada !== -1) {
        return;
      }

      respostaSelecionada = i;

      // Verifica se a resposta está correta
      if (i === perguntas[perguntaAtual].resposta) {
        acertos++;
      }

      proximaPerguntaBotao.show(); // Mostra o botão "Próxima Pergunta"
      redraw(); // Atualiza a tela para destacar a opção selecionada
      break; // Sai do loop após encontrar a opção clicada
    }
    yOffset += 60;
  }
}

function avancarOuReiniciarQuiz() {
  if (estadoDoJogo === 'resultado') {
    // Reinicia o quiz
    perguntaAtual = 0;
    acertos = 0;
    respostaSelecionada = -1;
    estadoDoJogo = 'capa'; // Volta para a capa ao reiniciar
    proximaPerguntaBotao.html('Próxima Pergunta');
    proximaPerguntaBotao.hide(); // Esconde o botão ao reiniciar
    botaoComecar.show(); // Mostra o botão de começar novamente
    redraw();
  } else {
    // Avança para a próxima pergunta
    perguntaAtual++;
    respostaSelecionada = -1; // Reseta a seleção para a nova pergunta

    // Verifica se todas as perguntas foram respondidas
    if (perguntaAtual >= perguntas.length) {
      estadoDoJogo = 'resultado'; // Define o estado como resultado
      proximaPerguntaBotao.html('Reiniciar Quiz'); // Muda o texto do botão
    } else {
      proximaPerguntaBotao.hide(); // Esconde o botão para a próxima pergunta
    }
    redraw(); // Redesenha a tela
  }
}

function mostrarResultado() {
  background(255); // Fundo branco para a tela de resultado
  fill(0); // Texto preto para a tela de resultado
  textSize(32);
  text("Você acertou " + acertos + " de " + perguntas.length + " perguntas!", width / 2, height / 2 - 40);
  textSize(18);
  text("Clique em 'Reiniciar Quiz' para jogar novamente.", width / 2, height / 2 + 20);
  proximaPerguntaBotao.show(); // Garante que o botão está visível para reiniciar
}