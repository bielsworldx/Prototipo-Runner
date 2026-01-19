const canvas = document.getElementById("canvas");
const cxt = canvas.getContext("2d");

let player = {x:50,y:200,w:30,h:50,vy:0,jump:false};

function draw(){
    cxt.clearRect(0, 0, canvas.width, canvas.height);

    cxt.fillStyle = "blue";
    cxt.fillRect(player.x, player.y, player.w,player.h);
}

function update() {
    draw();
    requestAnimationFrame(update);
}

update()