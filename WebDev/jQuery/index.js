$("h1").css("color", "red");

$("button").html("<em>No!!!</em>")

$("a").attr("href", "https://www.baidu.com");

$("button").click(function()
{
  $("h1").animate({
    opacity: 0.5,
    margin: "20%",
  });
});                                         // add onclick callback

$(document).keydown(function(event)
{
  $("h1").html(event.key)
  console.log(event.key);
});

$("h1").on("click", function()
{
  $("h1").css("color", "purple");
});
