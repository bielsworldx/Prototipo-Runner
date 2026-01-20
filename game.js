const canvas = document.getElementById("canvas");
const cxt = canvas.getContext("2d");

let player = {x:260,y:370,w:40,h:70,vy:0,jump:false};

let hordeArea = 100;

let obstacle = {x: 490,y:405,w:50,h:35,vx:-10};
let obVel1 = 4;
let gravity = 1.2;
let jumpPower = -5;

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
    if (player.y + player.h < 300){
        player.vy += gravity;
    }
    else {
        player.y = 380;
        /*player.vy = 0;
        player.jump=false;*/
    }

    obstacle.x -= obVel1;
    if(obstacle.x < -30 ){
        obstacle.x = 820;
        if(obVel1<25){
            obVel1 += 0.5;
            console.log(obVel1);
        }
    }

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