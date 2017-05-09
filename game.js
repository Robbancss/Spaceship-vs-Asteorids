"use strict";

document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);

var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
var lastTime = Date.now();
var gameState= 'RUNNING'; // 'GAMEOVER'
var isEnd=false;
var ship = {
    x: 100,
    y: 450,
    width: 30,
    height: 50,
    vx: 100,
    dir: 0,
};

var asteroids=[];
var images={
    ship: new Image(),
    asteroid: new Image(),
    bg: new Image(),
};

images.ship.src='hajo.jpg';
images.asteroid.src='a.png';
images.bg.src='space1.jpg';

gameLoop();

function gameLoop() {
    window.requestAnimationFrame(gameLoop);
    update();
    draw();   
}

function update() {
    // dt
    var now = Date.now();
    var dt = now - lastTime;
    lastTime = now; 
    // console.log(dt);
    // Hajó mozgatása
    ship.x += ship.vx * ship.dir * dt / 1000;
    if(Math.random() <0.01)
    {
        asteroids.push(
            {
                x:veletlen(0, canvas.width),
                y:-200,
                height:veletlen(10, 80),
                width: veletlen(10, 80),
               vy:veletlen(10, 200),
               vx:  0,
            }
        );
    }
    
   //Asteroidák törlése
   asteroids=asteroids.filter(function(ast){
      return ast.y<canvas.height; 
   });
     //Asteroidák mozgatása
   asteroids.forEach(function(ast)
   {
       ast.x += ast.vx*dt/1000;
       ast.y += ast.vy*dt/1000;
       if(isCollision(ship, ast)){
           isEnd=true;
       }
   });
}

function isCollision(a, b)
{
    return!(
    a.y + a.height < b.y || 
    a.x > b.x+b.width ||
    a.y > b.y+b.height ||
    a.x + a.width < b.x
    );
}

function veletlen(from, to)
{
    return Math.floor(Math.random()*(to-from)) +from;
}

function draw() {
    // Űr
    ctx.fillStyle ='black';
   // ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(images.bg, 0, 0, canvas.width, canvas.height);
    // Űrhajó
    ctx.fillStyle = isEnd? 'red': 'pink';
   // ctx.fillRect(ship.x, ship.y, ship.width, ship.height); 
    ctx.drawImage(images.ship, ship.x, ship.y, ship.width, ship.height); 
    //Asteroidák
    asteroids.forEach(function(ast){
        ctx.fillStyle='lightblue';
       // ctx.fillRect(ast.x, ast.y, ast.width, ast.height);
        ctx.drawImage(images.asteroid, ast.x, ast.y, ast.width, ast.height);
    });
    // Game over
    if(isEnd)
    {
        ctx.font="48px serif";
        ctx.fillstyle='brown';
        ctx.fillText("GAME OVER", 10, 50);
    }  
}

function onKeyDown(e)
{
    var kod=e.which;
    if(kod===37)
    {
        ship.dir=-1;
    }
    else if(kod === 39)
    {
        ship.dir=1;
    }
    
}

function onKeyUp()
{
    ship.dir=0;
}