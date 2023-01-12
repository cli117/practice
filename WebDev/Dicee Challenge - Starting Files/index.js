
function randomDice(diceIndex)
{
  var randomNumber1 = Math.floor(Math.random() * 6 + 1);
  var newImgName = "images/dice" + randomNumber1 + ".png";
  document.querySelector(".img" + diceIndex).setAttribute("src", newImgName);
  return newImgName;
}

function doDice()
{
  var res1 = randomDice(1);
  var res2 = randomDice(2);

  if (res1 > res2)
  {
    document.querySelector("h1").textContent = "Player 1 Wins!"
  }
  else if (res1 < res2)
  {
    document.querySelector("h1").textContent = "Player 2 Wins!"
  }
  else
  {
    document.querySelector("h1").textContent = "Draw"
  }
}

document.querySelector("button").onclick = function()
{
  doDice();
}
