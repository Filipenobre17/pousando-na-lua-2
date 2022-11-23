var chao;
var nave;
var image_nave;
var plan_fun_;
var vx=0;
var vy=0;
var g=0.05;
var thrust;
var left;
var right;
var fuel=100;

function preload()
{
image_nave=loadImage('normal.png');
plan_fun_=loadImage('bg.png');
thrust=loadAnimation('b_thrust_1.png','b_thrust_2.png','b_thrust_3.png');
left=loadAnimation('left_thruster_1.png','left_thruster_2.png');
right=loadAnimation('right_thruster_1.png','right_thruster_2.png');
crash=loadAnimation('crash1.png','crash2.png','crash3.png');
land=loadAnimation('landing1.png','landing2.png','landing_3.png');
normal=loadAnimation('normal.png');

thrust.playing=true;
thrust.looping=false;
left.looping=false;
right.looping=false;
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);
  timer=1500;

  thrust.frameDelay=5;
  left.frameDelay=5;
  right.frameDelay=5;

  nave=createSprite(100,50,30,30);
  nave.addImage(image_nave);
  nave.scale=0.1;

  nave.addAnimation('thrusting',thrust);
  nave.addAnimation('lefting',left);
  nave.addAnimation('righting',right);
  nave.addAnimation('normal',normal);
  chao=createSprite(500,690,1000,20);
  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(plan_fun_,0,0);

  push();
  fill('white');
  text('velocidade vertical: '+round(vy),800,75);
  text('combustivel: '+fuel,800,25);
  text('velocidade horizontal: '+round(vx,2),800,50);
  pop();

  vy+=g;
  nave.position.y+=vy;
  nave.position.x+=vx;

  drawSprites();
}

function keyPressed() {
  if (keyCode===UP_ARROW && fuel>0) {
    upward_thrust();
    nave.changeAnimation('thrusting')
  }

  if (keyCode===RIGHT_ARROW && fuel>0) {
    nave.changeAnimation('lefting')
    rightThrust()
  }

  if (keyCode===LEFT_ARROW && fuel>0) {
    nave.changeAnimation('righting')
    leftThrust()
  }
}

function upward_thrust() {
  vy=-1;
  fuel-=1;
}

function rightThrust() {
  vx+=0.2;
  fuel-=1;
}

function leftThrust() {
  vx-=0.2;
  fuel-=1;
}
