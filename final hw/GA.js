var co = console
var budget = 1000

var GA={
    population:[],
    mutationRate:0.1,
}
GA.diet = [
{serving:' ',name:' ',cost:0},
{serving:'large',name:'祥富簡餐',cost:80},    
{serving:'medium',name:'祥富素香飯',cost:60},
{serving:'large',name:'福圓三色拼飯',cost:60},
{serving:'medium',name:'素肉鬆手卷',cost:45},
]

var slots = [
'A11', 'A12',   //午餐、晚餐
'A21', 'A22',
'A31', 'A32',
'A41', 'A42',
'A51', 'A52',
'A61', 'A62',
'A71', 'A72',
]

var serving =['large','medium']   //large 份量大  medium 分量中等


function randInt(a, b) {
    return a + Math.floor(Math.random()*(b-a))
  }
  
function randSlot() {
  return randInt(0, slots.length)
}
  
function randDiet() {
  return randInt(0, GA.diet.length)
}

function random(a,b) {
    return a+Math.random()*(b-a);
  }
  
  function randomInt(a,b) {
    return Math.floor(random(a,b));
  }
  
  function randomChoose(array) {
    return array[randomInt(0, array.length)];
  }

function miniCost(){
    var min = 50
    for(var i =1;i<GA.diet.length;i++){
      if(min>GA.diet[i].cost)
        min = GA.diet[i].cost
    }
    return min
  } 

GA.run=function(size, maxGen) {
    GA.population = GA.newPopulation(size);
    for (t = 0; t < maxGen; t++) {
        console.log("============ generation", t, "===============")
    GA.population = GA.reproduction(GA.population);
    GA.dump();
    }
}

var fitnessCompare=(c1,c2)=>c1.fitness - c2.fitness;

GA.newPopulation=function(size) {
    var newPop=[];
    for(var i=0; i<size; i++){
        var chromosome = GA.randomChromosome();
        newPop[i] = { chromosome:chromosome, 
            fitness:calcFitness(chromosome) };
    }
    newPop.sort(fitnessCompare);
    return newPop;
}

// GA.newPopulation(2)

  // 輪盤選擇法: 落點在 i*i ~ (i+1)*(i+1) 之間都算是 i
  GA.selection = function() {
    var n = GA.population.length;
    var shoot  = randomInt(0, n*n/2);
    var select = Math.floor(Math.sqrt(shoot*2));
    return GA.population[select];
  }

GA.reproduction=function() {
    var newPop = []
    for (var i = 0; i < GA.population.length; i++) {
      var parent1 = GA.selection();
      var parent2 = GA.selection();
      var chromosome = GA.crossover(parent1, parent2);
      var prob = random(0,1);
      if (prob < GA.mutationRate) 
        chromosome = GA.mutate(chromosome);
      newPop[i] = { chromosome:chromosome, fitness:calcFitness(chromosome) };
    }
    newPop.sort(fitnessCompare);
    return newPop;
  }

  GA.dump = function() {
    for (var i=0; i<GA.population.length; i++) {
      console.log(i, GA.population[i]);
    }
  }

var KeyGA = GA;

KeyGA.randomChromosome = function () {
    let fills = []
    for (let i=0; i<slots.length; i++) {
        fills[i] = randDiet()
        //slots[i] = GA.diet[fills[i]].name
    }
    fills = fills.join('') 
    return fills
}

function calcFitness(c) {
    var sum_cost = 0
    var fitness=0;
    for (var si=0; si<c.length; si++) {
        sum_cost += GA.diet[c[si]].cost
        if(si%2 == 1 && GA.diet[c[si]].serving == "medium" || GA.diet[c[si]].serving == " ") //晚餐吃太少 能量增加
          fitness -= 0.1 
        if(si%2 == 0 && GA.diet[c[si]].cost == miniCost() )  //午餐吃最便宜的  能量減少
          fitness +=0.005
        if(si < slots.length-2 ){
            if(GA.diet[c[si]].name == GA.diet[c[si+2]].name){
                console.log(GA.diet[c[si+2]].name)
                fitness -=0.01
            }   //隔天午餐或晚餐吃一樣的(會膩)  能量增加
        }           
        if(si < slots.length-1){
            if(GA.diet[c[si]].name == GA.diet[c[si+1]].name){
                fitness -=0.03
            }    //午餐跟晚餐吃一樣(會膩)  能量增加 
        }
    }
    if(sum_cost > budget) {
        score--
      }
    return fitness;
  }
//   co.log(GA.calcFitness("22011143133400"))

  KeyGA.crossover=function (c1,c2) {
    var cutIdx = randomInt(0, c1.chromosome.length);
    var head   = c1.chromosome.substr(0, cutIdx);
    var tail   = c2.chromosome.substr(cutIdx);
    return head + tail;
  }

  KeyGA.mutate=function (chromosome) {
    var i=randomInt(0, chromosome.length);
    cMutate=chromosome.substr(0, i)+
            randomChoose(GA.diet)+
            chromosome.substr(i+1);
    return cMutate;
  }


 function string(ch){
     fills=[]
     for (let i=0; i<ch.length; i++) {
         fills[i] = GA.diet[ch[i]].name
     }
     return fills
 }
   KeyGA.run(100, 100);
