
var userClickedPatterns=[];
var buttonColors = ["red", "blue", "green", "yellow"];
var level=1;
var gamePattern=[];

var started=false;

  $(document).keydown(function(){
    if (!started){
      nextSequence();
     
      started = true;
    }
    
  })
 

$(".btn").click(function(){
  userChosenColors=$(this).attr("id");
  userClickedPatterns.push(userChosenColors);
  playSound(userChosenColors);
  animatePress(userChosenColors);

  checkAnswer(userClickedPatterns.length-1);
});

function playSound(name){
    var audio=new Audio('sounds/'+name+'.mp3');
    audio.play();  
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed").delay(100).queue(function(next){
        $(this).removeClass("pressed");
        next();
    });
 
}

function nextSequence() {
  userClickedPatterns = [];

  $("#level-title").text("Level  "+level);
  var randomNumber = Math.floor( Math.random() * ( 1 + 3 - 0 ) ) + 0;
  level++;

  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
 animation(randomChosenColor);
 playSound(randomChosenColor);
  }

  function animation(color){
    $("#"+color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  }

  function checkAnswer(currentLevel) {
    
      if(gamePattern[currentLevel] === userClickedPatterns[currentLevel] )
      {
        console.log("success");
        if (userClickedPatterns.length === gamePattern.length){

          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }//5. Call nextSequence() after a 1000 millisecond delay.
          
      } else {
        var wAns=new Audio("sounds/wrong.mp3");
        wAns.play(); 
        $(document.body).addClass("game-over");
        setTimeout(function() {
          $(document.body).removeClass("game-over");
        }, 1000);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();  
      }
        
      } 
      function startOver (){

        level= 0;
        gamePattern=[];
        started=false;
      }
      
    
    
  
    