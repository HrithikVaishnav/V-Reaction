const easy = document.getElementsByTagName("Easy")
const medium = document.getElementById('medium');
const caption = document.querySelector('.caption');
const header = document.querySelector('.join-header');
const difficult = document.getElementById('difficult');
const container = document.querySelector('.container');
const result = document.querySelector('.result');
var clickedTime , createdTime , reactionTime = 0 , gamespeed = 0 ,endthegame=false;
var preval = 0 , timer;
var score = 0 , prescore=0;
var evtFired = false;
// listinging click event on box
document.body.addEventListener("click", event => {
    if (event.target.nodeName == "DIV") {
      //console.log("Clicked", event.target.id);
     // console.log(preval);  
      evtFired = true;
      if(event.target.id === preval)
      {
          score++;
          clickedTime = Date.now();
          reactionTime += (clickedTime - createdTime) / 1000;
          document.getElementById(preval).style.backgroundColor="blue";
          //console.log(score);
          startgame();
      }
      else
      {
          if(!endthegame)
          complete();
      }
    }
}); 
// for easy game 
function gameoneasy(){
    header.style.display = "none";
    caption.style.display = "none";
    result.style.display = "none";
    container.style.display = "grid";
    gamespeed = 1500;
    game();
    startgame();
}
// for medium game
function gameonmedium(){
    header.style.display = "none";
    caption.style.display = "none";
    result.style.display = "none";
    container.style.display = "grid";
    gamespeed = 1200;
    game();
    startgame();
}
// for difficult game
function gameondifficult(){
    header.style.display = "none";
    caption.style.display = "none";
    result.style.display = "none";
    container.style.display = "grid";
    gamespeed = 900;
    game();
    startgame();
}
// find different colout for boxes
function getRandomColor() {
    var letters = "0123456789ABCDEF".split('');
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    } 
    var bluecolor = "#0000ff";
    if(color === bluecolor)getRandomColor();
    return color;
} 
// starting game 
function startgame(){
        timer = setTimeout(() => {
            if (!evtFired) {
                if(!endthegame)
                    complete();
            }
            else
            {
                evtFired = false;
                game();
            }
        }, gamespeed);
}
// when player miss or clicked on another box then end the game
function complete(){
    clearTimeout(timer);
    timer = null;
    //console.log("finish");
    document.getElementById(preval).style.backgroundColor="blue";
    const preaction = document.createElement('p');
    var avgreaction = reactionTime/score;
    if(Number.isNaN(avgreaction))avgreaction = 0;
    preaction.innerHTML =  `Average Reaction- Time - ${avgreaction} seconds`;
    result.appendChild(preaction);
    const p = document.createElement('p');
    p.innerHTML = `score - ${score}`;
    result.appendChild(p);
    container.style.display = "none";
    result.style.display = "block";
    endthegame = true;
    return;
}
// finding random box and colour it
function game(){
    var time = Math.random() * (20 - 1) + 1;     
    time = Math.floor(time);
    var boxval = "box" + time;
    //console.log(boxval);
    document.getElementById(boxval).style.backgroundColor=getRandomColor();
    createdTime = Date.now();
    preval = boxval;
    console.log(score + " " + prescore);
    //check();
    prescore = score;
}
// for designing 
const text = document.querySelector(".join-header");
const strtext = text.textContent;
const splittext = strtext.split("");
text.textContent = "";
for(let i=0;i<splittext.length;i++){
    text.innerHTML += "<span>" + splittext[i] + "</span>";
} 
let char = 0;
let timerforname = setInterval(onTick , 50);


function onTick(){
    const span = text.querySelectorAll('span')[char];
    span.classList.add('fade');
    char++;
    if(char === splittext.length)
    {
        completenametimer();
        return;
    }
}

function completenametimer(){
    clearInterval(timerforname);
    timerforname = null;
}