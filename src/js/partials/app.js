window.onload = function () {
    var circle = document.getElementById('circle');

    var n = 200;
    for(var i=0; i<n; i++){
        var item = document.createElement('span');
        item.className = 'item';
        item.style.transform = 'rotate('+i*360/n+'deg)';
        circle.appendChild(item);
    }
    var cursor = document.createElement('span');
    cursor.id = 'cursor';
    circle.appendChild(cursor);
    var timer = document.createElement('span');
    timer.id = 'timer';
    circle.appendChild(timer);
    var circle2 = document.createElement('span');
    circle2.id = 'circle2';
    circle.appendChild(circle2);
    var circle3 = document.createElement('span');
    circle3.id = 'circle3';
    circle.appendChild(circle3);
    var cursor2 = document.createElement('span');
    cursor2.id = 'cursor2';
    circle.appendChild(cursor2);
    timer.innerText = '0 : 00 . 0';
    var i = 0;
    var timer_proc;
    var start = false;
    var b1 =  document.getElementById('butt-set-1'),
        b2 =  document.getElementById('butt-set-2'),
        b3 =  document.getElementById('butt-set-3');
    document.getElementById('start').onclick = function () {
        if(!start){
            timer_proc = timer_start();
            start = true;
            removeClass(b1,'active');
            addClass(b2,'active');
        }
    };
    document.getElementById('pause').onclick = function () {
        clearTimeout(timer_proc);
        start = false;
        removeClass(b2,'active');
        addClass(b3,'active');
    };
    document.getElementById('continue').onclick = function () {
        if(!start){
            timer_proc = timer_start();
            start = true;
            removeClass(b3,'active');
            addClass(b2,'active');
        }
    };
    var laps = [];
    document.getElementById('lap').onclick = function () {
        laps.push(time_parser(parseInt(i*1000*n/360/10)));
        laps_write(laps);
    };

    document.getElementById('reset').onclick = function () {
        reset();
        removeClass(b3,'active');
        addClass(b1,'active');
    };


    function timer_start() {
        return setInterval(function () {
            var miliseconds = parseInt(i*1000*n/360/10);
            var seconds = parseInt(miliseconds/1000);
            var minutes = parseInt(seconds/60);
            seconds = seconds % 60;
            miliseconds = parseInt(miliseconds/100)%10;

            seconds = seconds<10 ? '0'+seconds : seconds;
            timer.innerText = minutes+' : '+seconds+' . '+miliseconds;
            var deg = (minutes * 60 )*6;
            deg+=(+seconds+miliseconds*0.1)*6;
            cursor.style.transform = 'rotate('+deg+'deg)';
            var deg2 = (minutes * 600 )*36;
            deg2+=(+seconds*10+miliseconds)*36;
            cursor2.style.transform = 'rotate('+deg2+'deg)';
            i++;
        },1000*n/360/10);
    }
    function time_parser(miliseconds) {
        var seconds = parseInt(miliseconds/1000);
        var minutes = parseInt(seconds/60);
        seconds = seconds % 60;
        miliseconds = parseInt(miliseconds/100)%10;

        seconds = seconds<10 ? '0'+seconds : seconds;
        return minutes+' : '+seconds+' . '+miliseconds;
    }


    function addClass(element, className) {
        if(!hasClass(element,className)){
            element.className += ' ' + className;
        }
    }
    function removeClass(element, className) {
        if(hasClass(element,className)){
            element.className = element.className.replace(className,' ')
        }
    }
    function hasClass(element, className) {
        if(element.className.search(className) >= 0){
            return true;
        }else{
            return false;
        }
    }

    function laps_write(laps) {
        var results = document.getElementById('results');
        results.innerHTML = '';
        var li,i;
        for(i = laps.length - 1; i>=0; i--){
            li = document.createElement('li');
            li.innerText = (i+1)+'. '+laps[i];
            results.appendChild(li);
        }
        if(laps.length < 3){
            for(i = laps.length; i<3;i++){
                li = document.createElement('li');
                li.innerText = '';
                results.appendChild(li);
            }
        }

    }

    function reset() {
        laps = [];
        laps_write([]);

        var miliseconds = parseInt(i*1000*n/360/10);
        var seconds = parseInt(miliseconds/1000);
        var minutes = parseInt(seconds/60);
        i = 0;
        timer.innerText = 0+' : '+'00'+' . '+0;
        cursor.style.transition = 'all '+(+minutes+1)+'s';
        cursor.style.transform = 'rotate('+0+'deg)';
        cursor2.style.transition = 'all '+(+minutes+1)+'s';
        cursor2.style.transform = 'rotate('+0+'deg)';
        setTimeout(function () {
            cursor.style.transition = 'all 0.1s';
            cursor2.style.transition = 'all 0.1s';
        },minutes*1000);

    }


};
