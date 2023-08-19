//clock global variables
let check = 0;
let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let am = document.getElementById("am");

//Audio files
const audio = new Audio('https://cdn.pixabay.com/download/audio/2021/08/09/audio_a4637e27f0.mp3?filename=smartphone_vibrating_alarm_silent-    7040.mp3');
const audioFile = 'ringtone.mp3';
const audio1 = new Audio(audioFile);

let [mer, a, h, s, m, d] = [0, 0, 0, 0, 0, 0]; //destructuring

//useful functions
const appear = (x) => { return (x < 10 ? "0" + x : x); } //add 0 to number < 10
const convert = (x) => { return Number.parseInt(x) }   //convert string to number
const hider4 = (x) => { x.hidden = (x.hidden) ? false : true; } //hide DOM elements 
//clock update
const update = function () {
    a = new Date()
    h = appear(a.getHours());
    m = appear(a.getMinutes());
    s = appear(a.getSeconds());
    d = a.getDate();
    mer = ((h > 12 || (h == 12 && m > 0)) ? "pm" : "am");
    am.innerHTML = mer;
    hours.innerHTML = (check % 2 === 0 && h > 12) ? appear(h - 12) : h;
    minutes.innerHTML = m;
    seconds.innerHTML = s;
}
let blink = document.querySelectorAll(".blink2")
setInterval((x) => { blink[0].classList.toggle("blinkthis") }, 520)
setInterval((x) => { blink[1].classList.toggle("blinkthis") }, 520)
setInterval(update, 100);

// //Alarm
// let popUp = document.querySelectorAll('.showbox');
// let alarm = document.querySelectorAll('.timepicker');
// let alarmObj = {}
// let alarmInterval;
// const set = () => {
//     let alarmString = alarm[0].value;
//     alarmObj.hour = convert(alarmString.substr(0, 2));
//     alarmObj.min = convert(alarmString.substr(3, 3));
//     alarmObj.mer = alarmString.substr(6, 2);
//     hider4(popUp[0]);
//     alarmInterval = (alarmObj.hour + 12 - convert(h)) * 3600;  //hour to minutes
//     if (alarmObj.min < convert(m) || mer.toUpperCase() != alarmObj.mer.toUpperCase()) {
//         alarmInterval += 24 * 3600   //sets alarm for next day 
//     }
//     alarmInterval += (alarmObj.min - convert(m)) * 60;     //minutes to seconds
//     alarmInterval -= s;   //rectifies manual delay while setting Alarm
//     alarmInterval = alarmInterval * 1000                   //to milliseconds
//     setTimeout(playsound, alarmInterval)
// }
// const playsound = () => {
//     hider4(popUp[1]);
//     audio.play();
//     audio.loop = true

//     audio1.play();
//     audio1.loop = true
// }
// document.addEventListener('DOMContentLoaded', function () {
//     let instances = M.Timepicker.init(alarm, {});
// });

// Alarm
let popUp = document.querySelectorAll('.showbox');
let alarm = document.querySelectorAll('.timepicker');
let alarmObj = {};
let alarmInterval;

// Function to play the alarm sound
const playAlarmSound = () => {
    hider4(popUp[1]);
    audio.play();
    audio.loop = true
    audio1.play();
    audio1.loop = true
};

const set = () => {
    let alarmString = alarm[0].value;
    alarmObj.hour = convert(alarmString.substr(0, 2));
    alarmObj.min = convert(alarmString.substr(3, 3));
    alarmObj.mer = alarmString.substr(6, 2);
    hider4(popUp[0]);
    let currentTime = new Date();
    let alarmTime = new Date();
    alarmTime.setHours(alarmObj.hour, alarmObj.min, 0); // Set alarm time
    if (alarmTime <= currentTime) {
        alarmTime.setDate(alarmTime.getDate() + 1); // Set alarm for the next day if the alarm time has already passed for today
    }
    alarmInterval = alarmTime - currentTime; // Calculate the time difference in milliseconds
    setTimeout(playAlarmSound, alarmInterval);
};

document.addEventListener('DOMContentLoaded', function () {
    let instances = M.Timepicker.init(alarm, {});
});