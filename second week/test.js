
var diet = [
    {serving:' ',name:' ',cost:0},
    {serving:'large',name:'祥富簡餐',cost:80},
    {serving:'medium',name:'祥富素香飯',cost:60},
    {serving:'large',name:'福圓三色拼飯',cost:60},
    {serving:'medium',name:'素肉鬆手卷',cost:45},
]
function miniCost(){
    var min = 50
    for(var i =1;i<diet.length;i++){
      if(min>diet[i].cost)
        min = diet[i].cost
    }

    return min
  } 
  console.log("miniCost()=",miniCost())