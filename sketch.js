class block{
  constructor(x,y,w,h) {
    this.height=h;
    this.width=w;  
    this.x=x;
    this.y=y;
    this.dx=6;
    
  }
  display(){
    rect(this.x,this.y,this.width,this.height); 
  }
  move_x(a){
    this.x = this.x + (this.dx*a);
  }
  hide_(){
    this.x=-(this.width+5);
    this.y=-(this.height+5);
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
  }
  display(){
    circle(this.x,this.y,this.dia);; 
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
function setup() {
  createCanvas(500, 500);
  background("black");
  brick1 = new block(random(10,100),random(10,100),60,20);
  brick2 = new block(random(200,300),random(10,100),60,20);
  paddle = new block((width / 2)-50,height-25,100,15);
  // paddle.y=constrain(0,500);
  ball = new ball_c((width / 2)-10,(height / 2)-10,20);
}

function draw () {
  background("pink");
  
  
  edgeBounce();
  ball.move_x(1);
  ball.move_y(1);
  if(ball.dy>0 && isHit(paddle,ball)){
    ball.dy+=1;
    ball.dx=(ball.x-paddle.x_center())/20;
    ball.dy=-ball.dy;
  }
  if(isHit(brick1,ball)){
    brick1.hide_();
  }
  if(isHit(brick2,ball)){
    brick2.hide_();
  }
  
  if (keyIsDown(LEFT_ARROW)) {
    paddle.move_x(-1);
  }
    if (keyIsDown(RIGHT_ARROW)) {
      paddle.move_x(+1);
  }
  
  ball.display();
  brick1.display();
  brick2.display();
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
    ball.x=-100;
    ball.y=-100;
  }
   if(ball.top() < 0) {
    ball.dy = -ball.dy;
  }
}

function isHit(block){
  if((ball.left()<block.right()) && (ball.right()>block.left()) && 
    (ball.top()<block.bottom()) && (ball.bottom()>block.top())){
     return true;
  }
  return false;
}