const time = document.querySelector(".time-remaining");
const main = document.querySelector("main");
const startButton = document.querySelector(".start-button");
const pauseButton = document.querySelector(".pause-button");
const all = document.querySelector("*");
const pomoContainer = document.querySelector(".pomo-container");
const buttonContainer = document.querySelector(".button-container");

let pomoMins = 50; //add functionality of taking session length as input
let breakMins = 10;
let zeroSec = "00";
let pomoTime = pomoMins*60; 
let breakTime = breakMins*60;
//try objects for call by reference? we want to modify the variable value from within the function
//what is a better way to do this?
const timeObj = {
    pTime : pomoTime,
    bTime : breakTime,
    count : 0
};
let intervalID1; // bc const require initialisation during declaration
let intervalID2;

function timeLeft(chosenTime, otherTimeMins, initial){ //functions are call by value in javascript
    console.log(timeObj[chosenTime]);
    timeObj[chosenTime]--;
    let min = Math.floor(timeObj[chosenTime]/60);
    let sec = timeObj[chosenTime] - min*60;
    if(sec < 10){
        sec = "0" + sec;
    }
    if(min < 10){
        min = "0" + min;
    }
    time.textContent = `${min} : ${sec}`;
    if(min == 0 && sec == 0){
        timeObj[chosenTime] = initial;
        clearInterval(chosenTime === "pTime" ? intervalID1 : intervalID2); 
        time.textContent = `${otherTimeMins} : ${zeroSec}`;
        startButton.disabled = false;
    }
}

function startPomo(){
    intervalID1 = setInterval(timeLeft,1000,"pTime", breakMins, pomoTime);
    startButton.disabled = true;
    pauseButton.disabled = false;   
}

function startBreak(){
    intervalID2 = setInterval(timeLeft,1000,"bTime", pomoMins, breakTime);
    startButton.disabled = true;
    pauseButton.disabled = false;   
}

function pausePomo(){
    clearInterval(intervalID1);
    intervalID1 = null;
    pauseButton.disabled = true;
    startButton.disabled = false;
}

function pauseBreak(){
    clearInterval(intervalID2);
    intervalID2 = null;
    pauseButton.disabled = true;
    startButton.disabled = false;
}


startButton.addEventListener("click", () =>{
    if(timeObj.count % 2 == 0){
        startPomo();
        timeObj.count++;
    }
    else{
        startBreak();
        timeObj.count++;
    }
});

pauseButton.addEventListener("click", () => {
    if(timeObj.count % 2 != 0){
        pausePomo();
        timeObj.count--;
    }
    else{
        pauseBreak();
        timeObj.count--;
    }
});

//add audio. change color scheme for break (background color etc to be changed). change buttons to break-start-button and break-stop-button. or make this a huge function with parameters for pomoTime, breakMins? change text from "focus time" to "break time"
        /*all.style.backgroundColor = "#92C7CF";
        main.style.backgroundColor = "#92C7CF";  FIX THE COLOR THING LATERRRR
        time.style.backgroundColor = "#92C7CF";
        startButton.style.backgroundColor = "#92C7CF";
        pauseButton.style.backgroundColor = "#92C7CF";
        pomoContainer.style.backgroundColor = "rgba(170, 215, 217, 0.2)";
        buttonContainer.style.backgroundColor = "rgba(170, 215, 217, 0.2)";*/