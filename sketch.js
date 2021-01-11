var square, square_image;
var circle, circle_image;
var triangle, triangle_image;
var mainShape;
var squareEnemy, squareEnemyGroup;
var triangleEnemy, triangleEnemyGroup;
var circleEnemy, circleEnemyGroup;
var mainShapeState = "square";
var gamestate = "start";
var gameover_image;
var score = 0;
var bg;
var s;
var gameover_sound;
var bg_sound;

function preload(){
  square_image = loadImage("rectangle.png");
  circle_image = loadImage("circle.png");
  triangle_image = loadImage("triangle.png");
  gameover_image = loadImage("gameover.png");
  bg = loadImage("background.png");
  s = loadSound("pop.mp3");
  gameover_sound = loadSound("gameover_sound.mp3");
  bg_sound = loadSound("bg_sound.mp3");
}


function setup() {
  createCanvas(800,600);
  square = createSprite(140, 520, 40, 40);
  square.addImage(square_image);

  circle = createSprite(400, 520, 40, 40);
  circle.addImage(circle_image);

  triangle = createSprite(660, 520, 40, 40);
  triangle.addImage(triangle_image);

  mainShape = createSprite(400, 380, 40, 40);
  mainShape.addImage(square_image);
  squareEnemyGroup = new Group();
  triangleEnemyGroup = new Group();
  circleEnemyGroup = new Group();

}

function draw() {
  if(gamestate === "start"){
    image(bg, 0, 0, 800, 600);
    fill("black");
    stroke("black");
    textSize(24);
    text("Press 'space' to Start the game", 200, 100);

    textSize(40);
    text("Rules :", 40, 200);

    textSize(25);
    text("1. Square can only destroy circle.", 40, 240);
    text("2. Circle can only destroy triangle.", 40, 280);
    text("3. Triangle can only destroy square.", 40, 320);

    text("If the rules are not followed then the game will over.", 40, 360);
    text("You can select the shape given at the bottom by clicking it.", 40, 400);
    text("Enemy will come from up side.", 40, 440);

    if(keyDown('space')){
      gamestate = "play";
    }
  }else if(gamestate === "play"){

    image(bg, 0, 0, 800, 600);
    push();
    strokeWeight(10);
    line(0, 440, 800, 440);
    pop();
  
    if(mousePressedOver(circle)){
      mainShapeState = "circle";
      mainShape.addImage(circle_image);
    }
  
    if(mousePressedOver(triangle)){
      mainShapeState = "triangle";
      mainShape.addImage(triangle_image);
    }
  
    if(mousePressedOver(square)){
      mainShapeState = "square";
      mainShape.addImage(square_image);
    }
  
    if(frameCount % 160 === 0){
      var select = Math.round(random(1, 3));
      switch(select){
        case 1: squareEnemy = createSprite(400, -200, 40, 40);
        squareEnemy.addImage(square_image);
        squareEnemy.velocityY = 2 + score/4;
        squareEnemyGroup.add(squareEnemy);
        break;
  
        case 2: triangleEnemy = createSprite(400, -200, 40, 40);
        triangleEnemy.addImage(triangle_image);
        triangleEnemy.velocityY = 2 + score/4;
        triangleEnemyGroup.add(triangleEnemy);
        break;
  
        case 3: circleEnemy = createSprite(400, -200, 40, 40);
        circleEnemy.addImage(circle_image);
        circleEnemy.velocityY = 2 + score/4;
        circleEnemyGroup.add(circleEnemy);
        break;
      }
    }
  
    if(mainShapeState === "square" && mainShape.isTouching(circleEnemyGroup)){
      circleEnemyGroup.destroyEach();
      score = score + 1;
      s.play();
    }
  
    if(mainShapeState === "triangle" && mainShape.isTouching(squareEnemyGroup)){
      squareEnemyGroup.destroyEach();
      score = score + 1;
      s.play();
    }
  
    if(mainShapeState === "circle" && mainShape.isTouching(triangleEnemyGroup)){
      triangleEnemyGroup.destroyEach();
      score = score + 1;
      s.play();
    }


    if(mainShapeState === "square" && mainShape.isTouching(squareEnemyGroup)){
      gamestate = "end";
      gameover_sound.play();
    }
    if(mainShapeState === "square" && mainShape.isTouching(triangleEnemyGroup)){
      gamestate = "end";
      gameover_sound.play();
    }


    if(mainShapeState === "triangle" && mainShape.isTouching(circleEnemyGroup)){
      gamestate = "end";
      gameover_sound.play();
    }
    if(mainShapeState === "triangle" && mainShape.isTouching(triangleEnemyGroup)){
      gamestate = "end";
      gameover_sound.play();
    }


    if(mainShapeState === "circle" && mainShape.isTouching(squareEnemyGroup)){
      gamestate = "end";
      gameover_sound.play();
    }
    if(mainShapeState === "circle" && mainShape.isTouching(circleEnemyGroup)){
      gamestate = "end";
      gameover_sound.play();
    }

    console.log(mainShapeState);
    textSize(20);
    fill("black");
    stroke("black");
    text("Score :" + score, 50, 50);
    drawSprites();
  }else if(gamestate === "end"){
    image(gameover_image, 0, 0, 800, 600);
    score = 0;

    squareEnemyGroup.destroyEach();
    triangleEnemyGroup.destroyEach();
    circleEnemyGroup.destroyEach();
    textSize(20);
    fill("white");
    stroke("yellow");
    text("Press 'R' to restart", 300, 500);
    if(keyDown('r')){
      gamestate = 'start';
    }
  }
}