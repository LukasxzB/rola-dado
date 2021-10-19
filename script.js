'use strict';

//constantes que serao utilizadas pra facilitar
const jogadores = [document.querySelector('.player--0'), document.querySelector('.player--1')]
const pontuacoes = [document.getElementById('score--0'), document.getElementById('score--1')]
const pontuacoesAtuais = [document.getElementById('current--0'), document.getElementById('current--1')]
const imagemDado = document.getElementById('dado')

//variaveis globais que serão utilizadas durante o jogo
var pontuacao = [0, 0], pontosAtuais = 0, jogadorAtual = 0, venceu = false

//listener ao clicar em novo jogo
document.getElementById('btn-novo-jogo').addEventListener('click', function () {

    //reseta todas as variaveis para 0
    pontuacao = [0, 0]
    pontosAtuais = 0
    jogadorAtual = 0

    //reseta o fundo dos jogadores
    jogadores[0].classList.remove('player--active')
    jogadores[1].classList.remove('player--active')
    jogadores[0].classList.add('player--active')

    //remove o vencedor
    venceu = false
    jogadores[0].classList.remove('player--winner')
    jogadores[1].classList.remove('player--winner')

    //atualiza os valores na tela
    pontuacoesAtuais[0].textContent = 0
    pontuacoesAtuais[1].textContent = 0
    pontuacoes[0].textContent = 0
    pontuacoes[1].textContent = 0

})

//listener ao clicar em rodar o dado
document.getElementById('btn-rolar').addEventListener('click', function () {

    //caso alguem venceu não roda
    if (venceu) { return }

    //sorteia um numero de 1 a 6 aleatóriamente, atualiza a imagem do dado e adiciona os pontos
    const sorteado = Math.floor(Math.random() * 5) + 1
    imagemDado.src = './imagens-dado/' + sorteado + '.png'
    pontosAtuais += sorteado

    //caso o número sorteado for igual a 1, muda o jogador
    if (sorteado == 1) {

        //remove os pontos atuais
        pontosAtuais = 0
        pontuacoesAtuais[jogadorAtual].textContent = 0

        //remove o fundo do jogador antigo e atualiza o novo
        jogadores[jogadorAtual].classList.remove('player--active')
        jogadorAtual = jogadorAtual == 0 ? 1 : 0
        jogadores[jogadorAtual].classList.add('player--active')

    } else {

        //caso contrário apenas atualiza a pontuação do jogador atual
        pontuacoesAtuais[jogadorAtual].textContent = pontosAtuais
    }
})

//listener ao clicar em guardar
document.getElementById('btn-guardar').addEventListener('click', function () {
    //caso alguem venceu não guarda
    if (venceu) { return }

    //adiciona os pontos ao saldo do jogador, remove como ativo e remove os pontos atuais dele
    pontuacao[jogadorAtual] += pontosAtuais
    pontuacoes[jogadorAtual].textContent = pontuacao[jogadorAtual]
    jogadores[jogadorAtual].classList.remove('player--active')
    pontuacoesAtuais[jogadorAtual].textContent = 0
    pontosAtuais = 0

    //caso o jogador chegou em 100 pontos ou mais ele venceu
    if (pontuacao[jogadorAtual] >= 100) {

        jogadores[jogadorAtual].classList.add('player--winner')
        venceu = true

    } else {

        //caso contrário continua o jogo com o outro jogador
        jogadorAtual = jogadorAtual == 0 ? 1 : 0
        jogadores[jogadorAtual].classList.add('player--active')

    }
})