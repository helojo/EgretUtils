module app {
	/**
	 *
	 * @author 
	 *
	 */
	export class TileTypeCreatoer implements ITileTypeCreater
	{
		public constructor() {
		}
		
        getType(ix:number,iy:number):number
        {
            return 1+Math.abs((ix*(ix*iy) + iy*iy*ix)*(ix + iy*iy))%8;
        }
	}
}
