$(function(){
    let box = $(`.box`);
    let blank = {};
    let ai=true;
    for(let i = 0;i<15;i++ ) {
        for (let j = 0; j < 15; j++) {
            $(`<div>`).addClass(`chess`).attr('id',i+`_`+j).appendTo(box);
            blank[i+`_`+j]=true;

        }
    }
    /////////////////////落子//////////////////////
    let chess = $(`.chess`);
    let flag=true;
    let black={},white={};
    chess.on(`click`,function(){
        flag=!flag;
        let _this=$(this);
        if(_this.hasClass(`black`)||_this.hasClass(`white`)){
            return;
        }
        let coords=_this.attr(`id`);
        if(flag){
            black[coords]=true;
            delete  blank[coords];
            $(this).addClass(`black`);
            if(isSuccess(black,coords)>=5){
                chess.off(`click`);
                alert(`黑棋胜！`);
            }

        }else {
            white[coords] = true;
            delete blank[coords];
            $(this).addClass(`white`);
            if (isSuccess(white, coords) >= 5) {
                chess.off(`click`);
                console.log(`by`);
                alert(`白棋胜！`);
            }
        }
        if(ai) {
            let pos = aifn();
            black[pos] = true;
            delete blank[pos];
            $(`#` + pos).addClass(`black`);
            if (isSuccess(black, pos) >= 5) {
                chess.off(`click`);
                alert(`黑棋胜！`);
            }
            flag = !flag;
        }

    });
function aifn(){
    let blackscore =0,whitescore=0;
    let pos1 = '',pos2='';
    for(let i in blank){
       let score = isSuccess(black,i);
       if(score>=blackscore){
           blackscore=score;
           pos1=i;
       }
    }
    for(let i in blank){
        let score = isSuccess(white,i);
        if(score>=whitescore){
            whitescore=score;
            pos2=i;
        }
    }

    return blackscore >= whitescore ? pos1 : pos2;

}



 function isSuccess(obj,coords){
   let cz=1,sp=1,yx=1,zx=1;
   let [x,y] = coords.split('_');
   let i=x * 1,j=y * 1;
   //////sp//////
   while(obj[i + `_` + (++j)]){
       sp++;
   }
   j=y * 1;
   while(obj[i + `_` + (--j)]){
       sp++;
   }
   j=y * 1;
   /////cz//////
     while(obj[(++i) + `_` + j]){
         cz++;
     }
     i=x * 1;
     while(obj[(--i) + `_` + j]){
         cz++;
     }
     i=x * 1;
  //////yx//////
     while(obj[(++i) + `_` + (--j)]){
         yx++;
     }
     i=x * 1;j=y * 1;
     while(obj[(--i) + `_` + (++j)]){
         yx++;
     }
     i=x * 1;j=y * 1;
     ////zx/////
     while(obj[(--i) + `_` + (--j)]){
         zx++;
     }
     i=x * 1;j=y * 1;
     while(obj[(++i) + `_` + (++j)]){
         zx++;
     }

     return Math.max(cz,yx,zx,sp);


 }

});