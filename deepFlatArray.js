function steamrollArray(nestedArray){
   let flatArray = []
   let arrayFound = false
   do{
      flatArray = []
      arrayFound = false
      let i = 0
      for (i = 0; i < nestedArray.length; i++){
         if (Array.isArray(nestedArray[i])){
         arrayFound = true
         flatArray.push(...nestedArray[i])
         } else {
            flatArray.push(nestedArray[i])
         }
      }
      nestedArray = flatArray
   } while(arrayFound)
   return nestedArray
}
console.log(steamrollArray([[["a"]], [["b"]]]), '\n//2. should return ["a", "b"]');
console.log(steamrollArray([1, [2], [3, [[4]]]]), '\n//3. should return [1, 2, 3, 4].');
console.log(steamrollArray([1, [], [3, [[4]]]]) ,'\n//4. should return [1, 3, 4]');
console.log(steamrollArray([1, {}, [3, [[4]]]]) ,'\n//5.should return [1, {}, 3, 4]');
