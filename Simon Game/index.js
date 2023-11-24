// STEP-1
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var level=0;
var started=false;

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");                                      //CLICK FUNCTION
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");                                  //PLAY SOUND FUNCTION
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");                                                               
    setTimeout(function(){                                        //on Press Animation of the boxes
        $("#"+currentColor).removeClass("pressed");
    },100);
}


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level  "+level);                          //adding -level

var randomNumber=Math.floor(Math.random()*4);
var randomChosenColor=buttonColors[randomNumber];                                //Generating random Number Function and pushing the chosen color 
gamePattern.push(randomChosenColor);
$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);                // ANIMATION of fade out and fade in in Chosen Color
playSound(randomChosenColor);
}

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level "+level);                  // Starting the game after pressing a key in the whole page from anywhere ...
        nextSequence();
        started=true;
    }
});

function checkAnswer(currentLevel){
if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
if(userClickedPattern.length===gamePattern.length)
setTimeout(function(){
    nextSequence();
},1000);
}
else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over , Press any key to restart the Game. ");

    setTimeout(function(){
        $("body").removeClass("game-over");                         //// IF the User Clicks on the wrong tile as shown by the Sysytem this function will get triggered
    },200);                            // calling start over after The user chooses the wrong Color
    startOver();
}
}

function startOver(){
    level=0;
    gamePattern=[];             // start over function to Restart the Game 
    started=false;
}