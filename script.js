var canvas = document.getElementById("c");
var context = canvas.getContext("2d");
var down = false;
var name = "Welcome to the UT Bread Basket!";




context.fillStyle= "blue";

function mouseMove(event) {
  mousex = event.pageX;
  mousey = event.pageY;
  if (mousex > 50 && mousex < 450 && mousey > 50 && mousey < 450) {
    mouseincanvas = true; }
  else {mouseincanvas = false}
}

canvas.addEventListener("mousemove", mouseMove);
canvas.addEventListener("mousedown", function() {down = true})
canvas.addEventListener("mouseup", function() {down = false})
var mousex = 0;
var mousey = 0;
var mouseincanvas = false

class letter {
  constructor (what, x) {
    this.x = x;
    this.y = 200;
    this.xvel = 0;
    this.yvel = 0;
    this.dx = 1; 
    this.dy = 1 
    this.xpush = 0
    this.ypush = 0
    this.what = what
    this.homex = x
  }
  run() {
    //Gravity
    if (this.x > this.homex) {
      this.xvel -= 2
    } else if (this.x < this.homex){
      this.xvel += 2
    } 
    if (this.y > this.homex) {
      this.yvel -= 2
    } else if (this.y < this.homex){
      this.yvel += 2
    }
    //Air Resistance
    if (this.xvel > 0) {
      this.xvel -= 1;  
    } else if (this.xvel < 0) {
      this.xvel += 1;
    }
    if (this.yvel > 0) {
      this.yvel -= 1;  
    } else if (this.yvel < 0) {
      this.yvel += 1;
    }
    //Mouse Repulsion
    if (mouseincanvas) {  
      this.dx = Math.abs(this.x - mousex);
      this.dy = Math.abs(this.y - mousey);
      this.xpush = Math.max(20-this.dx,0);
      this.ypush = Math.max(20-this.dy,0);
      if (this.x < mousex) {
        this.xvel -= this.xpush;
      } else if ( this.x > mousex){
        this.xvel += this.xpush;
      } 
      if (this.y < mousey) {
        this.yvel -= this.ypush;
      } else if (this.y > mousey){
        this.yvel += this.ypush;
      }
    }
    this.x += this.xvel;
    this.y += this.yvel;
    //context.strokeRect(50,50,400,400);
    context.beginPath();
    //context.arc(250,250,5,2*Math.PI, false);
    //context.arc(x,y,25,2*Math.PI, false);
    context.font = "20px Arial";
    context.fillText(this.what, this.x, this.y); 
    context.textAlign = "center";
    context.fill();

  }

}
var letters = []
for (var i = 0; i < name.length; i++){
  letters.push(new letter(name.charAt(i), 75+ i* 12))
} setInterval(function (){
  context.clearRect(0, 0, 500, 500);
  for (var i = 0; i < name.length; i++){
    letters[i].run()
  }
}, 50)