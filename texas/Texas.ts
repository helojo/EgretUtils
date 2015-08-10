module app {
	/**
	 *
	 * @author 
	 *
	 */
	export class Texas {
        private pokersPool: number[] = [];
		public constructor() {
            this.pokersPool = [
                12,13,14,15,16,17,18,19,110,111,112,113,114,
                22,23,24,25,26,27,28,29,210,211,212,213,214,
                32,33,34,35,36,37,38,39,310,311,312,313,314,
                42,43,44,45,46,47,48,49,410,411,412,413,414
            ];
		}
		
		/**
		 * 自定义牌池
		 * 格式必须为 
		 * 12,13,14,15,16,17,18,19,110,111,112,113,114,
		 * 22,23,24,25,26,27,28,29,210,211,212,213,214,
		 * 32,33,34,35,36,37,38,39,310,311,312,313,314,
		 * 42,43,44,45,46,47,48,49,410,411,412,413,414
		 * 首位是花色 1黑桃 2红桃 3方块 4梅花 ;首位意外是点数 2,3,4,5,6,7,8,9,10,11(J),12(Q),13(K),14(A)
		 */ 
		public setup(arr:number[]):void
		{
            this.pokersPool = arr;
		}
		
		/**
		 * 打乱一个数组
		 */ 
        public randomizeArray(myArray:number[]):number[]
        {
            var item:any;
            var leng:number = myArray.length;
            var randomValue:number;
            for(var i:number = 0;i<leng;i++)
            {
                randomValue = parseInt(Math.random()*leng+"");
                    item = myArray[randomValue];
                    myArray[randomValue] = myArray[i];
                    myArray[i] = item;
                }
                return myArray;
        }
        
        public checkPokerType(pokers:number[]):string
        {
            this.bubbleSort(pokers);
//            console.log("pokers:" + pokers);
            var log: string = "";
            for(var i: number = 0;i < pokers.length;i++)
            {
                var num: number = pokers[i];
                var s: string = num + "";
                var yu:number = Math.pow(10,(s.length - 1));
                var t: number = Math.floor(num / yu);
                switch(t)
                    {
                    case 1:
                        log += "♠";
                        break;
                        
                    case 2:
                        log += "♥";
                        break;
                    
                    case 3:
                        log += "♦";
                        break;
                    
                    case 4:
                        log += "♣";
                        break;
                    }
                
                var point: number = num % yu;
                var ptS: string = ""+point;
                switch(point)
                    {
                    case 11:
                        ptS = "J";
                        break;
                        
                    case 12:
                        ptS = "Q";
                        break;
                    
                    case 13:
                        ptS = "K";
                        break;
                    
                    case 14:
                        ptS = "A";
                        break;
                    }
                log += ptS;
            }
            
            console.log(log);
            
            var type: string = "";
            var hua:number = this.checkHuaCount(pokers);
            var arr:number[] = this.checkSamePointCount(pokers);
            var sun: boolean = this.checkShunZhi(pokers);
            console.log("hua:"+hua);
            console.log("arr "+arr);
            console.log("sun "+sun);
            //皇家同花顺
            if(hua == 1 && sun)
            {
                console.log("同花顺");
                return;
            }
            //同花顺
            //四条
            var same:string = arr.join(",");
            if(same == "1,4" || same == "4")
            {
                console.log("四条");
                return;
            }
            //葫芦
            if(same == "2,3")
            {
                console.log("葫芦");
                return;
            }
            //同花
            if(hua == 1)
            {
                console.log("同花");
                return;
            }
            //顺子
            if(sun)
            {
                console.log("顺子");
                return;
            }
            //三条
            if(same == "1,1,3" || same == "3" || same == "1,3")
            {
                console.log("三条");
                return;
            }
            //两对
            if(same == "1,2,2" || same == "2,2")
            {
                console.log("两对");
                return;
            }
            //对子
            if(same == "1,1,1,2" || same == "2" || same == "1,2" || same == "1,1,2")
            {
                console.log("对子");
                return;
            }
            //高牌
//            if(same == "1,1,1,1,1")
//            {
////                console.log("高牌");
//            }
            console.log("高牌");
            
            return type;
        }
        
        private checkShunZhi(pokers: number[]): boolean
        {
            var b: boolean = false;
            if(pokers.length < 5)
            {
                return b;
            }
            
            var temp: number[] = [];
            var s: string = "";
            var num: number;
            var yu: number;
            for(var i: number=0;i < 5;i++)
            {
                num = pokers[i];
                s = num + "";
                yu = Math.pow(10,(s.length - 1));
                temp.push(num%yu);
            }
            
            this.bubbleSort(temp);
            
            var p: string = temp.join(",");//[12,22,33,44,45]
            var start: number = temp[0];
            var p2: string = start+"";
            var len: number = temp.length;
            var i: number = 1;
            while(i < len)
            {
                p2 += "," + (start+i);
                i++;
            }
//            console.log("p,p2?",p,p2);
            if(p == p2)
            {
                b = true;
            }
            
            return b;
        }
        
        /**
         * 相同花色的统计 
         */ 
        public checkHuaCount(pokers:number[]):number
        {
            if(pokers.length < 5)
            {
                return 0;
            }
            
            this.bubbleSort(pokers);
            var temp: number[] = [];
            var num: number;
            var count: number = 0;
            var yu: number;
            var s: string;
            var pknum: number;
            for(var i: number=0;i < 5;i++)
            {
                pknum = pokers[i];
                s = pknum + "";
                yu = Math.pow(10,(s.length - 1));
                num = Math.floor(pknum/yu);
                if(i == 0)
                {
                    temp.push(num);
                    count++;
                }else
                {
                    if(temp.indexOf(num) == -1)
                    {
                        temp.push(num);
                        count++;
                    }
                }
            }
            return count;
        }
		
        /**
         * 相同点数的统计
         */ 
        public checkSamePointCount(pokers:number[]): number[]
        {
            this.bubbleSort(pokers);
            
            var arr: number[] = [];
            var temp: number[] = [];
            var num: number;
            var s: string;
            var chu: number;
            var i: number = 0;
            var len: number = pokers.length;
                        
            while(i < len)
            {
                num = pokers[i];
                s = num + "";
                chu = Math.pow(10,(s.length - 1));
                temp.push(num%chu);
                i++;
            }
                        
            this.bubbleSort(temp);
                                    
//            console.log("牌面："+temp);
                        
            i = 0;
            var count: number = 1;
            while(i < len)
            {
                                
                num = temp[i];
                if((i+1)<len && num == temp[i+1])
                {
                    count++;
                }else
                {
                    arr.push(count);
                    count = 1;
                }
                i++;
            }
                        
                        
            this.bubbleSort(arr);
                                                
//            console.log("牌面类型："+arr);
            /**
            * [1,1,1,1,1] 高牌
            * [1,1,1,2] 对子
            * [1,2,2] 两对
            * [1,1,3] 三条
            * [2,3] 葫芦
            * [1,4] 金刚
            * 
            * 顺子
            * 同花
            */ 
            return arr;
        }
        
        /**
         * 冒泡排序 由小到大
         */ 
        private bubbleSort(A:number[]):void
        {
            for (var i:number = 0; i<A.length; i++)
            {
                for (var j:number = A.length-1; j>i; j--)
                {
                    if (A[j] < A[j - 1])
                    {
                        var cc:number = A[j - 1];
                        A[j - 1] = A[j];
                        A[j] = cc;
                    }
                }
            }
        }
        
		
	}
}
