let canvas;
let ctx;
let appleImg;

window.onload = function(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
	appleImg = new Image();

	appleImg.src = 'https://i.pinimg.com/originals/17/b0/28/17b02860355b8ee475d8d2190fee7e83.png';

    document.addEventListener("keydown", keyDownEvent);

    //Renderiza 8 vezes por segundo
    let x = 8;
    setInterval(desenharJogo, 1000 / x);
};
    

//Criação da tela de jogo
let tamanhoTela = tamanhoCaminho = 20;
let nextX = nextY = 0;

//Criação da cobra
let defaultTamanhoCauda = 3;
let tamanhoCauda = defaultTamanhoCauda;
let caminhoCobra = [];
let cobraEixoX = cobraEixoY = 10;

//Criação da comida
let appleX = (appleY = 15);

function desenharJogo(){
    cobraEixoX += nextX;
    cobraEixoY += nextY;

    if (cobraEixoX < 0){
        cobraEixoX = tamanhoTela -1;
    }
    
    if (cobraEixoX > tamanhoTela - 1){
        cobraEixoX = 0;
    }
    
    if (cobraEixoY < 0){
        cobraEixoY = tamanhoTela -1;
    }
    
    if (cobraEixoY > tamanhoTela - 1){
        cobraEixoY = 0;
    }

    //Se a cobra comer o alimento
    if (cobraEixoX == appleX && cobraEixoY == appleY){
        tamanhoCauda++;
        appleX = Math.floor(Math.random() * tamanhoTela);
        appleY = Math.floor(Math.random() * tamanhoTela);
    }

	ctx.fillStyle = '#333';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.font = '16px Arial';
	ctx.fillStyle = '#fff';
	ctx.textAlign = 'center';
	ctx.fillText('Jogo da Cobrinha', canvas.width / 2, 50);

    ctx.fillStyle = "#48ade8";
    for (let i = 0; i < caminhoCobra.length; i++){
        ctx.fillRect(
            caminhoCobra[i].x * tamanhoCaminho,
            caminhoCobra[i].y * tamanhoCaminho,
            tamanhoCaminho,
            tamanhoCaminho
        );
        if (caminhoCobra[i].x == cobraEixoX && caminhoCobra[i].y == cobraEixoY){
            tamanhoCauda = defaultTamanhoCauda;
        }
    }

    ctx.drawImage(appleImg, appleX * tamanhoCaminho, appleY * tamanhoCaminho, tamanhoCaminho, tamanhoCaminho);

    caminhoCobra.push({
        x:cobraEixoX,
        y:cobraEixoY
    });
    while (caminhoCobra.length > tamanhoCauda){
        caminhoCobra.shift();
    }
}

function keyDownEvent(event){
    // nextX e nextY representam as direções que a cobra irá percorrer
    // nos eixos X e Y, respectivamente
    switch(event.keyCode){
        case 37:
            nextX = -1;
            nextY = 0;
            break;
        case 38:
            nextX = 0;
            nextY = -1;
            break;
        case 39:
            nextX = 1;
            nextY = 0;
            break;
        case 40:
            nextX = 0;
            nextY = 1;
            break;
    }
}
