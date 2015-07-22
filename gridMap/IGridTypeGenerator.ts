module app {
	/**
	 *
	 * @author 
	 *
	 */
	export interface IGridTypeGenerator {
    	/**
    	 * 根据传入的ix和iy，产生格子的类型。
    	 */ 
        getTypeByIxIy(ix:number,iy:number): number;
	}
}
