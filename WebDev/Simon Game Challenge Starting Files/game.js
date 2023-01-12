var gamePattern = [];
var userClickedPattern = [];
var buttonColors = [ "red", "blue", "green", "yellow" ];
var level = -1;

function nextSequence()
{
  var randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
  userClickedPattern = [];
}

$(".btn").click(function()
{
  userClickedPattern.push(this.id);
  playSound(this.id);
  animatePress(this.id);
  if (!checkAnswer())
  {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function()
    {
        $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    level = -1;
    gamePattern = [];
  }
  else
  {
    if (userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function()
      {
          nextSequence();
      }, 200);
    }
  }
});

function animatePress(currentColor)
{
  $("#" + currentColor).addClass("pressed");
  setTimeout(function()
  {
      $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer()
{
  var idx = userClickedPattern.length - 1;
  return userClickedPattern[idx] === gamePattern[idx];
}

function playSound(name)
{
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

$(document).on("keydown", function()
{
  if (level === -1)
  {
    nextSequence();
  }

});
