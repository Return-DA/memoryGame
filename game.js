var buttonColours = ["red", "green", "yellow", "blue"];
var gamePattern = [], userClickedPattern = [];
var ifClicked = false
var level = 0

$(document).keypress(function() {
  if(!ifClicked) {
    $("h1#level-title").text("Level "+level)
    nextSequence()
    ifClicked = true
  }
});

$(".btn").click(function () { 
  var userChosenColour = ($(this).attr("id"))
  playSound(userChosenColour)
  animatePress(userChosenColour)
  userClickedPattern.push(userChosenColour)
  checkAnswer((userClickedPattern.length)-1)
});

function nextSequence() {
  userClickedPattern = []  
  level ++
  $("h1#level-title").text("Level "+level)
  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNum];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour)
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence()
      }, 1000);
    }
  }
  else {
    playSound("wrong")
    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)
    $("h1#level-title").text("Game Over, Press any key to restart")
    startOver()
    }
  }

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  }, 100)
}

function startOver() {
  level = 0;
  gamePattern = []
  ifClicked = false
}


