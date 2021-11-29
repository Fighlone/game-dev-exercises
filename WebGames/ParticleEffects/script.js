/*
总的输出流程：

初始化一个爱心图案

然后粒子重构中国共产党和NJAU;

*/
cvs = document.getElementById("cas");
ctx = cvs.getContext("2d");
var Animation = (function(cvs,ctx){ //传入canvas以及其2d context
    //元素点
    var DOT_SIZE = 3.4;
    dots = [];
    var Dot = function(x,y,vx,vy,tx,ty,color){//位置  速度  目的地 颜色
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.tx = tx;
        this.ty = ty;
        this.color = color;
        this.goDown = false;
        this.gravity = Math.random()*3+6.8;
    }
    
    Dot.prototype=
    {
        //设置点的目的地
        SetTarget:function(tx,ty)
        {
            this.tx = tx;
            this.ty = ty;
        }
        ,
        //更新点的位置
        Update:function(t){ //速度
            //更新位置
            this.x = this.x + this.vx*t;
            this.y = this.y + this.vy*t;
            /* 感觉不设置下落好看点
            if(!this.goDown){
                //计算新的位置偏移量
                var dx = this.tx - this.x;
                var dy = this.ty - this.y;
                var len = Math.sqrt(dx*dx + dy * dy);
                var za = 16;
                if(len != 0){
                    this.vx = this.vx + (dx / len) *za* t; //加速运动
                    this.vy = this.vy + (dy / len) *za* t;
                }else{
                    this.vx = Math.random();
                    this.vy = Math.random();
                }
                this.vx *= 0.95;
                this.vy *= 0.95;
            }else{
               this.vy += this.gravity;
            }
            */
           //计算新的位置偏移量
           var dx = this.tx - this.x;
           var dy = this.ty - this.y;
           var len = Math.sqrt(dx*dx + dy * dy);
           var za = 24;
           if(len != 0){
               this.vx = this.vx + (dx / len) *za* t; //加速运动
               this.vy = this.vy + (dy / len) *za* t;
           }else{
               this.vx = Math.random();
               this.vy = Math.random();
           }
           this.vx *= 0.95;
           this.vy *= 0.95;
        }
        ,
        //绘制点
        Draw:function(){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x - DOT_SIZE/2,this.y - DOT_SIZE/2,DOT_SIZE,DOT_SIZE);
        }
        ,
    }
    //制作图象像素数据
    function getPicture1(){
        ctx.clearRect(0,0,cvs.width,cvs.height);
        ctx.font="90px 微软雅黑 bold";
        //渐变色
        var gradient=ctx.createLinearGradient(0,0,cvs.width,0);
        gradient.addColorStop("0.3","rgb(255, 204, 0)");
        gradient.addColorStop("0.4","#ffd633");
        gradient.addColorStop("0.6","red");
        ctx.fillStyle=gradient;
        ctx.fillText("中国共产党",290,650);
        ctx.fillStyle = "#00cc44";
        ctx.fillText("N J A U",924,650);
        ctx.font="60px 微软雅黑 bold";
        ctx.fillStyle = "grey";
        ctx.fillText("&",810,650)
        imgData = ctx.getImageData(0,0,cvs.width,cvs.height);
        return imgData;
    }
    //

    //创建动画对象（作为这整个函数的返回值）
    var animation = function()
    {
        //获取时间戳
        //this.d = new Date();
        var d = new Date();
        this.bornTime = d.getTime();
        this.deltaTime = 3;//五秒切换后切换下一幕
        //最好不要改变下面两个值，其与心形生成的关联性没设置好。
        this.startx = 838;
        this.starty = 419;
    }
    //动画初始化图像
    /*
        注：这个初始图象确定了点的最大个数
    */
    animation.prototype.Init = function()
    {
        this.state = "FIRST";
        //绘制爱心
       var offsetX = 400;
       var offsetY = 40;
        ctx.lineWidth = 10;
        ctx.strokeStyle ="#ff6666";
        ctx.fillStyle = "#ff6666";
        ctx.beginPath();
        ctx.moveTo(438+offsetX, 479+offsetY);
        ctx.bezierCurveTo(23+offsetX, 292+offsetY, 287+offsetX, -4+offsetY, 438+offsetX, 159+offsetY);
        ctx.moveTo(436+offsetX,479+offsetY);
        ctx.fill();
        ctx.bezierCurveTo( 853+offsetX,292+offsetY,589+offsetX,-4+offsetY,438+offsetX, 159+offsetY);
		ctx.stroke();
		ctx.fill();
		var imgData = ctx.getImageData(0,0,cvs.width,cvs.height);
        this.SetAllDotsTarget(imgData,true);
    }
    //设置所有点的目标
    animation.prototype.SetAllDotsTarget= function(imgdt,SetBornPoint)
    {
        if(SetBornPoint){
            dots = [];
            for(let x = 0;x<imgdt.width;x+=4)
            {
                for(let y = 0;y<imgdt.height;y+=6)
                {
                    let i = y*imgdt.width + x;
                    i = i * 4;
                    if(imgdt.data[i+3]>128){
                        var d = new Dot(
                            this.startx+2*Math.random(),
                            this.starty+2*Math.random(),
                            0,
                            0,
                            x,
                            y,
                            "rgba("+imgdt.data[i]+","+imgdt.data[i+1]+","+imgdt.data[i+2]+",1)"
                        )
                        dots.push(d);
                    }
                    
                }
            }
        }else{
            for(let i =0;i<dots.length;++i){
                dots[i].goDown = true;
            }
            var index = 0;
            for(let x = 0;x<imgdt.width;x+=3)
            {
                for(let y = 0;y<imgdt.height;y+=3)
                {
                    let i = y*imgdt.width + x;
                    i = i * 4;
                    if(imgdt.data[i+3]>128 ){
                       while(dots[index].goDown == false){
                           index +=Math.round(Math.random()*20);
                           if(index >= dots.length){
                               index = index % dots.length;
                           }
                       }
                        dots[index].SetTarget(x,y);
                        dots[index].color = "rgba("+imgdt.data[i]+","+imgdt.data[i+1]+","+imgdt.data[i+2]+",1)";
                        dots[index].goDown = false;
                    }
                }
            }
        }
        
    }
    //动画更新
    animation.prototype.Update = function(t)
    {
        for(let i =0;i<dots.length;++i){
            dots[i].Update(t);
            dots[i].Draw();
        }
        var d = new Date();
        if(d.getTime() - this.bornTime > this.deltaTime * 1000){//状态切换
            switch(this.state){
                case "FIRST"://从第一幕切换到第二幕
                    this.state = "SECOND";
                    var imgData = getPicture1();
                    this.SetAllDotsTarget(imgData,false);
                    ctx.clearRect(0,0,cvs.width,cvs.height);
                    for(let i =0;i<dots.length;++i){
                        dots[i].Update(t);
                        dots[i].Draw();
                    }
                    break;
                default:
                    break;
            }
        }
    }
    return new animation();
})(cvs,ctx)