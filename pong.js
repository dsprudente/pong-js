//variáveis da bolinha -- posição inicial e tamanho
let xBolinha = 400;
let yBolinha = 300;
let diametro = 25;
let raio = diametro / 2;

//velocidade da bolinha no eixo x e y -- inicial x=8 e y=4
let xVelocidadeBolinha = 8;
let yVelocidadeBolinha = 4;

//variáveis da raquete esquerda -- posição inicial, altura e largura
let xRaqueteE = 10;
let yRaqueteE = 250;
let larguraRaqueteE = 10;
let alturaRaqueteE = 100;

//variáveis da raquete direita -- posição inicial, altura e largura
let xRaqueteD = 780;
let yRaqueteD = 250;
let larguraRaqueteD = 10;
let alturaRaqueteD = 100;

//velocidade das raquetes
let velocidadeRaqueteE = 10;
let velocidadeRaqueteD = 10;

//valor inicial do placar
let placarEsquerdo = 0;
let placarDireito = 0;

//fila de posição x da bolinha
let filaXBolinha = [0,0];

//retenção detecção de colisão
let atrasRaqueteE;
let atrasRaqueteD;

//retenção para iniciar o jogo
let comeeecaOJogo = false;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);
  mostraBolinha();
  detectaBorda();
  mostraRaqueteEsquerda();
  mostraRaqueteDireita();
  movimentaRaqueteDireita();
  movimentaRaqueteEsquerda();
  detectaColisao();
  pontoDireito();
  pontoEsquerdo();
  testeFila();
  iniciarJogo();
  reiniciarJogo();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += xVelocidadeBolinha;
  yBolinha += yVelocidadeBolinha;
}
  
function detectaBorda() {
  if (xBolinha > width - raio || xBolinha < raio) {
    xVelocidadeBolinha *= -1;
  }
  if (yBolinha > height - raio || yBolinha < raio) {
    yVelocidadeBolinha *= -1;
  }
}

function mostraRaqueteEsquerda() {
  rect(xRaqueteE, yRaqueteE, larguraRaqueteE, alturaRaqueteE);
}

function mostraRaqueteDireita() {
  rect(xRaqueteD, yRaqueteD, larguraRaqueteD, alturaRaqueteD);
}

function movimentaRaqueteDireita() {
  if (keyIsDown(UP_ARROW) && yRaqueteD > 0) {
    yRaqueteD -= velocidadeRaqueteD;
  }
  if (keyIsDown(DOWN_ARROW) && yRaqueteD < height - alturaRaqueteD){
    yRaqueteD += velocidadeRaqueteD;
  }
}

function movimentaRaqueteEsquerda() {
  if (keyIsDown(87) && yRaqueteE > 0) {
    yRaqueteE -= velocidadeRaqueteE;
  }
  if (keyIsDown(83) && yRaqueteE < height - alturaRaqueteE){
    yRaqueteE += velocidadeRaqueteE;
  }
}

function detectaColisao() {
  if (xBolinha < xRaqueteE + larguraRaqueteE + raio && xBolinha > xRaqueteE + raio && yBolinha > yRaqueteE && yBolinha < yRaqueteE + alturaRaqueteE && !atrasRaqueteE) {
    xVelocidadeBolinha *= -1;
    
  } else if(xBolinha > xRaqueteD - raio && xBolinha < xRaqueteD + larguraRaqueteD - raio && yBolinha > yRaqueteD && yBolinha < yRaqueteD + alturaRaqueteD && !atrasRaqueteD){
    xVelocidadeBolinha *= -1;
    }
}

function pontoDireito() {
  text(placarDireito, 472, 80);
  if (xBolinha < raio){
    placarDireito += 1;
  }
}

function pontoEsquerdo() {
  fill(255);
  textSize(64)
  text(placarEsquerdo, 272, 80);
  if (xBolinha > width - raio){
    placarEsquerdo += 1;
  }
}

function testeFila(){
  filaXBolinha.unshift(xBolinha);
  filaXBolinha.splice(2);
  if(filaXBolinha[0] > filaXBolinha[1]){
    atrasRaqueteD = false;
    atrasRaqueteE = true;
      } else if(filaXBolinha[0] < filaXBolinha[1]){
    atrasRaqueteD = true;
    atrasRaqueteE = false;
  }
}

function iniciarJogo(){
  if(keyIsDown(ENTER) || comeeecaOJogo === true){
    movimentaBolinha();
    comeeecaOJogo = true
  }
}

function reiniciarJogo(){
  if(keyIsDown(ESCAPE)){
    comeeecaOJogo = false;
    placarDireito = 0;
    placarEsquerdo = 0;
    xBolinha = 400;
    yBolinha = 300;
  }
}