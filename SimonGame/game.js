var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level=0;
var started=false;

$(document).keydown(function(){
  if(started==false){

    nextSequence();
    $("#level-title").text("level "+level)
    started=true;
  }
})

$(".btn").click(function() {

  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
animatePress(userChosenColor);
checkAnswer(userClickedPattern.length-1)
  })

  function checkAnswer(currentLevel) {
      if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        $("h1").text("Game Over, Press Any Key to Restart")
        gameOver.play();
        gameOverFlash();
        startOver();
        console.log("wrong");
      }
  }

function nextSequence() {
  userClickedPattern = [];
    level++;
  $("#level-title").text("level "+level)
  var randomNumber = Math.floor(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  var sound = new Audio('sounds/' + randomChosenColor + '.mp3')
  sound.play();
  $("#" + randomChosenColor).fadeOut().fadeIn();
}

var gameOver= new Audio('sounds/wrong.mp3')
function gameOverFlash() {
  $("body").addClass("game-over");setTimeout(function(){
    $("body").removeClass("game-over");},200);
  }
  function startOver(){
    level=0;
    gamePattern=[];
    started=false;
  }
  function playSound(name) {
    var sound = new Audio('sounds/' + name + '.mp3');
    sound.play()
  }

  function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");setTimeout(function(){
      $("#"+currentColour).removeClass("pressed");},100);
    }
