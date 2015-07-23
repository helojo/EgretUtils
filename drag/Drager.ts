module app {
	/**
	 *
	 * @author 
	 *
	 */
	export class Drager {
    	
        private target: egret.DisplayObject;
		public constructor(t:egret.DisplayObject) {
            this.target = t;
            if(this.target)
            {
                this.target.touchEnabled = true;
                this.target.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
                this.target.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
                this.target.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);  
            }
		}
		
        private sx: number = 0;
        private sy: number = 0;
        private canDrag: boolean;
		private touchBegin(e:egret.TouchEvent):void
		{
            this.sx = e.stageX;
            this.sy = e.stageY;
            this.isMoved = false;
            this.canDrag = true;
		}
		/**
		 * 是否正在拖动
		 */ 
        public isDraging: boolean;
        /**
         * 是否移动过
         */ 
        public isMoved: boolean;
		
        private dx: number = 0;
        private dy: number = 0;
        private delay: number = 0;
        private touchMove(e:egret.TouchEvent):void
        {
            if(!this.canDrag)
            {
                return;
            }
            this.dx = e.stageX - this.sx;
            this.dy = e.stageY - this.sy;
            
            this.target.x += this.dx;
            this.target.y += this.dy;
            
            this.sx = e.stageX;
            this.sy = e.stageY;
            
            if(this.dragWidth != 0)
            {
                if(this.target.x > 0)
                {
                    this.target.x = 0;
                }else if(this.target.x < this.dragWidth)
                {
                    this.target.x = this.dragWidth;
                } 
            }

            if(this.dragHeight != 0)
            {
                if(this.target.y > 0)
                {
                    this.target.y = 0;
                }else if(this.target.y < this.dragHeight)
                {
                    this.target.y = this.dragHeight;
                }
            }

            this.isDraging = true;
            this.isMoved = true;
        }
        
        private rec: egret.Rectangle;
        private touchEnd(e:egret.TouchEvent):void
        {
            this.isDraging = false;
            this.canDrag = false;
        }
		
        private dragWidth: number = 0;
        private dragHeight: number = 0;
        /**
         * 如果rec不传，可以任意拖动！
         * rec 是视窗的大小的Rectangle
         */ 
		public setup(rec:egret.Rectangle=null):void
		{
            this.rec = rec;
            if(this.rec)
            {
                this.dragWidth = rec.width - this.target.width;
                this.dragHeight = rec.height - this.target.height; 
            }
		}
		
		public dispose():void
		{
    		if(this.target)
            {
                this.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
                this.target.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
                this.target.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this); 
                this.target = null;
            }

		}
	}
}
