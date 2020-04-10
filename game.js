var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];


var level = 0;
var started = false;

$(document).ready(function() {
  buttonSlides();
});



$(document).click(function() {
  if (!musicOn) {
    playMusic();
    musicOn = true;
  }
  if (!started) {
    setTimeout(function() {
      $("#level-title").text("Level " + level);
      $("#heading").text("lick the nebulae - remember the sequence")
      nextSequence();
    }, 1500);
    started = true;
  }
});

var musicOn = false;
var gameMusic = new Audio("sounds/nebulaGoat.mp3");
var gameOverMusic = new Audio("sounds/gameOver.mp3");

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (level != 0) {
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
      if (userClickPattern.length === gamePattern.length) {
        setTimeout(function() {
          nextSequence();
        }, 1000);
      }
    } else {

      $("body").addClass("game-over");
      $("#level-title").text("YOU DEAD NOW");
      $("#heading").text("You have brought shame to your family")
      $(".btn").animate({
        opacity: '0'
      }, 3000);
      $("#score").text("Your Comeptence: Level " + level);

      stopMusic();
      buttonReset();

      setTimeout(function() {
        gameOverMusic.load();
        startOver();
      }, 7000);
    }
  }
}

  function nextSequence() {
    userClickPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    buttonAnimation(randomChosenColor);
    playSound(randomChosenColor);
  }

  function startOver() {

    $("body").removeClass("game-over");
    level = 0;
    started = false;
    gamePattern = [];
    $("#level-title").text("Welcome to Nebula Goat");
    $("#heading").text("lick the screen to play again");
    buttonSlides();
    playMusic();
  }

  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
  }

  function playMusic() {
    gameMusic.play();
    musicOn == true;
  }

  function stopMusic() {
    gameMusic.pause();
    gameOverMusic.play();
  }

  function buttonAnimation(currentColor) {
    $("#" + currentColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  }

  function animatePress(currentColor) {
    $("#" + currentColor).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    $("#" + currentColor).addClass("pressed");
    // $("#" + currentColor).effect("shake", {
    //   times: 4
    // }, 1000);

    setTimeout(function() {
      $("#" + currentColor).removeClass("pressed");
    }, 300);
  }

  function buttonSlides() {
    setTimeout(function() {
      $("#red").animate({
        right: '0',
        opacity: '1'
      }, "slow");
    }, 400);


    $("#green").animate({
      left: '0',
      opacity: '1'
    }, "slow");


    setTimeout(function() {
      $("#blue").animate({
        right: '0',
        top: '0',
        opacity: '1'
      }, "slow");
    }, 800);

    setTimeout(function() {
      $("#yellow").animate({
        left: '0',
        top: '0',
        opacity: '1'
      }, "slow");
    }, 600);
  }

  function buttonReset() {
    $("#red").animate({
      right: '0',
      opacity: '0'
    }, "slow");

    $("#green").animate({
      left: '0',
      opacity: '0'
    }, "slow");

    $("#blue").animate({
      right: '0',
      top: '0',
      opacity: '0'
    }, "slow");

    $("#yellow").animate({
      left: '0',
      top: '0',
      opacity: '0'
    }, "slow");
  }
