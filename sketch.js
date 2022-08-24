const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground,soplador,next;
var fruit_con,bubble,bubble_img;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button,blower,rope2,rope3;
var bunny,button2,button3;
var blink,eat,sad;
var mute_btn;

var fr,rope2;
var nivel = 1 ;
var mg 

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
function preload()
{
   bubble_img = loadImage("bubble.png")
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); if(isMobile){ canW = displayWidth; canH = displayHeight; createCanvas(displayWidth+80, displayHeight); } else { canW = windowWidth; canH = windowHeight; createCanvas(windowWidth, windowHeight); }
    
  mg = new SceneManager();
  mg.addScene(nivel1);
  mg.addScene(nivel2);
  mg.addScene(nivel3);
  mg.showNextScene()
    
  frameRate(80);
    
ellipseMode(RADIUS);
    
  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  

  mute_btn = createImg('mute.png');
  mute_btn.position(canW-80,canH-80);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
    
  next = createImg('next.png');
  next.position(width/2,height/2);
  next.size(50,50);
  next.mouseClicked(nextLevel);
  
    
 
  ground = new Ground(200,canH,canW,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
    
  
}

function draw() 
{
  //  console.log("x: " + mouseX + ", y: "+ mouseY)
  background(51);
  image(bg_img,0,0,canW,canH);

  mg.draw();
  
  drawSprites();

}
function nextLevel(){
    console.log("nextLevel");
    mg.showNextScene();
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null;
  cut_sound.play();
}
function drop2()
{
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;
  cut_sound.play();
}
function drop3()
{
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null;
  cut_sound.play();
}
function aire(){
 Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
 air.play();
}
function mute (){
   if(bk_song.isPlaying()){
       bk_song.stop();
    
      }else{
          bk_song.play();
      }
}

function levelclean(){
    if(bunny!=null){
     bunny.destroy();

    }
    if(soplador!=null){
     soplador.remove();

    }
    if(button!=null){
     button.remove();

    }
     if(button2!=null){
     button2.remove();

    }
      if(button3!=null){
     button3.remove();

    }
}

//////////////////////////////////// NIVEL 1 ///////////////
function nivel1(){
    
    this.setup = function(){
    levelclean();
        console.log("nivel1");
  bunny = createSprite(230,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
    
        button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
    
  soplador = createImg('balloon.png');
  soplador.position(50,250);
  soplador.size(90,70);
  soplador.mouseClicked(aire);

  
  fruit = Bodies.circle(300,300,20);
  rope = new Rope(7,{x:245,y:30});
    
 
  Matter.Composite.add(rope.body,fruit);
  fruit_con = new Link(rope,fruit);
  next = false ;
    } 
    this.draw = function(){
     


  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }


  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    sad_sound.play();
    fruit=null;
     bk_song.stop();
   }

    }
    
    
}

//////////////////////////////////// NIVEL 2 ///////////////
function nivel2 (){
    
    this.setup = function(){
     //nivel1.remove();
       levelclean();

            console.log("nivel2");
    button = createImg('cut_btn.png');
  button.position(40,30);
  button.size(50,50);
  button.mouseClicked(drop);
    
  button2 = createImg('cut_btn.png');
  button2.position(370,40);
  button2.size(50,50);
  button2.mouseClicked(drop2);
    
  button3 = createImg('cut_btn.png');
  button3.position(400,225);
  button3.size(50,50);
  button3.mouseClicked(drop3);
    
  soplador = createImg('balloon.png');
  soplador.position(86,272);
  soplador.size(90,70);
  soplador.mouseClicked(aire);
         
  rope = new Rope(7,{x:40,y:30});
  rope2 = new Rope(8,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:225});
        
        bunny = createSprite(230,canH - 80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);

    }
    this.draw = function(){
        push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }


  if(fruit!=null && fruit.position.y>=canW-260)
  {
    bunny.changeAnimation('crying');
    sad_sound.play();
    fruit=null;
     bk_song.stop();
   }
   
    }
}
//////////////////////////////////// NIVEL 3 ///////////////
function nivel3 (){
    this.setup = function(){
        
        levelclean();
        bubble = createSprite(290,460,20,20);
  bubble.addImage(bubble_img);
  bubble.scale = 0.1;
        
  fruit = Bodies.circle(100,400,15);
    
     bunny = createSprite(270,100,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;
  higherground =new Ground(300,170,100,10);
    
    bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  rope = new Rope(4,{x:230,y:330});
  rope2 = new Rope(4,{x:50,y:450});
  con = new Link(rope,fruit);
  con2 = new Link(rope2,fruit);

  //botón 1
  button = createImg('cut_btn.png');
  button.position(200,320);
  button.size(50,50);

  button2 = createImg('cut_btn.png');
  button2.position(30,420);
  button2.size(50,50);

 
    button2.mouseClicked(drop2);
    
    button.mouseClicked(drop);
    
        
    }
    this.draw = function(){
         push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  ground.show();
  higherground.show();
  rope.show();
  rope2.show();

  if(collide(fruit,bunny,80)==true)
  {
   remove_rope();
   bubble.visible = false;
    World.remove(engine.world,fruit);
    fruit = null;
    
    bunny.changeAnimation('eating');

    
  }
  
  if(collide(fruit,bubble,40) == true)
    {
      engine.world.gravity.y = -1;
      bubble.position.x = fruit.position.x;
      bubble.position.y = fruit.position.y;
    }

    }
}
function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


