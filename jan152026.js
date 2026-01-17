
//-------------------
console.log(`new Array(5)`)
const emptyArray = new Array(5);
console.log(emptyArray.length);
console.log(emptyArray);
//-------------------------
console.log(`Array.from({length: 5});`)
const fixedLengthArray = Array.from({length: 5});
console.log(fixedLengthArray.length);
console.log(fixedLengthArray);
//------------------------
console.log(`new Array(3).fill(0);`)
const filledArray = new Array(3).fill(0);
console.log(filledArray);
///////////////////////////
console.log("Build a Pyramid Generator")
function pyramid(str, row, vertexDown){
  let pyramidStr = ''
  for (let i = row-1,j = 1; i >= 0; i--, j+=2){
      let pyramidStr1 = '\n'+' '.repeat(i)+str.repeat(j) ;
      if (vertexDown){
        pyramidStr = pyramidStr1 + pyramidStr;
      } else {
        pyramidStr += pyramidStr1
      }
    }
  return pyramidStr+'\n';
}
console.log(pyramid('o',4,false))
console.log(pyramid('p',5,true))
//////////////////////////////
console.log("Build a Gradebook App");
function getAverage(testScores){
  return testScores.reduce((total,current) => total + current, 0)/testScores.length;
}
function getGrade(studentScore){
  if(studentScore === 100) return 'A+'
  if(studentScore >= 90) return 'A';
  if(studentScore >= 80) return 'B';
  if(studentScore >= 70) return 'C';
  if(studentScore >= 60) return 'D';
  if(studentScore >= 0) return 'F';
}
function hasPassingGrade(score){
  if (getGrade(score) == 'F') return false
  return true
}
function studentMsg(scores, studentScore){
  let average = getAverage(scores);
  let grade = getGrade(studentScore);
  let str = `Class average: ${average}. Your grade: ${grade}. `
  if (hasPassingGrade(studentScore)){
    str += "You passed the course.";
  } else {
    str += "You failed the course.";
  }
  return str;
}
console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37))
/////////////////////////////
console.log("Build a Title Case Converter")
function titleCase(str){
  str = str.toLowerCase()
  let arr = str.split(/\s+/)
  for(let i=0; i<arr.length; i++){
    arr[i] = arr[i].split("")
    arr[i][0] = arr[i][0].toUpperCase();
    arr[i] = arr[i].join("")
  }
  return arr.join(" ");
}
console.log(titleCase("I like to code"))
/////////////////////////////
console.log("Falsy Remover");
function bouncer(arr){
  return arr.filter(e => Boolean(e))
}
console.log(bouncer([7, "ate", "", false, 9]))
////////////////////////
let inventory = [];

function findProductIndex (productName){
  for (let i = 0; i < inventory.length; i++){
    if(inventory[i]["name"] === productName.toLowerCase()){
      return i
    }
  }
  return -1
}

console.log(findProductIndex("Flour"))
function addProduct (product){
  product["name"] = product["name"].toLowerCase()
  let productIndex = findProductIndex(product["name"])
  if(productIndex === -1){
    inventory.push(product)
    console.log(`${product.name} added to inventory`)
  } else {
    inventory[productIndex].quantity += product.quantity;
    console.log(`${product.name} quantity updated`)
  }
}

function removeProduct(name, quantity){
  name = name.toLowerCase();
  let productIndex = findProductIndex(name)
  if(productIndex === -1){
    console.log(`${name} not found`)
  } else {
    if(inventory[productIndex].quantity > quantity){
      inventory[productIndex].quantity -=   quantity;
      console.log(`Remaining ${name} pierces: ${inventory[productIndex].quantity}`)
    } else {
      console.log(`Not enough ${name} available, remaining pieces: ${inventory[productIndex].quantity}`)
      inventory.splices(productIndex,1);
    }
  }
}
addProduct({name:"flour", quantity:10})
removeProduct("FLOUR",5)
// addProduct({name: "FLOUR", quantity: 5})
console.log(inventory);
///////////////
console.log("Arguments Object");
function logArgs() {
  for (const arg of arguments){
    console.log(arg);
  }
}
logArgs(1,2,3);
logArgs("example");
function getArg() {
  return arguments[1];
}
console.log(getArg(2,4,6));

function hasCat() {
  return [...arguments].includes("cat");
}
console.log(hasCat("dog", "chicken", "cat"));
//////////////////////
function logArgsWithRest(...args) {
  for (const arg of args) {
    console.log(arg);
  }
}
logArgsWithRest(1,2,3);
function hasDogs(...args){
  return args.includes("dogs");
}
console.log(hasDogs("dogs", "chicken", "cat"))
/////////////////////
function uniteUnique(...args){
  let arr1 = []
  for(const arg of args){
    arr1 = arr1.concat(arg)
  }
  return arr1
}
console.log(uniteUnique([1, 2, 4], [2, 3, 5]))
//////////////////////////
console.log("Unique Sorted Union");
function uniteUnique(...args){
  let arr1 = []
  for(const arg of args){
    for(const arg1 of arg){
      arr1.includes(arg1)?"":arr1.push(arg1)
    }
  }
  return arr1
}

console.log(uniteUnique([1, 2, 4], [2, 3, 5]))
//////////////////
console.log("Password Generator App");
function generatePassword(passwrdLength){
  let psw = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let arr = []
  for(let i = 0; i < passwrdLength; i++){
    let rnd = Math.floor(Math.random()*(psw.length))
    // console.log(rnd, psw[rnd])
    arr.push(psw[rnd])
  }
  return arr.join("")
}
console.log(generatePassword(8))
////////////////////
function sumAll(arr){
  let sum = 0
  for(let i=Math.min(...arr); i<=Math.max(...arr); i++){
    sum += i
  }
  return sum
}
console.log(sumAll([4,1]))
///////////////////
function pairElement(str){
  let arr = []
  for(let i = 0; i<str.length; i++){
    switch (str[i]){
      case 'A': arr.push(["A","T"]); break;
      case 'T': arr.push(['T','A']); break;
      case 'C': arr.push(['C','G']); break;
      case 'G': arr.push(['G','C'])
    }
  }
  return arr;
}
pairElement("ATCGA")
////////////////////////
function convertHTML (str){
  return str.replaceAll('&',"&amp;").replaceAll('<','&lt;').replaceAll('>',"&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")
}
console.log(convertHTML("Dolce & Gabbana"))
///////////////
function sumFibs(num){
  let arr = [0,1]
  let sum = 0
  let nextFib = arr[arr.length-1]
  while (nextFib <= num) {
    nextFib = arr[arr.length-1]+arr[arr.length-2]
    if (nextFib <= num)  arr.push(nextFib)
  }
  
  let arr1 = arr.filter(e => e%2 === 1)
  arr.forEach((e) => {
    sum += e % 2 === 1? e : 0
  })
  return sum;
}
console.log(sumFibs(4))
console.log(sumFibs(4000000))
console.log(sumFibs(1000))
//////////////////
function dropElements(arr, func){
  for(let i = 0; i < arr.length; i++){
    if (func(arr[i])){
      return arr.slice(i)
    }
  }
  return []
}
console.log(dropElements([1,2,3,4], function(n){return n >= 3}))
console.log(dropElements([0, 1, 0, 1], function(n) {return n === 1;}))
console.log(dropElements([1, 2, 3], function(n) {return n > 0;}));
console.log(dropElements([1, 2, 3, 4], function(n) {return n > 5;}))

let stringArray = [8, 9, 10].toString();
console.log(stringArray);
console.log(Number(undefined), Number(null))

function trackTotal(initialValue) {
  let total = initialValue;
  return function(increment){
    total += increment;
    return total;
  }
}
let track = trackTotal(1);
console.log(track(2));
console.log(track(3))
//////////////////////
let numbers = [1,2,3,4,5];
numbers.forEach((number, index, array) =>{
  console.log(`Element ${number} is at index ${index} in array ${array}`)
})
//////////////////////////
function operateOnArray( arr, operation){
  let result = []
  for (let i = 0; i < arr.length; i++){
    result.push(operation(arr[i]))
  }
  return result
}
function double(x) {
  return x * x;
}
let numbers1 = [1, 2, 3, 4, 5];
let squareNumbers = operateOnArray(numbers1, double);
console.log(squareNumbers);
/////////
function multiplyBy(factor){
  return function(number){
    return number * factor;
  }
}
let double1 = multiplyBy(2)
let tripple = multiplyBy(3)
console.log(double1(5))
console.log(tripple(5))
////////////////////
// let
numbers = [3,4,5,6,7].map((element, index, array) => {
  console.log("Lelement:", element);
  console.log("Index:", index);
  console.log("array:", array);
  return element * 2;
})
console.log(numbers);
/////////////////////
let obj = {
  value: 1,
  increment: function() {
    this.value++;
    return this;
  },
  double: function(){
    this.value *= 2;
    return this;
  },
  getValue: function() {
    return this.value;
  }
}
console.log(obj.increment().double().increment().getValue())
////////////////////////
const library = [
  {
    title: 'Your Next Five Moves: Master the Art of Business Strategy',
    author: 'Patrick Bet-David and Greg Dinkin',
    about: 'A book on how to plan ahead',
    pages: 320,
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    about: 'A practical book about discarding bad habits and building good ones',
    pages: 320,
  },
  {
    title: 'Choose Your Enemies Wisely: Business Planning for the Audacious Few',
    author: 'Patrick Bet-David',
    about:
      "A book that emphasizes the importance of identifying and understanding one's adversaries to succeed in the business world",
    pages: 304,
  },
  {
    title: 'The Embedded Entrepreneur',
    author: 'Arvid Kahl',
    about: 'A book focusing on how to build an audience-driven business',
    pages: 308,
  },
  {
    title: 'How to Be a Coffee Bean: 111 Life-Changing Ways to Create Positive Change',
    author: 'Jon Gordon',
    about: 'A book about effective ways to lead a coffee bean lifestyle',
    pages: 256,
  },
  {
    title: 'The Creative Mindset: Mastering the Six Skills That Empower Innovation',
    author: 'Jeff DeGraff and Staney DeGraff',
    about: 'A book on how to develop creativity and  innovation skills',
    pages: 168,
  },
  {
    title: 'Rich Dad Poor Dad',
    author: 'Robert Kiyosaki and Sharon Lechter',
    about: 'A book about financial literacy, financial independence, and building wealth. ',
    pages: 336,
  },
  {
    title: 'Zero to Sold',
    author: 'Arvid Kahl',
    about: 'A book on how to bootstrap a business',
    pages: 500,
  },
];

console.log("Books in the Library:\n");

function getBookInformation(catalog) {
  return catalog.map(book => `${book.title} by ${book.author}`).join("\n");
}

console.log(getBookInformation(library));

console.log("\nList of book summaries:\n");

function getBookSummaries(catalog) {
  return catalog.map((book) => book.about).join("\n");
}

console.log(getBookSummaries(library));

console.log("\nList of books by Arvid Kahl:\n");

function getBooksByAuthor(catalog, author) {
  return catalog.filter((book) => book.author === author);
}

console.log(getBooksByAuthor(library, "Arvid Kahl"));

console.log("\nList of books by James Clear:\n");
console.log(getBooksByAuthor(library, "James Clear"));

console.log("\nTotal number of pages for all library books:\n");
function getTotalPages (catalog){
  return catalog.reduce((total, current) => total + current.pages, 0);
}
console.log(getTotalPages(library))
//////////////////////
const books = [
  {
    title: 'Your Next Five Moves: Master the Art of Business Strategy',
    authorName: 'Patrick Bet-David and Greg Dinkin',
    releaseYear: 2015,
  },
  {
    title: 'Atomic Habits',
    authorName: 'James Clear',
    releaseYear: 2025,
  },
  {
    title: 'Choose Your Enemies Wisely: Business Planning for the Audacious Few',
    authorName: 'Patrick Bet-David',
    releaseYear: 1040,
  },
  {
    title: 'The Embedded Entrepreneur',
    authorName: 'Arvid Kahl',
    releaseYear: 1080,
  },
  {
    title: 'How to Be a Coffee Bean: 111 Life-Changing Ways to Create Positive Change',
    authorName: 'Jon Gordon',
    releaseYear: 1560,
  },
  {
    title: 'The Creative Mindset: Mastering the Six Skills That Empower Innovation',
    authorName: 'Jeff DeGraff and Staney DeGraff',
    releaseYear: 1681,
  },
  {
    title: 'Rich Dad Poor Dad',
    authorName: 'Robert Kiyosaki and Sharon Lechter',
    releaseYear: 1361,
  },
  {
    title: 'Zero to Sold',
    authorName: 'Arvid Kahl',
    releaseYear: 2003,
  },
];

function sortByYear( book1, book2 ){
  return book1.releaseYear > book2.releaseYear ?  1 : book1.releaseYear < book2.releaseYear ? -1 : 0
}

let filteredBooks = books.filter( book => book.releaseYear < 1950).sort(sortByYear)
console.log(filteredBooks)
///////////////
function getIndexToIns(arr, num){
  let ind = arr.sort((a,b)=>a-b).findIndex(e => e >= num)
  console.log(ind)
  return ind >= 0 ? ind : arr.length > 0 ? arr.length : 0
}
console.log(getIndexToIns([1,2,3,4],1.5))
console.log(getIndexToIns([20,3,5],10))
console.log(getIndexToIns([10, 20, 30, 40, 50], 35))
console.log(getIndexToIns([10, 20, 30, 40, 50], 30))
console.log(getIndexToIns([3, 10, 5], 11))
console.log(getIndexToIns([], 5))
console.log(getIndexToIns([3, 10, 5], 3))
///////////////////////////
function diffArray(arr1, arr2){
  return [...arr1.filter(e => !arr2.includes(e)),
  ...arr2.filter(e => !arr1.includes(e))]
  return [...arr3, ...arr4 ]
}
console.log(diffArray(["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"]),'\n//should return ["pink wool"]');
console.log(diffArray(["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"], ["andesite", "grass", "dirt", "dead shrub"]));
console.log('\n//should return ["diorite", "pink wool"]')
console.log(diffArray(["pen", "book"], ["book", "pencil", "notebook"]),'should return ["pen", "pencil", "notebook"].');
console.log(diffArray(["car", "bike", "bus"], ["bike", "train", "plane", "bus"]),'\n//should return ["car", "train", "plane"]');
console.log(diffArray(["apple", "orange"], ["apple", "orange", "banana", "grape"]),'\n// should return ["banana", "grape"].');
console.log(diffArray([], ["apple", "banana"]),'\n// should return ["apple", "banana"]');
console.log(diffArray(["apple", "banana"], []),'\n// should return ["apple", "banana"].');
console.log(diffArray([], []),'\n// should return [])')
console.log(diffArray(["apple", "banana"], ["apple", "banana"]),'\n// should return [])')
///////////////////////
function destroyer (arr, ...args){
  return arr.filter(e => !args.includes(e))
}
console.log(destroyer([1, 2, 3, 1, 2, 3], 2, 3), '\n// should return [1, 1].');
console.log(destroyer([1, 2, 3, 5, 1, 2, 3], 2, 3),'\n// should return [1, 5, 1].)');
console.log(destroyer([3, 5, 1, 2, 2], 2, 3, 5), '\n// should return [1].)');
console.log(destroyer([2, 3, 2, 3], 2, 3),'\n//should return []');
console.log(destroyer(["tree", "hamburger", 53], "tree", 53),'\n//should return ["hamburger"]');
console.log(destroyer( ["possum", "trollo", 12, "safari", "hotdog", 92, 65, "grandma", "bugati", "trojan", "yacht"], "yacht", "possum", "trollo", "safari", "hotdog", "grandma", "bugati", "trojan" ),'\n//should return [12, 92, 65]');
/////

console.log("\n\n\n")
function whatIsInAName(objs, obj2){
  let keys2 = Object.keys(obj2)
  console.log("keys2:", keys2);

  let arr1 = objs.filter(obj1 => {
    let arrBool = []
    let keys1 = Object.keys(obj1)
    for( const key2 of keys2){
      // search for key2 in keys1
      if (Object.keys(obj1, key2)){
        if (obj1[key2] === obj2[key2]){
          arrBool.push(true)
        } else arrBool.push(false)
      }
    }
    console.log(arrBool)
    console.log(arrBool.some(e => e === false))// ? '' : obj1
    return arrBool.every(e => e === true) ? obj1 : ''
  })
  return arr1
}
console.log('2.',whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" }), '\n//should return [{ first: "Tybalt", last: "Capulet" }]\n');
console.log('3.',whatIsInAName([{ "apple": 1 }, { "apple": 1 }, { "apple": 1, "bat": 2 }], { "apple": 1 }), '\n//should return [{"apple": 1}, {"apple": 1}, {"apple": 1, "bat": 2}]\n');
console.log('4.',whatIsInAName([{ "apple": 1, "bat": 2 }, { "bat": 2 }, { "apple": 1, "bat": 2, "cookie": 2 }], { "apple": 1, "bat": 2 }), '\n//should return [{"apple": 1, "bat": 2}, {"apple": 1, "bat": 2, "cookie": 2}]\n');
// console.log('5.',whatIsInAName([{ "apple": 1, "bat": 2 }, { "apple": 1 }, { "apple": 1, "bat": 2, "cookie": 2 }], { "apple": 1, "cookie": 2 }), '\n//should return [{"apple": 1, "bat": 2, "cookie": 2}]');
// console.log('6.',whatIsInAName([{"a": 1, "b": 2, "c": 3}], {"a": 1, "b": 9999, "c": 3}), '\n//should return []\n');
// console.log('7.',whatIsInAName([{"a": 1, "b": 2, "c": 3, "d": 9999}], {"a": 1, "b": 9999, "c": 3}), '\n//should return []\n');

function sumPrimes(num){
  let primes = [2];
  // next number 3 % 2 = 1 => 3 prime
  // save 3 to array
  // next number 4 % 2 = 0 
  // next number 5: 5 % 2 = 1, 5 % 3 = 2 => 5 prime
  // save 5 to array
  // next number 6: 6 % 2 = 0 not prime
  if (num > 1){
    for(let i = 2; i <= num; i++){
      let isPrime = true
      for (const prime of primes){
        if (i % prime ===  0) {
          isPrime = false
          break;
        }
      }
      if(isPrime && !primes.includes(i)) {
        primes.push(i)
        // console.log(primes)
      }

    }
    return primes.reduce((t,c) => t+c,0)
  }
  return 0
}
console.log(sumPrimes(10))
console.log(sumPrimes(2))
console.log(sumPrimes(0))
console.log(sumPrimes(977))
// 
console.log("Smallest Common Multiply")
function smallestCommons(arr){
  let max = Math.max(arr[0], arr[1]);
  let min = Math.min(arr[0], arr[1]);
  let fullArray = [];
  for (let i = max; i >= min; i-= min){
    fullArray.push(i)
  }
  let i = 0;
  let SCM = fullArray[0]
  let multiplied = 1;
  do {
    multiplied = SCM * fullArray[0]
    let str = "multiplied:"+multiplied
    for(i = 1; i<fullArray.length; i++){
      str += `, SCM:${SCM}`
      str += ", i:"+i
      str += `, fullArray[${i}]:${fullArray[i]}`
      str += `, ${multiplied} $ ${fullArray[i]} = ${multiplied%fullArray[i]}`
      str += "\n"
      console.log(str)
      // console.log(`i:${i} fullArray[${i}]:${fullArray[i]}, ${multiplied%fullArray[i]}`)
      if(multiplied % fullArray[i] !== 0){
        SCM += fullArray[0];
        break;
      }
    }
  }while(i<fullArray.length-1);
    return SCM
  
  
 
}
console.log(smallestCommons([1,5]), '//60');
// console.log(smallestCommons([2,10]),'//2520');

// console.log(smallestCommons([1,13]), '//360360');
// console.log(smallestCommons([23,18]),'6056820');

