//declaring necessary variables
var player = [];
var simon = [];
var level = 0;
var gameOn = false;
const max_level = 20;
var strict = false;
var error = false;
var soundArray = ["https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",//red
    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",//green
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",//yellow
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"//blue
                 ];
var color = ["red","green","yellow","blue"];

$(document).ready(function(){
  //function start
  $("#startBtn").click(function(){
   if(gameOn == true){
    level = 0;
    level++;
    simon = [];
    player = [];
    $("#display").html(level); 
    simonSequence();
     strict = false;   
  }
  });
  //function to activate strict mode
$("#strictBtn").click(function(){
    strict = true;    
 });
});

//function on/off to turn on the game
function onOff(obj){
//if switch is off, nothing is displayed, else 
  level = 0;
  if($(obj).is(":checked")){
  // console.log("Yes checked"); //when checked
    gameOn = true;
      $("#display").show(); 
      $("#display").html(level);
  
  }else{
    //console.log("Not checked"); //when not checked
      $("#display").hide();
    gameOn = false;
    resetGame();
  }  
}
//clicking on the red tile
function red() {
  if(gameOn == true && level > 0){
      setTimeout(function(){
         document.getElementById("red").style.opacity=0.6;
    }, 0);
  setTimeout(function(){
      document.getElementById("red").style.opacity=1;
    }, 300);
 var audio1 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
   audio1.play();
     
  }
};      

//clicking on the green tile
 function green() {
   if(gameOn == true && level > 0){
       setTimeout(function(){
         document.getElementById("green").style.opacity=0.6;
    }, 0);
  
     setTimeout(function(){
      document.getElementById("green").style.opacity=1;
    }, 300);
var audio2 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
   audio2.play();
    
   }
};    

//clicking on the yellow tile
 function yellow() {
   if(gameOn == true && level > 0){
     setTimeout(function(){
         document.getElementById("yellow").style.opacity=0.6;
    }, 0);
  setTimeout(function(){
      document.getElementById("yellow").style.opacity=1;
    }, 300);
var audio3 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
   audio3.play();
  
   }
};      
   
//clicking on the blue tile
 function blue() {
   if(gameOn == true && level > 0){
    setTimeout(function(){
         document.getElementById("blue").style.opacity=0.6;
    }, 0);
  setTimeout(function(){
      document.getElementById("blue").style.opacity=1;
    }, 300);
var audio4 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
   audio4.play();
  
   }
};           

//generating a random number
function getRandomNum() {
  var random = color[Math.floor(Math.random() * 4)];
  simon.push(random);
}
// when clicking ona tile, its id is pushed onto the user array
  $(".tile").click(function() {
    if( level >= 1){
       id = $(this).attr("id");
    userSequence();   
    }

  });

// inputing the user sequence
function userSequence() {
  player.push(id);

    //check user sequence
    if(!checkPlayer()) {
      //if playing strict mode 
      if(strict) {
        console.log("strict");
        simon = [];
        level = 1;
      }   
      error = true;   
      displayError();
      player = [];      
      simonSequence();
    }
    //checking end of sequence
    else if(player.length == simon.length && player.length < max_level) {
      level++;
      player = [];
      error = false;
      simonSequence();
    }
    //checking for winners
    else if(player.length == max_level) {
      displayWinner();
      resetGame();
    }     
  
}

/* simon sequence */
function simonSequence() {
  $("#display").html(level);
  if(!error) {
    getRandomNum();
  }
  if(error && strict) {
    getRandomNum();
  }  
 var i = 0;
 var myInterval = setInterval(function() {
  var a = simon[i];
  switch (a) {
  case "red":
    red();
    break;
  case "green":
    green();
    break;
  case "yellow":
    yellow();
    break;
  case "blue":
    blue();
    break;   
  }
    i++;
    if(i == simon.length) {
      clearInterval(myInterval);
    } 
  }, 500);  
console.log(simon);
}

// comparing player and simon arrays 
function checkPlayer() {
  for(var i = 0; i < player.length; i++) {
    if(player[i] !== simon[i]) {      
      return false;
    }
  }
  return true;
}

/* display error  */
function displayError() {
  var count = 0;
  var myError = setInterval(function() {
    $("#display").text("!!");
   count++;
    if(count == 3) {
      $("#display").text(level);
      clearInterval(myError);
      player = []; 
      count = 0;
    }
  }, 300);
}
//display winning message
function displayWinner(){
  alert(" you Win!");
}
//function to reset the game
function resetGame(){
  level = 0;
 $("#display").html(level);
  player = [];
  simon = [];
}