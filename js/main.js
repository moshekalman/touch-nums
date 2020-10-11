'use strict';
console.log('main');

var gNums = [];
var gCounter = 0;
var gGameInterval;
var gTime = 0;
var gIsGameOn;
var gNumsCount = 0;

function init() {
    resetNums(16);
}

function renderBoard(nums) {
    var strHTML = '';
    var lineCount = Math.sqrt(nums.length);
    for (var i = 0; i < lineCount; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < lineCount; j++) {
            var cell = nums.pop();
            var className = `cell cell-${i}-${j}`
            strHTML += `<td class= "${className}" onclick="cellClicked(this)">`;
            strHTML += cell;
            strHTML += '</td>';
        }
        strHTML += '</tr>';
    }
    var elTable = document.querySelector('.board');
    elTable.innerHTML = strHTML;
}

function cellClicked(elCell) {
    var currNum = +elCell.innerText;
    if (currNum === gCounter) {
        gCounter++
        elCell.classList.add('clicked');
    }
    if (currNum === 1) gGameInterval = setInterval(startTimer, 1);
    if (gCounter === gNumsCount+1) {
        gIsGameOn = !gIsGameOn;
        gTime = 0;
        clearInterval(gGameInterval);
    }
    return;
}

function startTimer() {
    gTime++
    // var timeStr = (gTime < 1000) ? `0. ${gTime.toString()}` : (gTime / 1000).toString();
    var timeStr = (gTime / 1000).toString();
    var elTimer = document.querySelector('h5.timer');
    elTimer.innerText = `${timeStr}s`;
}

function resetNums(numsCount) {
    gNumsCount = numsCount;
    if (!gIsGameOn) {
        var nums = [];
        for (var i = 0; i < numsCount; i++) {
            nums.push(i + 1);
        }
        gNums = nums;
        shuffle(gNums);
        renderBoard(gNums);
        gCounter = 1;
        gIsGameOn = !gIsGameOn;
    }
}