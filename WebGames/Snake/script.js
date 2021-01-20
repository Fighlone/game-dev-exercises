

var map = document.getElementById('map');
var mapt= document.getElementById('mapt');
var food;//食物
//初始化地图 一个单元大小是20*20
/*
这里为什么要用table呢 ？因为可以利用table的边框合并

*/
for(let row = 0;row<30;++row){
    var oTr = document.createElement('tr');
    for(let col =0;col<40;++col){
        var oTd = document.createElement('td');
        oTd.style.backgroundColor = 'grey';
        oTd.style.width='20px';
        oTd.style.height = '20px';
        oTd.style.border='1px solid white';
        oTr.appendChild(oTd);
    }
    mapt.appendChild(oTr);
}
//初始化蛇的身体 和蛇的方向 上右下左分别为0  1  2  3  
var direction ;
var snakeBody ;
//初始化
initialize();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//设置按钮功能
var buttonStartOrPause = document.getElementById('startOrPause');
var buttonRestart = document.getElementById('restart');
var timer;   
var isOn = false;
var basic_speed= 5;
var if_speed_up = false;
buttonStartOrPause.onclick = function(){ //可以动态变化的开始/暂停按钮
    if(isOn==false){
        timer = setInterval(snake_run,1000/basic_speed);
        isOn = true;
        this.innerText ='暂停游戏';
    }else{
        clearInterval(timer);
        isOn = false;
        this.innerText = '开始游戏';
    }
}
buttonRestart.onclick = initialize;   ///重启游戏
//设置键盘控制系统
window.onkeydown = function(e){
    e = e||window.event;
    var key = e.which||e.keyCode;
    switch(key){
        case 87: //上
            direction = 0;
            break;
        case 68://右
            direction = 1;
            break;
        case 83://下
            direction = 2;
            break;
        case 65://左
            direction = 3;
            break; 
    }
}


//
//
//
//
//
//

function snake_run(){  //蛇的运行包括检测
    //检测蛇是否离谱
    var lipu =true;
    for(i = 0;i<snakeBody.length;++i){
        if(snakeBody[i].offsetTop>=0&&snakeBody[i].offsetTop<630&&snakeBody[i].offsetLeft>=0&&snakeBody[i].offsetLeft<=840){ //这里有个小细节看到没
            lipu = false;
        }
    }
    //console.log(i);
    if(lipu){
        ni_de_she_li_pu_le();
    }
    for(var i =0;i<snakeBody.length-1;++i){
        snakeBody[i].style.left = snakeBody[i+1].style.left;
        snakeBody[i].style.top = snakeBody[i+1].style.top;
    }
    switch(direction){
        case 0:
            snakeBody[snakeBody.length-1].style.top = snakeBody[snakeBody.length-1].offsetTop-21 +'px';
            break;
        case 1:
            snakeBody[snakeBody.length-1].style.left = snakeBody[snakeBody.length-1].offsetLeft+21 +'px';
            break;
        case 2:
            snakeBody[snakeBody.length-1].style.top = snakeBody[snakeBody.length-1].offsetTop+21 +'px';
            break;
        case 3:
            snakeBody[snakeBody.length-1].style.left = snakeBody[snakeBody.length-1].offsetLeft-21 +'px';
            break;
    }
    if(snakeBody[snakeBody.length-1].offsetLeft == food.offsetLeft&&snakeBody[snakeBody.length-1].offsetTop==food.offsetTop){
        changeFood();
        //添加一段蛇
        snakeGrow();
        //同时加速
        if_speed_up = true;
        
    }
    
    if(if_speed_up){
        if_speed_up = false;
        basic_speed ++;
        window.clearInterval(timer);
        timer  = window.setInterval(snake_run,1000/basic_speed);
    }
}
function createFood(){//创建食物
    do{//随机将食物生成在一个合适的位置
        var flag = false;
        var x = Math.floor(Math.random()*40)*21;
        var y = Math.floor(Math.random()*30)*21;
        x = x+'px';
        y = y+'px';
        //检测是否在蛇身上
        for(let i = 0;i<snakeBody.length;++i){
            if(snakeBody[i].style.left==x&&snakeBody[i].style.top==y){
                flag = true;
            }
        }     
    }while(flag);
    food = document.createElement('div');
    food.style.left = x;
    food.style.top = y ;
    food.className ='food';
    map.appendChild(food);
} 
function changeFood(){
    do{//随机将食物生成在一个合适的位置
        var flag = false;
        var x = Math.floor(Math.random()*40)*21;
        var y = Math.floor(Math.random()*30)*21;
        x = x+'px';
        y = y+'px';
        //检测是否在蛇身上
        for(let i = 0;i<snakeBody.length;++i){
            if(snakeBody[i].style.left==x&&snakeBody[i].style.top==y){
                flag = true;
            }
        }     
        }while(flag);
        food.style.left = x;
        food.style.top = y ;
        food.className ='food';
        map.appendChild(food);
}

function snakeGrow(){ //顾名思义就是蛇伸长。
    var oDiv = document.createElement('div');
    oDiv.className = 'snake';
    oDiv.style.left = String(snakeBody[snakeBody.length-1].offsetLeft)+'px';
    switch(direction){
        case 0:
            oDiv.style.left = String(snakeBody[snakeBody.length-1].offsetLeft)+'px';
            oDiv.style.top = String(snakeBody[snakeBody.length-1].offsetTop+21)+'px';
            break;
        case 1:
            oDiv.style.left = String(snakeBody[snakeBody.length-1].offsetLeft+21)+'px';
            oDiv.style.top = String(snakeBody[snakeBody.length-1].offsetTop)+'px';
            break;
        case 2:
            oDiv.style.left = String(snakeBody[snakeBody.length-1].offsetLeft)+'px';
            oDiv.style.top = String(snakeBody[snakeBody.length-1].offsetTop-21)+'px';
            break;
        case 3:
            oDiv.style.left = String(snakeBody[snakeBody.length-1].offsetLeft-21)+'px';
            oDiv.style.top = String(snakeBody[snakeBody.length-1].offsetTop)+'px';
            break;
    }
    map.appendChild(oDiv);
    snakeBody.push(oDiv);
}
function initialize(){//初始化游戏（重启游戏）
    //初始化蛇的身体 和蛇的方向 上右下左分别为0  1  2  3  
   if(snakeBody){//此时需要删除蛇的身体。  先删除html元素再删除数组内存
        for(var i = 0;i<snakeBody.length;++i){
            snakeBody[i].parentNode.removeChild(snakeBody[i]);
        }
        delete snakeBody;
   }
    if(food){//删除过程同上
        food.parentNode.removeChild(food);
        delete food;
    }
    direction = 1;
    snakeBody = new Array();
    basic_speed = 5;
    for(let i =0;i<3;++i){
        var oDiv = document.createElement('div');
        oDiv.className = 'snake';
        oDiv.style.left = String(i*21)+'px';
        map.appendChild(oDiv);
        snakeBody.push(oDiv);
    }
     //初始化食物
     createFood();
}
function move_snake_to_middle(){//将蛇移动到中间
    for(var i =0;i<snakeBody.length;++i){
        snakeBody[i].style.left = '399px';
        snakeBody[i].style.top = '273px' ;
    }
}
//妙啊
function sleep(numberMillis){
    var now = new Date(); 
    var exitTime = now.getTime() + numberMillis; 
    while (true) { 
        now = new Date(); 
        if (now.getTime() > exitTime) 
        return;
    }
} 
function ni_de_she_li_pu_le(){ //你的蛇离谱了
    var mask = document.getElementById('mask');
    mask.style.display = 'block';   
    console.log('guck');
    sleep(3000);//让程序停顿三秒
    move_snake_to_middle();
    sleep(3000);//让程序停顿三秒
    mask.style.display = 'none';

}

console.log('done');
