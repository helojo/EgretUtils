module app {
	/**
	 *
	 * @author 
	 *
	 */
	export class GridTypeGenerator implements IGridTypeGenerator
	{
		public constructor() {
		}
		
        getTypeByIxIy(ix:number,iy:number): number
        {
            var type:number = Math.abs((ix*ix + iy*iy)*(ix*iy)+ix+iy)%7;
            if(type == 6)
            {
                if(Math.abs((ix + iy))%2 != 0)
                {
                    type = 4;
                }
            }else if(type == 4)
            {
                type = 1;
            }
            return type;
        }
	}
}
