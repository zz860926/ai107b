var Solution = require("./solution");         // 引入解答類別

var budget = 1000

var diet = [
    {serving:' ',name:' ',cost:0},
    {serving:'large',name:'祥富簡餐',cost:80},    
    {serving:'medium',name:'祥富素香飯',cost:60},
    {serving:'large',name:'福圓三色拼飯',cost:60},
    {serving:'medium',name:'素肉鬆手卷',cost:45},
]

var serving =['large','medium']   //large 份量大  medium 分量中等

function miniCost(){
  var min = 50
  for(var i =1;i<diet.length;i++){
    if(min>diet[i].cost)
      min = diet[i].cost
  }
  return min
} 

var slots = [
    'A11', 'A12',   //午餐、晚餐
    'A21', 'A22',
    'A31', 'A32',
    'A41', 'A42',
    'A51', 'A52',
    'A61', 'A62',
    'A71', 'A72',
]

var cols = 2

function randInt(a, b) {
    return a + Math.floor(Math.random()*(b-a))
  }
  
function randSlot() {
  return randInt(0, slots.length)
}
  
function randDiet() {
  return randInt(0, diet.length)
}


  
  class SolutionWeeklycost extends Solution {
    constructor(v) { super(v) }
  
    static init() {
      let fills = []
      for (let i=0; i<slots.length; i++) {
        fills[i] = randDiet()
      }
      return fills
    }
  
    neighbor() {    // 單變數解答的鄰居函數。
      var i, j, t
      let fills = this.v.slice(0)
      let choose = randInt(0, 2)
      switch (choose) {
        case 0: // 任選一個改變 
          i = randSlot()
          fills[i] = randDiet()
          break
        case 1: // 任選兩個交換
          i = randSlot()
          j = randSlot()
          t = fills[i]
          fills[i] = fills[j]
          fills[j] = t
          break
      }
      return new SolutionWeeklycost(fills)                  // 建立新解答並傳回。
    }
  
    energy() {      // 能量函數
      var sum_cost = 0
      let fills = this.v
      let score = 0
      for (let si=0; si<slots.length; si++) {
        sum_cost += diet[fills[si]].cost
        if(si%2 == 1 && diet[fills[si]].serving == "medium" || diet[fills[si]].serving == " ") //晚餐吃太少 能量增加
          score += 0.1 
        if(si%2 == 0 && diet[fills[si]].cost == miniCost() )  //午餐吃最便宜的  能量減少
          score -=0.005
        if(si < slots.length-2 && diet[fills[si]].name == diet[fills[si+2]].name)    //隔天午餐或晚餐吃一樣的(會膩)  能量增加
          score +=0.01
        if(si < slots.length-1 && diet[fills[si]].name == diet[fills[si+1]].name)    //午餐跟晚餐吃一樣(會膩)  能量增加
        score +=0.03
      }
      if(sum_cost > budget) {
        score++
      }
      return score
    }
  
    toString() {    // 將解答轉為字串，以供印出觀察。
      let outs = [], fills = this.v
      for (let i=0; i<slots.length; i++) {
        let c = diet[fills[i]]
        if (i%2==0) outs.push('\n')
        outs.push(slots[i] + ':' + c.name)
      }
      return 'score=' + this.energy().toFixed(3) + outs.join(' ') + '\n\n'
    }
    
  }
  
  module.exports = SolutionWeeklycost // 將解答類別匯出。