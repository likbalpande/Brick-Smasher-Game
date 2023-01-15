class block{
  constructor(x,y,w,h) {
    this.height=h;
    this.width=w;  
    this.x=x;
    this.y=y;
    this.dx=6;
    this.show=true;
  }
  display(){
    if(this.show){
      rect(this.x,this.y,this.width,this.height);  
    }
  }
  move_x(a){
    this.x = this.x + (this.dx*a);
  }
  hide_(){
    // this.x=-(this.width+5);
    // this.y=-(this.height+5);
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
let score; let life;
let game_lost; let game_won;
function setup() {
  createCanvas(500, 500);
  background("black");
  // brick1 = new block(random(10,100),random(10,100),60,20);
  // brick2 = new block(random(200,300),random(10,100),60,20);
  score = 0; 
  life = 2;
  game_lost=false;
  game_won=false;
  paddle = new block((width / 2)-50,height-25,100,15);
  ball = new ball_c((width / 2)-10,(height / 2)-10,20);
  bricks=[];
  bricks_rows=3;
  bricks_columns=5;
  brick_width = 65;
  brick_height = 25;
  brick_padding = 28;
  for(let i = 0; i<bricks_rows; i++){
    bricks[i]=[];
    for(let j = 0;j<bricks_columns;j++){
      bricks[i][j] = new block(brick_padding+(j*(brick_width+brick_padding)),brick_padding+(i*(brick_height+brick_padding)),brick_width,brick_height);
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
  }
  if(score==bricks_rows*bricks_columns){
    ball.hide_();
    background("green");
    text("You Won !",220,250);
  }
  
  edgeBounce();
  ball.move_x(1);
  ball.move_y(1);
  if(ball.dy>0 && isHit(paddle,ball)){
    ball.dy+=0.5;
    ball.dx=(ball.x-paddle.x_center())/20;
    ball.dy=-ball.dy;
  }
  // if(isHit(brick1,ball)){
  //   brick1.hide_();
  // }
  // if(isHit(brick2,ball)){
  //   brick2.hide_();
  // }
  for(let i = 0; i<bricks_rows; i++){
    for(let j = 0;j<bricks_columns;j++){
      if(isHit(bricks[i][j],ball)){
        bricks[i][j].hide_();
        score = score + 1;
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
  // brick1.display();
  // brick2.display();
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
      ball.dx=random(-10,10);
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