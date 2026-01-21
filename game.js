const canvas = document.getElementById("canvas");
const cxt = canvas.getContext("2d");
const groundY = 440;
const basePosition = 260;

let player = {x:260,y:370,w:40,h:70,vy:0,jump:false};

let horde = {x: 0, y: 140, w: 120, h: 300};

let rock = {x: canvas.width,y:405,w:50,h:35};
let rockVelocity = 4;

let door = {x: canvas.width, y: 300, w: 65, h:140,broken:false};
let doorVelocity = 3;

let bullets = [];

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

    cxt.fillStyle = "#363636";
    cxt.fillRect(rock.x,rock.y,rock.w,rock.h);

    cxt.fillStyle = "#a76f3b";
    cxt.fillRect(door.x, door.y, door.w, door.h);

    cxt.fillStyle = "#00ab3c";
    cxt.fillRect(0, 140, 120, 300);

    cxt.fillStyle = "#b38c29";
    for(let bullet of bullets){
        cxt.fillRect(bullet.x, bullet.y, bullet.w, bullet.h)
    };
}

function update() {
    collided = false;

    player.y += player.vy;
    if (player.y + player.h < groundY){
        player.vy += gravity;
    }
    else {
        player.y = groundY - player.h;
        player.vy = 0;
        player.jump=false;
    }

    rock.x -= rockVelocity;
    if(rock.x < -30 ){
        rock.x = 820;
        if(rockVelocity<20){
            rockVelocity += 0.5;
            console.log("Velocidade da pedra: ", rockVelocity);
        }
    }

    //doorVelocity = -(Math.floor(Math.random()*4))
    door.x -= doorVelocity;
    if(door.x < -30 ){
        door.x = 820;
        if(doorVelocity<15){
            doorVelocity += 0.75;
            console.log("Velocidade da porta: ", doorVelocity);
        }
    }

    if(
        player.x < rock.x + rock.w &&
        player.x + player.w > rock.x &&
        player.y < rock.y + rock.h &&
        player.y + player.h > rock.y
    ){
        if(player.y != rock.y)player.x -= 5;
        collided = true;
        player.x -= rockVelocity;
         console.log("Pedra colidiu com player?: ", collided);
    }

    if(player.x < basePosition && !collided)
        {
            misplaced = true;
        }

    if(misplaced){
        player.x += 1;
        if(player.x >= basePosition){
            player.x = basePosition;
            misplaced = false;
        }
        console.log(misplaced);
    }

    for(let i = bullets.length-1;i>=0;i--){
        bullets[i].x+=bullets[i].speed;

        if(!door.broken && isColliding(bullets[i],door)){
            door.broken = true;
            bullet.splice(i,1);
            console.log("Porta destruída!");
            break;
        } 

        if(bullets[i].x > canvas.width){
            bullets.splice(i,1);
        }
    }

    if(
        player.x < horde.x + horde.w &&
        player.x + player.w > horde.x
    ) {
        alert("Os zumbis te derrotaram!🧟");
        player.x = 260
        rockVelocity = 4;
        doorVelocity = 3;
        rock.x = canvas.width;
        door.x = canvas.width;
    }

    if(!door.broken && isColliding(player,door)){
        player.x -= doorVelocity;
        console.log("Porta colidiu com player?: ", collided);;
    }

    draw();
    requestAnimationFrame(update);
}

function isColliding(a,b){
    return (
        a.x < b.x + b.w &&
        a.x + a.b > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

document.addEventListener("keydown", (tecla) => {
    if(tecla.code === "Space" && !player.jump){
        player.vy = jumpPower;
        player.jump = true;
    }
})

document.addEventListener("click", function(event){
    bullets.push({
        x: player.x + player.w,
        y: player.y + player.h/2,
        w: 8,
        h: 5,
        speed: 6,
    });

    console.log("Disparo efetuado.");
})

update()