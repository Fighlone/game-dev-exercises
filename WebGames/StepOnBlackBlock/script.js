//获取12个方块 和计时器
var grids = document.getElementsByClassName('grid')
var grids_color = new Array(12);
var timer = document.getElementById('time');
var STATE = false;//游戏状态
var time = 0;
var start_seconds = 0;
var count_text = document.getElementById('count');
var count = 0;
//将12个方块布局好
var mark = false
for(var i =0;i<12;++i){
    grids[i].style.left=120*(i%3)+'px';
    grids[i].style.top = 120*(Math.floor(i/3))+'px';
    if(Math.random()>0.7) {
        grids[i].style.backgroundColor = '#000000';
        grids_color [i]='black';
    }else{
        grids_color [i]='white';
    }
    if(i%3==2){
        if(mark == false){//如果一行没有黑色的方块 那么就随机增加一个
            var hh = Math.floor(Math.random()*3);
            grids[i-hh].style.backgroundColor = 'black';
            grids_color[i-hh]='black';
        }else{
            mark =false;
        }
    }
}
//第四个方块里面写上游戏指南
grids[3].innerHTML = '按s开始游戏，左，下，右，方向键分别表示左，中，右，方块。'
grids[3].style.color = 'blue';

function Game(){
    if(STATE){
        //更新计时器 和计数器
        var myDate = new Date();
        time =myDate.getTime()-start_seconds;
        timer.innerText = (time/1000).toFixed(3);
        
        count_text.innerText = count;
    }
    else{
        //获取开始的时间戳
        var myDate = new Date();
        start_seconds = myDate.getTime();
    }
}
window.setInterval(Game,1);
window.onkeydown = function(e){ //按键判断
    e = e||window.event;
    //console.log(e);
    if(e.key == 's'){ //开始
        grids[3].innerHTML = '';
        STATE = true;
    }else if(e.key == 'ArrowLeft'){
        if(STATE){
            if(grids_color[9]=='black'){
                grids[9].style.backgroundColor='white';
                grids_color[9]='white';
                count++;
            }else{
                Restart();
            }
        }
    }else if(e.key == 'ArrowDown'){
        if(STATE){
            if(grids_color[10]=='black'){
                grids[10].style.backgroundColor='white';
                grids_color[10]='white';
                count++;
            }else{
                Restart();
            }
        }
    }else if(e.key=='ArrowRight'){
        if(STATE){
            if(grids_color[11]=='black'){
                grids[11].style.backgroundColor='white';
                grids_color[11]='white'
                count++;
            }else{
                Restart();
            }
        }
    }
    for(var i =0;i<3;++i){
        if(grids_color[9+i]=='black') break;
    }
    //console.log(grids_color[9],grids_color[10],grids_color[11]);
    if(i==3){//所有格子下移一个
        for(var i =11;i>2;--i){
            grids[i].style.backgroundColor=grids[i-3].style.backgroundColor;
            grids_color[i]=grids_color[i-3];
        }//同时给第一行重新生成一下格子
        grids_color[0]=grids_color[1]=grids_color[2]='white';
        grids[0].style.backgroundColor
        =grids[1].style.backgroundColor
        =grids[2].style.backgroundColor = 'white';
        for(var j = 0;j<3;++j){
            var temp = Math.floor(Math.random()*3);
            grids_color[temp]='black';
            grids[temp].style.backgroundColor='black';
        }
    }
}
function Restart(){//重新开始游戏
    STATE = false;
    grids[3].innerHTML = '按s开始游戏，左，下，右，方向键分别表示左，中，右，方块。';
    grids[3].style.color = 'blue';
    count = 0;
}
