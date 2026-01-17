function destroyer(arr, ...args){
  //console.log(args);
  let arr1 = []
  for (const arg of args){
    arr1 = arr.filter(e => e != arg)
    //console.log(arr1)
    arr = arr1
  }
  return arr
}
console.log('2.', destroyer([1, 2, 3, 1, 2, 3], 2, 3) ,'//should return [1, 1]');
console.log('3.', destroyer([1, 2, 3, 5, 1, 2, 3], 2, 3) ,'//should return [1, 5, 1]');
console.log('4.', destroyer([3, 5, 1, 2, 2], 2, 3, 5) ,'//should return [1]')
console.log('5.', destroyer([2, 3, 2, 3], 2, 3) ,'//should return []')
console.log('6.', destroyer(["tree", "hamburger", 53], "tree", 53) ,'//should return ["hamburger"]')
console.log('7.',destroyer( ["possum", "trollo", 12, "safari", "hotdog", 92, 65, "grandma", "bugati", "trojan", "yacht"], "yacht", "possum", "trollo", "safari", "hotdog", "grandma", "bugati", "trojan" ) ,'//should return [12, 92, 65]')
////////////////////////////
function truthCheck(coll, pre) {
  let arr = []
  // check if object has key
  for (const obj of coll){
    // console.log("pre in obj:",pre in obj)
    if (!pre in obj) return false
  }
  for (const obj of coll){
    // console.log(typeof obj[pre])
    if (typeof obj[pre] === 'string'){
      if (obj[pre].length > 0) arr.push(true)
      else arr.push(false)
    } else if(typeof obj[pre] === 'number'){
      console.log(obj[pre])
      if(obj[pre] !== obj[pre]) {
        arr.push(false)
        console.log(obj[pre])
      }
      else if (obj[pre] <= 0) arr.push(false)
      else if (obj[pre] === null) {
        arr.push(false)
        console.log(obj[pre])
      }
      else arr.push(true)
    } else if (typeof obj[pre] === 'object') {
      if (obj[pre] === null) arr.push(false)
      arr.push(true)
    } else arr.push(obj[pre])

  }
  console.log(arr)
  return  arr.every(e =>  null ?? e);
}
//console.log( (true||false) ?? null)
//console.log( null ?? (true||false))
//console.log( 0 ?? 'number')
let n = false
console.log( typeof n === 'number'? 
n > 0 && n !== NaN? true: false :
typeof n === 'string'? n.length > 0? true : false 
: typeof n === 'boolean'? n :
'' )

//console.log('1.', truthCheck([{name: "Quincy", role: "Founder", isBot: false}, {name: "Naomi", role: "", isBot: false}, {name: "Camperbot", role: "Bot", isBot: true}], "isBot"), '//should return false.');
//console.log('2.', truthCheck([{name: "Quincy", role: "Founder", isBot: false}, {name: "Naomi", role: "", isBot: false}, {name: "Camperbot", role: "Bot", isBot: true}], "name") ,'//should return true')
//console.log('3.', truthCheck([{name: "Quincy", role: "Founder", isBot: false}, {name: "Naomi", role: "", isBot: false}, {name: "Camperbot", role: "Bot", isBot: true}], "role") ,'//should return false')
console.log('4.', truthCheck([{name: "Pikachu", number: 25, caught: 3}, {name: "Togepi", number: 175, caught: 1}], "number") ,'//should return true')
console.log('5.', truthCheck([{name: "Pikachu", number: 25, caught: 3}, {name: "Togepi", number: 175, caught: 1}, {name: "MissingNo", number: NaN, caught: 0}], "caught") ,'//should return false')
console.log('6.', truthCheck([{name: "Pikachu", number: 25, caught: 3}, {name: "Togepi", number: 175, caught: 1}, {name: "MissingNo", number: NaN, caught: 0}], "number") ,'//should return false')
console.log('7.', truthCheck([{name: "Quincy", username: "QuincyLarson"}, {name: "Naomi", username: "nhcarrigan"}, {name: "Camperbot"}], "username") ,'//should return false')
console.log('8.', truthCheck([{name: "freeCodeCamp", users: [{name: "Quincy"}, {name: "Naomi"}]}, {name: "Code Radio", users: [{name: "Camperbot"}]}, {name: "", users: []}], "users") ,'//should return true')
console.log('9.', truthCheck([{id: 1, data: {url: "https://freecodecamp.org", name: "freeCodeCamp"}}, {id: 2, data: {url: "https://coderadio.freecodecamp.org/", name: "CodeRadio"}}, {id: null, data: {}}], "data") ,'//should return true')
console.log('10.', truthCheck([{id: 1, data: {url: "https://freecodecamp.org", name: "freeCodeCamp"}}, {id: 2, data: {url: "https://coderadio.freecodecamp.org/", name: "CodeRadio"}}, {id: null, data: {}}], "id"), '//should return false')
/////////////////////
const numbers = [1, 1, 1, 1, 1];
let sum = 0;
const forEachRes = numbers.forEach(num => {
  return (sum += num);
});
const mapRes = numbers.map(num => {
  return (sum += num);
});
console.log(forEachRes)
console.log(mapRes)
console.log([, undefined, 'a', 'b', { 20: 5 }].sort())