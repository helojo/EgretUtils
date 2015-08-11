class Box extends egret.Shape
{
    public constructor() {
        super();
                    
        this.graphics.beginFill(0xffffff);
//        this.graphics.drawRect(0,0,64,64);
        this.graphics.drawRoundRect(0,0,64,64,24,24);
        this.graphics.endFill();
        this.anchorX = 0.5;
        this.anchorY = 1;
        
        this.mj = this.width * this.height;
        this.fly = true;
        this.cacheAsBitmap = true;
        
        this.touchEnabled = true;
        this.addEventListener(egret.Event.ENTER_FRAME,this.update,this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.tapStart,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.tapEnd,this);
    }
    
    private tapStart(e:egret.TouchEvent):void
    {
        var tm: egret.Tween = egret.Tween.get(this);
//        tm.to({ scaleX: 1.5 },100);
    }
    
    private tapEnd(e:egret.TouchEvent):void
    {
        this.fly = true;
        this.dy = -50;
        var tm: egret.Tween = egret.Tween.get(this);
        tm.to({ scaleX: 0.6 },100).to({ scaleX: 1 },100);
    }
    
    private fly: boolean;
    private mj: number;
    private g:number = 4;
    private dy: number = 0;
    private update(e:egret.Event):void
    {
        this.scaleY = 1 / this.scaleX;
        if(this.fly)
        {
        this.dy += this.g;
        this.y += this.dy;
//        console.log((this.y+this.height*.5));
        if(this.dy >0 && (this.y+this.height*.5*this.scaleY) >= 600)
            {
                this.y = 600;
                this.dy = 0;
                if(this.fly)
                {
                    this.fly = false;
                    var tm: egret.Tween = egret.Tween.get(this);
                    tm.to({ scaleX: 1.2 },100).to({ scaleX: 1 },100);
                }
            } 
        }
        
    }
}
