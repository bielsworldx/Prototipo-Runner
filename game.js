const canvas = document.getElementById("canvas");
const cxt = canvas.getContext("2d");
const groundY = 440;

let player = {x:260,y:370,w:40,h:70,vy:0,jump:false};

let horde = {x: 0, y: 140, w: 120, h: 300};

let obstacle = {x: 490,y:405,w:50,h:35,vx:-10};
let obVel1 = 4;
let gravity = 0.6;
let jumpPower = -12;
let misplaced = false;
let collided = false;

function draw(){
    cxt.clearRect(0, 0, canvas.width, canvas.height);

    cxt.fillStyle = "blue";
    cxt.fillRect(player.x, player.y, player.w,player.h);

    cxt.fillStyle = "#183b26";
    cxt.fillRect(0, 440, canvas.width, 160);

    cxt.fillStyle = "#00ab3c";
    cxt.fillRect(0, 140, 120, 300);

    cxt.fillStyle = "#363636";
    cxt.fillRect(obstacle.x,obstacle.y,obstacle.w,obstacle.h);
}

function update() {
    player.y += player.vy;
    if (player.y + player.h < groundY){
        player.vy += gravity;
    }
    else {
        player.y = groundY - player.h;
        player.vy = 0;
        player.jump=false;
    }

    obstacle.x -= obVel1;
    if(obstacle.x < -30 ){
        obstacle.x = 820;
        if(obVel1<20){
            obVel1 += 0.5;
            console.log(obVel1);
            console.log(collided);
        }
    }

    if(
        player.x < obstacle.x + obstacle.w &&
        player.x + player.w > obstacle.x &&
        player.y < obstacle.y + obstacle.h &&
        player.y + player.h > obstacle.y
    ){
        if(player.y != obstacle.y)player.x -= 5;
        collided = true;
        player.x -= obVel1;
    }

    if(player.x < 260 && collided == false) misplaced = true;

    if(misplaced){
        player.x += 1;
        console.log(misplaced);
    }



    /*if(
        player.x < horde.x + horde.w &&
        player.x + player.w > horde.x
    ) {
        alert("Os zumbis te derrotaram!🧟");
        /*player.w = 70;
        player.h = 40;
        player.x += 30;*/
        /*player.x = 260
        obVel1 = 20;
        obstacle.x - canvas.width;
    }*/

    draw();
    requestAnimationFrame(update);
}

document.addEventListener("keydown", (tecla) => {
    if(tecla.code === "Space" && !player.jump){
        player.vy = jumpPower;
        player.jump = true;
    }
})

update()