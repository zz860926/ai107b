## hillClimbingWeeklycost  (一周吃甚麼?)

###簡介
規劃一周內午晚餐要吃甚麼?
怎樣吃才能最符合自己又可以在預算之內
####預算與餐點
```javascript
var budget = 1000   //一周預算 1000元

//餐點
var diet = [
    {serving:' ',name:' ',cost:0},
    {serving:'large',name:'祥富簡餐',cost:80},       //large 份量大
    {serving:'medium',name:'祥富素香飯',cost:60},    //medium 分量中等
    {serving:'large',name:'福圓三色拼飯',cost:60},
    {serving:'medium',name:'素肉鬆手卷',cost:45},
]

```

####規則
```javascript
//晚餐吃太少 能量增加
if(si%2 == 1 && diet[fills[si]].serving == "medium" || diet[fills[si]].serving == " ") 
    score += 0.1 
//午餐吃最便宜的  能量減少
    if(si%2 == 0 && diet[fills[si]].cost == miniCost() )  
    score -=0.005
//午餐跟晚餐吃一樣(會膩)  能量增加
    if(si < slots.length-1 && diet[fills[si]].name == diet[fills[si+1]].name)  
    score +=0.03
//隔天午餐或晚餐吃一樣的(會膩)  能量增加
    if(si < slots.length-2 && diet[fills[si]].name == diet[fills[si+2]].name)  
    score +=0.01 
    ...
//超出預算 能量增加
    if(sum_cost > budget) score++  
```
####結果
`node hillClimbingWeeklycost.js`
```
solution: score=-0.020
 A11:素肉鬆手卷 A12:福圓三色拼飯
 A21:祥富素香飯 A22:祥富簡餐
 A31:素肉鬆手卷 A32:福圓三色拼飯
 A41:祥富素香飯 A42:祥富簡餐
 A51:素肉鬆手卷 A52:福圓三色拼飯
 A61:祥富素香飯 A62:祥富簡餐
 A71:素肉鬆手卷 A72:福圓三色拼飯
```