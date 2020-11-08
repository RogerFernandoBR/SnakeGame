window.onload = function(){
    let board = document.getElementById("board"); //Pega o elemento canvas
    let context = board.getContext("2d"); //Pega o contexto 2d do elemento canvas

    document.addEventListener("keydown", keyPush); //Adiciona um listener para teclas precionadas
    setInterval(game, 100); //executa a função game a cada 100 milisegundos

    let speed = 1; //Velocidade de avanço dos frames
    let speedX = 0; //Velocidade na cordenada X
    let speedY = 0; //Velocidade na cordenada Y
    let headX = 10; //Posição da cabeça da serpente na cordenada X
    let headY = 15; //Posição da cabeça da serpente na cordenada Y
    let frameLenght = 20; //Tamanho de cada frame
    let qtdFrames = 20; //Quantidade de frames no quadro do jogo
    let apleX = 15; //Posição da maça na cordenada X
    let apleY = 15; //Posição da maça na cordenada Y
    let trail = [0]; //Array representando os frams com o rastro da serpente
    tail = 5; //Tamanho da calda da serpente (Quantidade de frames)

    //Função game executada pelo setInterval
    function game(){

        headX += speedX;//Define a posição da cabeça da serpente de acordo com a velocidade da cordenada X
        headY += speedY;//Define a posição da cabeça da serpente de acordo com a velocidade da cordenada Y

        //Se a cabeça da serpente na cordenada X for menos que 0, move a cabeça para o lado direito do quadro
        if (headX < 0) {
            headX = qtdFrames -1;
        }

        //Se a cabeça da serpente na cordenada X for maior que o tamanho do quadro, move a cabeça da serpente para o lado esquerdo
        if (headX > qtdFrames - 1) {
            headX = 0;
        }

        //Se a cabeça da serpente na cordenada Y for maior que 0, move a cabeça para o final do quadro
        if (headY < 0) {
            headY = qtdFrames -1;
        }

        //Se a cabeç ada serpente na cordenada Y for maior que a altura do quadro, move a cabeça para o topo do quadro
        if (headY > qtdFrames -1) {
            headY = 0;
        }

        //Seta o estilo de preenchimento do contexto para preto
        context.fillStyle = "black";
        //Aplica o preenchimento do quadro iniciando na cordenadas 0,0 até o final da altura e largura do quadro
        context.fillRect(0, 0, board.width, board.height);

        //Define a cor de preenchimento do contexto para vermelho
        context.fillStyle = "red";
        //Aplica o preenchimento da cor vermelha no frame que represetna a maça
        context.fillRect(apleX * frameLenght, apleY * frameLenght, frameLenght, frameLenght);

        //Seta a cor de preenchimento do contexto para cinza
        context.fillStyle = "gray";
        //Loop for que irá preencher todo o rastro da serpente de cinza
        for (let index = 0; index < trail.length; index++) {
            context.fillRect(
                trail[index].x * frameLenght, 
                trail[index].y * frameLenght, 
                frameLenght-1, 
                frameLenght-1
            );
            
            //Se a cabeça da serpente esbarrar em sua calda, Game over. A velocidade setada para zero, e a calda volta para o valor de 5 frames
            if (trail[index].x == headX && trail[index].y == headY) {
                if (speedX != 0 || speedY != 0){
                    alert("Game over!");
                }
                speedX = 0;
                speedY = 0;
                tail = 5;
            }
        } 
        
        //Atualiza a posição da cabeça da serpente, e salva a cordenada no array trail
        trail.push({ x:headX, y:headY });
        //Loop while. Enquanto o tamanho do rastro da sepenet for maior que a quantidade de frames da calda da serpente, remove um frame
        while (trail.length > tail) {
            trail.shift();
        }

        //Se a cabeça da serpente encostou na maça, aumenta o calda mais um frame e define uma posição randomica para a nova maça
        if (apleX == headX && apleY == headY) {
            tail++;
            apleX = Math.floor(Math.random() * qtdFrames);
            apleY = Math.floor(Math.random() * qtdFrames);
        }

    }

    //Função executada quando precionado uma tecla
    function keyPush(event){

        //Verifica qual tecla foi pressionada e altera a direção da serpente
        switch (event.keyCode) {
            case 37: //Left
                speedX = -speed;
                speedY = 0;
                break;
            case 38: //Up
                speedX = 0;
                speedY = -speed;
                break;
            case 39: //Right
                speedX = speed;
                speedY = 0;
                break;
            case 40: //Down
                speedX = 0;
                speedY = speed;
                break;
        
            default:
                break;
        }
    }
}