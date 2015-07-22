
module app {

	export class IsoMap{
		private _creater:ITileTypeCreater;
		
		private WIDTH:number;
		private HEIGHT:number;
		private CELL_WIDTH:number = 0;
        private CELL_HIGHT:number = 0;	
        private startX: number = 0;
        private startY: number = 0;
		public constructor(mapContainer:egret.DisplayObjectContainer,w:number,h:number,cellSize:number,creater:ITileTypeCreater){
			this.CELL_WIDTH = cellSize;
            this.CELL_HIGHT = cellSize * 0.5;
            
            this.WIDTH = w + this.CELL_WIDTH * 2;
            this.HEIGHT = h + this.CELL_HIGHT * 2;
            
            this.startX = - this.CELL_WIDTH;
            this.startY = - this.CELL_HIGHT;
			
			this.len_x = Math.ceil(this.WIDTH/(this.CELL_WIDTH));
			this.len_y = Math.ceil(this.HEIGHT/(this.CELL_HIGHT*0.5));
            this.map = mapContainer;
			
			this._creater = creater;
		}

		
		private len_x:number = 0;
		private len_y:number = 0;
		private p:egret.Point;
		private ix:number = 0;
		private iy:number = 0;
		private type:number = 0;
		private tile:TileVO;
		private tiles:Array<TileVO>;
		private tx:number;
		private ty:number;
        private map: egret.DisplayObjectContainer;
		
		private isShow:boolean;
		public getTiles():Array<TileVO>
		{
			this.tiles = [];
			
			for(var j:number=0;j<this.len_y;j++){
				for(var i:number=0;i<this.len_x;i++){
                    this.p = new egret.Point();
					if(j%2==0){
						this.p.x = this.startX + this.CELL_WIDTH*i;
					}else{
						this.p.x = this.startX + this.CELL_WIDTH*i + this.CELL_WIDTH*0.5;
					}
					
					this.p.y = this.startY + (this.CELL_HIGHT*0.5)*j;
					
					this.type = this._creater.getType(this.ix,this.iy);
					
					this.tile = this.getTileVOByPos(this.p.x,this.p.y);
					
					this.tiles.push(this.tile);
					
                    this.isShow = true;
					if(!this.isShow)
    				{
                        var s: egret.Shape = new egret.Shape();
                        s.graphics.beginFill(0xff0000,1);
                        s.graphics.drawCircle(0,0,2);
                        s.graphics.endFill();
                        this.map.stage.addChild(s);
                        s.x = this.p.x;
                        s.y = this.p.y;
    				}
    					
				}
			}
			
            this.isShow = true;
			
			return this.tiles;
		}
		
        public getTileVOByPos(tx:number,ty:number): TileVO
        {
            var pt:egret.Point = this.map.globalToLocal(tx,ty);
            pt.y = pt.y * 2;//转换成正方形来判断
            var t: TileVO;
            var ix:number = Math.floor(pt.x/this.CELL_HIGHT);
            var iy:number = Math.floor(pt.y/this.CELL_HIGHT);
            var px:number = pt.x /(this.CELL_HIGHT) - ix;
            var py:number = pt.y /(this.CELL_HIGHT) - iy;

            //console.log(pt.x,pt.y,"index start ",ix,iy);
            if((ix %2 == 0 && iy%2==0) || (ix %2 != 0 && iy%2 !=0)) {
                if(px < py) {
                    ix--;
                    iy++;
                }
            } else {
                if(px < (1- py)) {
                    ix--;
                } else {
                    iy++;
                }
            }
            //console.log(pt.x,pt.y,"index end ",ix,iy);
            
            var tile: TileVO = new TileVO();
            tile.ix = ix;
            tile.iy = iy;
            tile.x = ix * this.CELL_WIDTH * 0.5;
            tile.y = iy * this.CELL_HIGHT * 0.5;
            tile.type = this._creater.getType(ix,iy);
            
            return tile;
        }



	}
}