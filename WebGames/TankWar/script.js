var canvas1 = document.getElementById('warMap');
var cxt = canvas1.getContext("2d");
var myColors = new Array('blue','#000000','purple');   //玩家坦克皮肤
var enemyColors = new Array('#AD8611','#DCA70A','#DCD50A');//敌人坦克皮肤
//玩家坦克
var me = new Me(400,200,0,myColors);
var enemyTanks = new Array();//敌人坦克群
var bullets = new Array();   //子弹群
for(var i =0;i<10;++i){//构造敌军坦克群
    var enemyTank = new EnemyTank(30+60*i,40,2,enemyColors);
    enemyTanks[i]=enemyTank;
    drawTank(enemyTank);
}

//刷新每一帧的循环
window.setInterval("falshWarMap()",25);//每秒40帧
//结束
console.log("done");
//////////////////////////////////////////////////////////////////////////////////////////////////////
///
//
//
///
//
///
//
//\

/***
 * a:65 w：87  s:83 d:68
 */
/**
 * 键盘触发事件
 */
function getCommand(){
    var code = event.keyCode; //对应字母的ascii码
    //空格是32
    switch(code){
        case 65:me.moveLeft();break;
        case 87:me.moveUp();break;
        case 83:me.moveDown();break;
        case 68:me.moveRight();break;
        case 32:me.shootEnemy();break;
    }
    
}
/**
 * 用于刷新画布
 */
function falshWarMap(){
    cxt.clearRect(0,0,canvas1.width,canvas1.height);
    for(var i = 0;i<bullets.length;++i){
        bullets[i].show();
        bullets[i].move();
    }
    for(var i =0;i<enemyTanks.length;++i){
        drawTank(enemyTanks[i]);
    }
    drawTank(me);
}
////来面向对象吧！
/**
 * 这是坦克类
 * @param {横坐标} x 
 * @param {纵坐标} y 
 * @param {方向} direction 
 */
function Tank(x,y,direction,colors){
    this.x = x;//坦克的横坐标
    this.y = y;//坦克的纵坐标
    this.speed = 10;//坦克的速度
    this.direction = direction;//坦克的方向
    this.colors = colors;
    this.moveUp = function(){
        this.y -=this.speed;
        this.direction =  0;
    }
    this.moveDown = function(){
        this.y+=this.speed;
        this.direction = 2;

    }
    this.moveLeft = function(){
        this.x-=this.speed;
        this.direction = 3;
    }
    this.moveRight = function(){
        this.x+=this.speed;
        this.direction = 1;
    }
}
 /**
  * 这个是操作玩家坦克
  * 上：0右：1下：2左：3
  * @param {横坐标} x 
  * @param {纵坐标} y 
  * @param {坦克的方向} direction 
  */
function Me(x,y,direction,colors){//封装一个玩家坦克类
   //继承一下坦克类
    this.tank = Tank;
    this.tank(x,y,direction,colors);
    //射击敌人
    this.shootEnemy = function(){
        switch(this.direction){
            case 0:
            case 2:
                var bullet = new Bullet(this.x+10,this.y+15,this.direction,5);
                break;
            case 1:
            case 3:
                var bullet = new Bullet(this.x+10,this.y+15,this.direction,5);
                break;

        }
        
        bullets.push(bullet);
    }
}

/**
 * 这个是敌人坦克们
 * @param {横坐标} x 
 * @param {纵坐标} y 
 * @param {方向} direction 
 */
function EnemyTank(x,y,direction,colors){//敌人坦克类
    //继承坦克类
    this.tank = Tank;
    this.tank(x,y,direction,colors);
}

/**
 * 绘制坦克(包括自己的坦克和敌人的坦克)
 */
function drawTank(tank){
    //绘制坦克
    switch(tank.direction){
        case 0://上下的时候坦克姿态
        case 2:
            cxt.fillStyle = tank.colors[0];
            cxt.fillRect(tank.x,tank.y,5,30); //左边轮子
            cxt.fillRect(tank.x+15,tank.y,5,30);//右边轮子
            cxt.fillRect(tank.x+6,tank.y+5,8,20);//坦克身体
            cxt.fillStyle = tank.colors[1];
            cxt.arc(tank.x+10,tank.y+15,4.5,0,10,false); //坦克盖子
            //cxt.stroke();
            cxt.fill();
            //最后是炮筒
            cxt.beginPath();
            cxt.strokeStyle = tank.colors[2];//炮筒颜色
            cxt.lineWidth = 4;   //炮筒粗细
            if(tank.direction ==0){
                cxt.moveTo(tank.x+10,tank.y-3);}
            else{
                cxt.moveTo(tank.x+10,tank.y+33);
            }
            cxt.lineTo(tank.x+10,tank.y+15);
            cxt.closePath();
            cxt.stroke();
            break;
        case 1:
        case 3:
            cxt.fillStyle = tank.colors[0];
            cxt.fillRect(tank.x-5,tank.y+5,30,5); //左边轮子
            cxt.fillRect(tank.x-5,tank.y+20,30,5);//右边轮子
            cxt.fillRect(tank.x,tank.y+11,20,8);//坦克身体
            cxt.fillStyle = tank.colors[1];
            cxt.arc(tank.x+10,tank.y+15,4.5,0,10,false); //坦克盖子
            //cxt.stroke();
            cxt.fill();
            //最后是炮筒
            cxt.beginPath();
            cxt.strokeStyle = tank.colors[2];//炮筒颜色
            cxt.lineWidth = 4;   //炮筒粗细
            if(tank.direction ==3){
                cxt.moveTo(tank.x-8,tank.y+15);}
            else{
                cxt.moveTo(tank.x+28,tank.y+15);
            }
            cxt.lineTo(tank.x+10,tank.y+15);
            cxt.closePath();
            cxt.stroke();
            break;
    }
   
}
/**
 * 这是一个子弹类
 * @param {横坐标} x 
 * @param {纵坐标} y 
 * @param {运动方向} direction 
 */
function Bullet(x,y,direction,speed){
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = speed;
    this.show = function(){ //用来画出子弹
        cxt.beginPath();
        cxt.fillStyle = "black";
        cxt.fillRect(this.x-2,this.y-2,4,4); //子弹是4*4的
        cxt.closePath();
    }
    this.move = function(){
        switch(this.direction){
            case 0:
                this.y-=speed;
                break;
            case 1:
                this.x+= speed;
                break;
            case 2:
                this.y+=speed;
                break;
            case 3:
                this.x-=speed;
                break;
        }
    }
}
