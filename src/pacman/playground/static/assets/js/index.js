//import Ghost from "./ghost.js"

class Ghost{
    constructor(className, startIndex, speed){
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.index = startIndex;
        this.timer = NaN;
        this.isScared = false;
    }

}

document.addEventListener("DOMContentLoaded", () => {
    console.log("hello")
    const grid = document.querySelector(".grid");
    const scoreDisplay = document.getElementById("score");
    const width = 28 //28x28=784 squares
    let score = 0

    // 0 - food
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]
    const squares = [];
    function createGrid() {
        for(let i = 0; i < layout.length; i++){
            const square = document.createElement('div');
    
            grid.appendChild(square);
            squares.push(square)

            if(layout[i] == 0){
                squares[i].classList.add("food");
            } else if(layout[i] == 1){
                squares[i].classList.add("wall");
            } else if(layout[i] == 2){
                squares[i].classList.add("ghost-lair");
            } else if(layout[i] == 3){
                squares[i].classList.add("power-pellet");
            }
        }
    }

    createGrid();

    // starting pos of pacman
    let pacmanIndex = 490;

    squares[pacmanIndex].classList.add("pac-man");

    //move pacman
    function movePacman(e){
        squares[pacmanIndex].classList.remove("pac-man");

        switch(e.keyCode) {
            case 37:
                if(pacmanIndex % width !== 0 && !squares[pacmanIndex -1].classList.contains('wall') && !squares[pacmanIndex -1].classList.contains('ghost-lair')){
                    pacmanIndex -= 1
                }
                if (squares[pacmanIndex -1] === squares[363]) {
                    pacmanIndex = 391
                }
                break
            case 38:
                if(pacmanIndex - width >= 0 && !squares[pacmanIndex -width].classList.contains('wall') && !squares[pacmanIndex -width].classList.contains('ghost-lair')){ 
                    pacmanIndex -= width
                    break
                }
            case 39:
                if(pacmanIndex % width < width - 1 && !squares[pacmanIndex +1].classList.contains('wall') && !squares[pacmanIndex +1].classList.contains('ghost-lair')){
                    pacmanIndex += 1
                }
                if (squares[pacmanIndex +1] === squares[392]) {
                    pacmanIndex = 364
                }
                break
            case 40:
            if (pacmanIndex + width < width * width && !squares[pacmanIndex +width].classList.contains('wall') && !squares[pacmanIndex +width].classList.contains('ghost-lair')){
                pacmanIndex += width
                break
            }
        }

        squares[pacmanIndex].classList.add("pac-man");
        eatDot();
        eatPowerUp();
        checkForGameOver();
        checkForWin();

    }

    document.addEventListener('keyup', movePacman)
    ghosts = [
        new Ghost('ghost1', 348, 250),
        new Ghost('ghost2', 376, 400),
        new Ghost('ghost3', 351, 300),
        new Ghost('ghost4', 379, 500)
    ];
    function eatDot(){
        if(squares[pacmanIndex].classList.contains("food")){
            score++;
            scoreDisplay.innerHTML = score;
            squares[pacmanIndex].classList.remove("food")
        }
    }

    function eatPowerUp(){
        if(squares[pacmanIndex].classList.contains("power-pellet")){
            score+=10;
            ghosts.forEach(ghost => ghost.isScared = true);
            setTimeout(unscareGhost, 10000);
            squares[pacmanIndex].classList.remove("power-pellet");
        }
    }

    function unscareGhost(){
        ghosts.forEach(ghost => ghost.isScared = false);
    }

    

    ghosts.forEach(ghost => {
        squares[ghost.index].classList.add(ghost.className);
        squares[ghost.index].classList.add("ghost");
    });
    //check for a game over
    function checkForGameOver() {
        if (squares[pacmanIndex].classList.contains('ghost') &&
        !squares[pacmanIndex].classList.contains('scared-ghost')) {
        ghosts.forEach(ghost => clearInterval(ghost.timer))
        document.removeEventListener('keyup', movePacman)
        setTimeout(function(){ alert("Game Over"); }, 500)
        }
    }
    ghosts.forEach(ghost => moveGhost(ghost))
    function moveGhost(ghost) {
        const directions =  [-1, +1, width, -width]
        let direction = directions[Math.floor(Math.random() * directions.length)]
    
        ghost.timer = setInterval(function() {
          //if the next squre your ghost is going to go to does not have a ghost and does not have a wall
            if  (!squares[ghost.index + direction].classList.contains('ghost') &&
                !squares[ghost.index + direction].classList.contains('wall') ) {
                //remove the ghosts classes
                squares[ghost.index].classList.remove(ghost.className)
                squares[ghost.index].classList.remove('ghost', 'scared-ghost')
                //move into that space
                ghost.index += direction
                squares[ghost.index].classList.add(ghost.className, 'ghost')
          //else find a new random direction ot go in
            } else {
                direction = directions[Math.floor(Math.random() * directions.length)]
            }
    
          //if the ghost is currently scared
            if (ghost.isScared) {
                squares[ghost.index].classList.add('scared-ghost')
            }
    
          //if the ghost is currently scared and pacman is on it
            if(ghost.isScared && squares[ghost.index].classList.contains('pac-man')) {
                squares[ghost.index].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                ghost.index = ghost.startIndex
                score +=100
                squares[ghost.index].classList.add(ghost.className, 'ghost')
            }
            checkForGameOver()
        }, ghost.speed)
    }

    //check for a win - more is when this score is reached
    function checkForWin() {
        if (score === 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timer))
        document.removeEventListener('keyup', movePacman)
        setTimeout(function(){ alert("You have WON!"); }, 500)
        }
    }
})
    
