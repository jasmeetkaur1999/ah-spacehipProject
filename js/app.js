const lives = document.querySelector("#lives");
const livenum = lives.querySelector("span");
const score = document.querySelector("#score");
const scorenum = score.querySelector("span");
let numberOfCount = 0;
let numberOfLives = 3;

class Sun {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Enemy extends Sun {
  constructor(x, y, direction, style, speed) {
    super(x, y);
    this.direction = direction;
    this.style = style;
    this.speed = speed;
  }
  // enemies  reversing their direction upon reaching the edge of the canvas.
  update() {
    if (this.direction === "ltr") {
      if(this.x >= 800) {
        this.direction = "rtl";
      }
     
      this.x += (this.speed + numberOfCount) ;
          
    } else if (this.direction === "rtl") {
      if (this.x <= 0) {
        this.direction = "ltr";
      }
      
      this.x -= this.speed + numberOfCount ;    //speed of enemy also increases as the level goes high
    }

    //Collision between Player and Enemies
    //number of lives decreases by 1 when player collied with enimies

    if(player.x < this.x + 100 && player.x + 100 > this.x && player.y < this.y + 100 && player.y + 100 > this.y) {
      player.x = 450;     //player reached the bottom after collision with any enemy
      player.y = 430;
      numberOfLives--;

      if(numberOfLives === 2) {
        livenum.textContent = `${ numberOfLives}`;
        swal({
          title: "Oops!!!",
          text: "You have 2 lives!!!",
          icon: "error",
        });

      } else if(numberOfLives === 1) {
        livenum.textContent = `${ numberOfLives}`;
        swal({
          title: "Oops!!!",
          text: "You have 1 lives!!!",
          icon: "error",
        });

      } else if(numberOfLives === 0) {
        livenum.textContent = `${ numberOfLives}`;
      
      swal({
        title: 'Retry?',
        text: "You won't be able to complete it!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'retry!',
      });

      //restart the game
      livenum.textContent = 3;
      scorenum.textContent = 1;
      numberOfCount = 1;
      numberOfLives = 3;
      }
    }
  }
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  //collision between Sun and Player && alert when player reach at the sun
  update() {
    if(this.x < sun.x + 100 && this.x + 100 > sun.x && this.y < sun.y + 100 && this.y + 100 > sun.y) {
      this.y += 400;
      numberOfCount++;
      scorenum.textContent = `${numberOfCount}`;

      swal({
        title: "Good Job!!!",
        text: "You reached next level!!!",
        icon: "success",
      });
    }
  }
//Movement of player
  handleInput(playerMovement) {
    if (this.y > 40  && playerMovement === "up") {
      this.y -= 80;
    }
    if (this.x > 40 && playerMovement === "left") {
      this.x -= 65;
    }
    if (this.y < 400 && playerMovement === "down") {
      this.y += 60;
    }
    if (this.x < 750 && playerMovement === "right") {
      this.x += 80;
    }
  }
}

const sun = new Sun(300, 0);
const enemy1 = new Enemy(0, 0, "rtl", "enemy1", 1);
const enemy2 = new Enemy(0, 200, "rtl", "enemy2", 2);
const enemy3 = new Enemy(0, 250, "rtl", "enemy3", 2);
let allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);
const player = new Player(400, 400);

document.addEventListener('keyup', function(e) {
  const allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

























