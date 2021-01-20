//准备用canvas做一个导弹
var canvas = document.getElementById('canvas')
//宽高自适应
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//获取2d contex
var ctx = canvas.getContext('2d');
var mouse_x,mouse_y;//鼠标的位置
//下面需要写一个导弹类
/**
 * 绘制一个简易的导弹
 * 这个导弹的机制就是创建的时候指定坐标和角度
 * 然后只能通过api进行以下操作：
 * 1导弹前进(move()) 2导弹转向(turn())
 * @param {number} x 这个是导弹的横坐标 
 * @param {number} y 这个是导弹的纵坐标
 * @param {number} angle 这个是导弹的倾斜角（水平向右为0） 这里为角度
 */
function Missile(x,y ,angle){
    this.x = x; //世界坐标点
    this.y = y;
    this.angle = angle;
    this.h_angle = Math.PI/180*this.angle;
    this.points = new Array();//用来存储绘制点
    //呵呵一个简易的导弹模型
    //目前points存储的是绘图坐标系  这样便于旋转操作
    this.points[0]={xx:0,yy:-50};
    this.points[1]={xx:15,yy:-25};
    this.points[2]={xx:15,yy:+25};
    this.points[3]={xx:-15,yy:+25};
    this.points[4]={xx:-15,yy:-25};
//////////////////////////////////////////////////////
    //渲染导弹
    this.draw =function(){
        var cosxita = Math.cos(this.h_angle);
        var sinxita = Math.sin(this.h_angle);   //用于计算

        ctx.beginPath();

        //ctx.moveTo(this.points[0].xx,this.points[0].yy);
        for(var i =0;i<this.points.length;++i){
            //下面开始旋转变换
            var aikesi = this.points[i].xx;
            var waiyi = this.points[i].yy;
            var xxx=aikesi*cosxita+waiyi*sinxita;
            var yyy=waiyi*cosxita-aikesi*sinxita;
            //旋转完后平移到指定位置
            xxx+=this.x;
            yyy+=this.y;
            ctx.lineTo(xxx,yyy);
        }

        ctx.closePath();
        ctx.stroke();
    }
    //导弹转向
    /**
     * 导弹逆时针转动ang角度
     * @param {number} ang 这里接受角度 里面会转化为弧度
     */
    this.turn = function(ang){ 
        this.angle+=ang;
        if(this.angle<0) this.angle += 360; //确保this.angle在0-360之间
        this.angle = this.angle%360;
        this.h_angle = Math.PI/180*this.angle;
    }
    //导弹前进
    /**
     * 导弹前进一段距离
     * @param {number} distance 
     */
    this.move = function(distance){
        //由于默认导弹头是向上的   所以角度要加上九十度(相对于向右水平的轴)
        //然后由于左手坐标系的关系  y要取负
        var temp = this.h_angle + Math.PI/2;
        this.x+=distance*Math.cos(temp);
        this.y-=distance*Math.sin(temp);
    }
}
//由于考虑到鼠标不动的话导弹就不动了
//所以打算把导弹move和转向放到setinterval里面
//然后
//创建导弹
var daodan =new Missile(500,500,0);
//每一帧的渲染操作
function xuanran(){
    //清屏
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //导弹移动    
    daodan.move(6);
    //导弹转向
    var d =-Math.atan2(mouse_y-daodan.y,mouse_x-daodan.x); //呵呵呵呵
    if(d<0) d +=2*Math.PI;
    
    var delta = d-((Math.PI/2+daodan.h_angle)%(2*Math.PI))       //计算偏移角
    while(delta>Math.PI){delta -= 2*Math.PI;}
    while(delta<-Math.PI){delta +=2*Math.PI;}
    console.log(d+','+delta);
    daodan.turn(10*delta);
    //绘制导弹
    daodan.draw();
}
window.setInterval(xuanran,25);
//设置鼠标移动时导弹改变方向以追踪
canvas.onmousemove = function(ev){
    ev = ev||window.event;
    //console.log(ev.pageX,ev.pageY); //获取鼠标位置
    //我准备让导弹转向的角度和它与鼠标的偏移角度成正比
    mouse_x = ev.pageX;
    mouse_y = ev.pageY;
}

// var daodan = new Missile(200,200,90);
// var daodan2 = new Missile(300,300,0);
// daodan.draw();
// var count =0;
// var test = function(){
//    //daodan.turn(5);
//    daodan.move(1);
//    ctx.clearRect(0,0,canvas.width,canvas.height);//清屏
//    daodan.draw();
//    daodan2.draw();
// }
// canvas.onclick = test;
// canvas.onmousemove = test;  //就用这个了
//万事具备