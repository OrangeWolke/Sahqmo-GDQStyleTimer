var hourText = document.getElementById('hour'),
    minuteText = document.getElementById('minute'),
    secondText = document.getElementById('second'),
    milisecText = document.getElementById('milisecond');

var gtContainer = document.getElementById('gt-timer'),
    block = gtContainer.querySelectorAll('td')

var timer;
var stopRanLight;
var stopRandom;

var hasStopped = false;
var finishAnimPlay = false;

// 2진법 스트링 변환
function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}

// 2진법 디스플레이
function gtDisplay(bi_nums, subArrayNum) {
    for (var i = 1; i < 5; i++) {
        if (bi_nums[i] == '1') {
            block[i*6 - subArrayNum].style.backgroundColor = "#33041e";  // 2진수 자릿수 0일 때
        } else if (bi_nums[i] == '0') {
            block[i*6 - subArrayNum].style.backgroundColor = "#94154c"; // 2진수 자릿수 1일 때
        }
        block[i*6 - subArrayNum].style.transitionDuration = "0.15s";
    }
}

// 타이머 정지시 잠깐 밝은 빛
function gtRanDisStartLight() {
    var timerContainer = document.getElementById('timer');

    if (!finishAnimPlay) {
        timerContainer.style.backgroundColor = "rgba(255, 255, 255, .75)";
    } else {
        timerContainer.style.backgroundColor = "rgba(52, 4, 30, .5)";
        timerContainer.style.transitionDuration = "0.6s";
    }
    finishAnimPlay = true;
}

// 타이머 정지 시 랜덤 패널 점등 구현
function gtRandomDisplay() {

    for (var i = 0; i < block.length; i++) {
        block[i].style.backgroundColor = "#33041e";
        block[i].style.transitionDuration = "0.35s";
    }

    for (var j = 0; j < block.length; j++) {
        block[j].style.backgroundColor = "#33041e";

        var ranNum = Math.floor(Math.random() * 101);

        if (ranNum > 77) {
            block[j].style.backgroundColor = "#94154c";
        } else {
            block[j].style.backgroundColor = "#33041e";
        }
        block[j].style.transitionDuration = "0.35s";
    }
    
}

// 0.1초 간격 갱신
function TimerDisplay() {
    if (!hasStopped) {
        // 시간 숫자
        var hours = Math.floor(timer/36000),
            checkMinutes = Math.floor(timer/600),
            minutes = checkMinutes % 60,
            seconds = Math.floor((timer % 600) / 10),
            milisec = timer % 10;
    
        // 시간 숫자 표시
        hourText.innerText = `${hours}`;
        minuteText.innerText = `${minutes < 10 ? `0${minutes}` : minutes}`;
        secondText.innerText = `${seconds < 10 ? `0${seconds}` : seconds}`;
        milisecText.innerText = `${milisec}`;
        timer++;
    
        //==========================================================//
    
        // 시간 숫자 2진법 변환(역수 적용)
        var bi_hours = dec2bin(31 - hours),
            bi_minutes_second = dec2bin(31 - Math.floor(minutes / 10)),
            bi_minutes_first = dec2bin(31 - (minutes % 10)),
            bi_seconds_second = dec2bin(31 - Math.floor(seconds / 10)),
            bi_seconds_first = dec2bin(31 - (seconds % 10)),
            bi_milisec = dec2bin(31 - milisec);
    
        gtDisplay(bi_hours, 6);
        gtDisplay(bi_minutes_second, 5);
        gtDisplay(bi_minutes_first, 4);
        gtDisplay(bi_seconds_second, 3);
        gtDisplay(bi_seconds_first, 2);
        gtDisplay(bi_milisec, 1);
    }
}

function Start(){
    hasStopped = false;
    timer = setInterval(TimerDisplay, 100);
}

function Stop(){
    clearInterval(timer);
    hasStopped = true;
    stopRanLight = setInterval(gtRanDisStartLight, 25);
    stopRandom = setInterval(gtRandomDisplay, 250);
}