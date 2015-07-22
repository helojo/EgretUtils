module app {
	/**
	 *
	 * @author 
	 * 根据屏幕打点，生成无限格子地图数据
	 */
	export class GridMap {
    	
        /**
        * scene 格子所在的容器
        * generator 生成格子类型的接口
        */ 
		public constructor(scene:egret.DisplayObjectContainer,generator:IGridTypeGenerator) {
            this.scene = scene;
            this.generator = generator;
		}
		
        private scene: egret.DisplayObjectContainer;
        private width: number;
        private height: number;
        private size: number;
        private generator: IGridTypeGenerator;
		
		/**
		 * sp 格子区域的起点
		 * width 格子区域的宽
		 * height 格子区域的高
		 * gridSize 格子的大小
		 */ 
		public getGrideList(sp:egret.Point,width:number,height:number,gridSize:number):Grid[]
		{
            var list: Grid[] = [];
            this.width = width;
            this.height = height;
            this.size = gridSize;
            
            var wx: number = Math.ceil(this.width / this.size);
            var wy: number = Math.ceil(this.height / this.size);
            
            var g: Grid;
            var x: number;
            var y: number;
            for(var j: number = 0;j < wy;j++)
            {
                for(var i: number = 0;i < wx;i++)
                {
                    x = sp.x + this.size*i;
                    y = sp.y + this.size*j;
                    
                    g = this.getGridByPoint(x,y);
                    list.push(g);
                }
            }
            
            return list;
		}
		
		/**
		 * 根据屏幕上的点，找到点下方对应的格子
		 */ 
		public getGridByPoint(x:number,y:number):Grid
		{
            var g: Grid;
            //先将屏幕上的点，转换成scene下的点。
            var p: egret.Point = this.scene.globalToLocal(x,y);
            
            //根据新的点算出索引
            var ix: number = Math.floor(p.x / this.size);
            var iy: number = Math.floor(p.y / this.size);
            
            //根据索引算出位置
            var px: number = ix * this.size;
            var py: number = iy * this.size;
            
            //返回相应的格子
            g = new Grid();
            g.ix = ix;
            g.iy = iy;
            g.px = px;
            g.py = py;
            g.type = this.generator.getTypeByIxIy(ix,iy);
            
            return g;
		}
	}
}
