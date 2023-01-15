/*
Features:
multiple lives,
variable max score,
different bricks with different score points,
everytime ball hits paddle, the speed increase by 0.5,
depending on the point of hit, ball gets the angular component,
when ball is reborn, it gets random dx component (to simulate angle),
after user lose, screen turns red and shows message & score,
after user win, screen turns green and shows message & score,
*/
class block{
  constructor(x,y,w,h,c) {
    this.height=h;
    this.width=w;  
    this.x=x;
    this.y=y;
    this.dx=6;
    this.color=c;
    this.score=int(c);
    this.show=true;
  }
  display(){
    if(this.show){
      if(this.color<1.8){
        fill("white");
      }
      else if(this.color<2.5){
        fill("yellow");
      }
      else{
        fill("green");
      }
      if(this.color!=0)text("+"+this.score,this.x,this.y);
      rect(this.x,this.y,this.width,this.height);  
    }
  }
  move_x(a){
    this.x = this.x + (this.dx*a);
  }
  hide_(){
    this.show=false;
  }
  x_center(){
    return this.x+(this.width/2);
  }
  left() {
    return this.x;
  }
  right(){
    return this.x+this.width;
  }
  top(){
    return this.y;
  }
  bottom(){
    return this.y+this.height;
  }
}
class ball_c{
  constructor(x,y,d) {  
    this.x=x;
    this.y=y;
    this.dia=d;
    this.dx=1;
    this.dy=2;
    this.show=true;
  }
  display(){
    if(this.show){
      circle(this.x,this.y,this.dia); 
    } 
  }
  hide_(){
    this.show=false;
    this.dx=0;this.dy=0;
  }
  move_x(a) {
    this.x = this.x + (this.dx*a);
  }
  move_y(a) {
    this.y = this.y + (this.dy*a);
  }
  left() {
    return this.x-(this.dia/2);
  }
  right(){
    return this.x+(this.dia/2);
  }
  top(){
    return this.y-(this.dia/2);
  }
  bottom(){
    return this.y+(this.dia/2);
  }
}

let brick1;
let brick2;
let paddle;
let ball;
let bricks;
let bricks_rows; let bricks_columns;
let brick_width; let brick_height; let brick_padding;
let score=0; let life=2; let max_score=0;
let game_lost; let game_won;
function setup() {
  createCanvas(500, 500);
  background("black");
  game_lost=false;
  game_won=false;
  paddle = new block((width / 2)-50,height-25,100,15,0);
  ball = new ball_c((width / 2)-10,(height / 2)-10,20,0);
  bricks=[];
  bricks_rows=3;
  bricks_columns=4;
  brick_width = 80;
  brick_height = 25;
  brick_padding = 40;
  for(let i = 0; i<bricks_rows; i++){
    bricks[i]=[];
    for(let j = 0;j<bricks_columns;j++){
      bricks[i][j] = new block(brick_padding+(j*(brick_width+brick_padding)),brick_padding+(i*(brick_height+brick_padding)),brick_width,brick_height,int(random(1,3)));
      max_score = max_score+bricks[i][j].score;
    }
  }
}

function draw () {
  background("lightblue");
  textSize(16);
  text("Score: "+ score,10,20);
  text("Life: "+ life,450,20);
  if(game_lost){
    ball.hide_();
    background([255, 75, 75]);
    text("Game Over !",210,250);
    text("Your Score: "+score,205,280);
  }
  if(score>=max_score){
    ball.hide_();
    background("green");
    text("You Won !",220,250);
    text("Your Score: "+score,200,280);
  }
  
  edgeBounce();
  ball.move_x(1);
  ball.move_y(1);
  if(ball.dy>0 && isHit(paddle,ball)){
    ball.dy+=0.5;
    ball.dx=(ball.x-paddle.x_center())/20;
    ball.dy=-ball.dy;
  }
  for(let i = 0; i<bricks_rows; i++){
    for(let j = 0;j<bricks_columns;j++){
      if(isHit(bricks[i][j],ball)){
        score = score + bricks[i][j].score;
        bricks[i][j].hide_();
      }
    }
  }
  
  if (keyIsDown(LEFT_ARROW)&&(paddle.x>=0)) {
    paddle.move_x(-1);
  }
  if (keyIsDown(RIGHT_ARROW)&&(paddle.right()<=width)) {
      paddle.move_x(+1);
  }
  
  ball.display();
  for(let i = 0; i<bricks_rows; i++){
    for(let j = 0;j<bricks_columns;j++){
        bricks[i][j].display();
    }
  }
  paddle.display();
}

function edgeBounce(){
  if(ball.right() > width) {
    ball.dx = -ball.dx;
  }
  
  if(ball.left() < 0) {
    ball.dx = -ball.dx;
  }
  
  if(ball.bottom() > height) {
    ball.dy = 0;
    ball.dx = 0;
    if(life>0){
      life-=1;
      ball.x=paddle.x_center();
      ball.y=paddle.y;
      ball.dx=random(-30,30);
      ball.dy=2;
    }
    else{
      game_lost=true;
    }
  }
   if(ball.top() < 0) {
    ball.dy = -ball.dy;
  }
}

function isHit(block){
  if(block.show){
    if((ball.left()<block.right()) && (ball.right()>block.left()) && 
    (ball.top()<block.bottom()) && (ball.bottom()>block.top())){
      return true;
    }
  }
  return false;
}