module app {
	/**
	 *
	 * @author 
	 *
	 */
	export class Grid {
		public constructor() {
		}
		
		//索引 index x /index y
        public ix: number = 0;
        public iy: number = 0;
        //格子的类型
        public type: number = 0;
        //格子的物理位置
        public px: number = 0;
        public py: number = 0;
	}
}
