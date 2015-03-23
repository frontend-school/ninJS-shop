var mainDiv = {};

function start () {
    mainDiv.width = document.getElementById('main').clientWidth; // measures main div width
    if (play == true) setTimeout(start, 1000);
}
window.onload = start;

var divHolder = {};
divHolder.count = 0;
divHolder.killedCount = 0;
var i = 0;
var play = true;


function createDiv () {
    if (play) {
    i = ++divHolder.count; // increase variable showing div count
    document.getElementById('generatedCount').innerHTML = divHolder.count;
    divHolder['div' + i] = document.createElement('div'); // create div


    var randWidth = Math.round(Math.random() * (300-50) + 50); // div random width
    var randHeight = Math.round(Math.random() * (100-50) + 50); // div random height


    var randClassName = Math.round(Math.random() * (2-1) + 1);

    var randSpeedFunc = function randSpeedFuncBody () {
        var randSpeed = Math.round(Math.random() * (3-1) + 1);
        switch (randSpeed) {
            case 1:
                divHolder['div' + i].style.WebkitAnimation = 'slide 3s both';
                break;
            case 2:
                divHolder['div' + i].style.WebkitAnimation = 'slide 5s both';
                break;
            case 3:
                divHolder['div' + i].style.WebkitAnimation = 'slide 7s both';
                break;
        }
    };

    var randLeftFunc = function () {
        divHolder['div' + i].style.left = (Math.round(Math.random() * (mainDiv.width - randWidth))) ; // generate random number from 0 to 1000 subtracting random width of generated div
    };

    switch (randClassName) {
        case 1:
            divHolder['div' + i].className = 'generatedDiv rectangle';
            divHolder['div' + i].style.width = randWidth;
            divHolder['div' + i].style.height = randHeight;
            randSpeedFunc();
            randLeftFunc();
            break;
        case 2:
            divHolder['div' + i].className = 'generatedDiv circle';
            divHolder['div' + i].style.width = randWidth;
            divHolder['div' + i].style.height = randWidth;
            randSpeedFunc();
            randLeftFunc();
            break;
        case 3:
            divHolder['div' + i].className = 'generatedDiv triangle';
            divHolder['div' + i].style.borderLeft = randWidth/2+'px solid transparent'; // divide by 2 because value assigns for 2 sides
            divHolder['div' + i].style.borderRight = randWidth/2+'px solid transparent';
            divHolder['div' + i].style.borderBottom = randWidth/2+'px solid green';
            randSpeedFunc();
            randLeftFunc();
            break;
    }

    divHolder['div' + i].setAttribute('onmousedown','killDiv(this.id)'); // add event for killing specific div by mousedown
    divHolder['div' + i].setAttribute('id', i); // add id attribute
    document.getElementById('main').appendChild(divHolder['div' + i]); // insert div into #main
} else {return}}


function killDiv (idTArget) {
    if (document.getElementById(idTArget).clientWidth <= 100) { //if div width less than 100px
    divHolder.killedCount += 10;} else {divHolder.killedCount++} // increase count of killed divs by 10. else - increase by 1
    document.getElementById('punished').innerHTML = divHolder.killedCount;
    document.getElementById(idTArget).remove();
}



function checkTopValue () {
    if (divHolder.count != 0 && play == true) {
        for (var k=1; k <= i; k++) {
            //divHolder['div' + k].innerHTML = divHolder['div' + k].offsetTop; // input
            var mainDivHeight = document.getElementById('main').offsetHeight; // assigns main div height
            var generatedDivOffsetTop = divHolder['div' + k].offsetTop; // assigns generated div distance from top of main div
            if ( mainDivHeight < (divHolder['div' + k].offsetHeight + generatedDivOffsetTop)) {
                document.getElementById('alert').style.visibility = 'visible';

                for (var l=1; l <= divHolder.count; ++l) {
                    try {
                    document.getElementById(l).remove(); // executing in try allows to avoid stopping program because of error
                    } catch (err) {
                        //console.log(err);
                    }
                }
                play = false;
            }
        }
    }

    if (play) {setTimeout(checkTopValue, 100)}
    /* не работало как надо. код находил к-тый див через getElementById, я переделал, чтобы сразу брало значение из свойства объекта к-того дива (offsetTop)
     for (k=1; k<10; k++) {
     //for (k in divHolder.)
     newDivTopPos = getComputedStyle(document.getElementById(k)).getPropertyValue('top'); // finds kth div top property and assigns it to variable
     divHolder['div'+k].innerHTML = newDivTopPos; // assign to object
     if (divHolder['div'+k].innerHTML == "800px" && divHolder['div'+k].innerHTML != 'game over') { divHolder['div'+k].innerHTML = 'game over' }
     }
     */
}


setTimeout(checkTopValue, 100);