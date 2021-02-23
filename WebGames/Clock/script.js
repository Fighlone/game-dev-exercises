for(var i =60;i>0;i--){
    var degLi = document.createElement('li');
    degLi.style.transform="rotate("+6*i+"deg)";
    document.getElementById('deg').appendChild(degLi);
}
function run(){
    var data = new Date();
    var secs = data.getSeconds();
    var mins = data.getMinutes();
    var hours = data.getHours()-12+mins/60;
    document.getElementsByClassName('hour')[0].style.transform='rotate('+30*hours+"deg)";//他妈的这里设置sytle的时候别带分号
    document.getElementsByClassName('min')[0].style.transform = 'rotate('+6*mins+'deg)';
    document.getElementsByClassName('second')[0].style.transform = 'rotate('+6*secs+'deg)';
}
window.setInterval(() => {
    run();
}, 1000);