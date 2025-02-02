const time = document.querySelector(".time-remaining");
const main = document.querySelector("main");
const startButton = document.querySelector(".start-button");
const pauseButton = document.querySelector(".pause-button");
const all = document.querySelector("*");
const pomoContainer = document.querySelector(".pomo-container");
const buttonContainer = document.querySelector(".button-container");
  
let pomoMins = localStorage.getItem('pomoMins');
let breakMins = pomoMins/5;
console.log(`pomoMins: ${pomoMins}, breakMins: ${breakMins}`);

document.addEventListener('DOMContentLoaded', (e) => {
    time.textContent = `${pomoMins}:00`;
})

let zeroSec = "00";
let pomoTime = pomoMins*60; 
let breakTime = breakMins*60;
let isPomodoro = true;

const timeObj = {
    pTime : pomoTime,
    bTime : breakTime,
    count : 0
};
let intervalID1; 
let intervalID2;

async function sendPomodoroData() {
    try {
      console.log('In sendPomodoroData');
      console.log('User ID: ', localStorage.getItem('userID'));
      const currentDate = new Date().toISOString().slice(0, 10);
        
      const data = {
        userID: localStorage.getItem('userID'), 
        date: currentDate,
        pomoMins: pomoMins,
        breakMins: breakMins,
      };
  
      const response = await fetch('clock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        console.log('Pomodoro data sent successfully');
      } else {
        console.error('Error sending Pomodoro data:', response.status);
      }
    } catch (error) {
      console.error('Error sending Pomodoro data:', error);
    }
}

const alarmSound = new Audio('../sounds/alarm_clock.mp3');

function timeLeft(chosenTime, otherTimeMins, initial){ 
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
        alarmSound.play();
        timeObj[chosenTime] = initial;
        clearInterval(chosenTime === "pTime" ? intervalID1 : intervalID2); 
        time.textContent = `${otherTimeMins} : ${zeroSec}`;
        startButton.disabled = false;

        if (!isPomodoro) {
            sendPomodoroData();
        }
        isPomodoro = !isPomodoro;
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

