function smallestCommons(arr){
   // arr should contain only 2 numbers
   // find the large number and small Number
   const largeNum = Math.max(arr[0], arr[1]);
   const smallNum = Math.min(arr[0], arr[1])
   // find all prime number up to largeNum
   let primes = [2]
   for(let i = 3; i <= largeNum; i++){
      let isPrime = true
      for( const prime of primes){
         if (i % prime === 0){
            isPrime = false
         }
      }
      if (isPrime) primes.push(i)
   }
   // console.log(`primes:`,primes)
   let MaxArr = new Array(primes.length).fill(0)

   for( let i = smallNum; i <= largeNum; i++){
      let num = i;
      let j = 0
      let countArr = new Array(primes.length).fill(0)
      while ( j < primes.length){
         while ( num % primes[j] === 0){
            countArr[j]++
            num /= primes[j]
         }
         j++
      }
      // console.log(`i:${i}, num:${num}, count:${countArr}`)
      // find max
      for (let m = 0; m < MaxArr.length; m++){
         MaxArr[m] = MaxArr[m] < countArr[m] ? countArr[m] : MaxArr[m]
      }
      console.log(`MaxArr:`,MaxArr)
   }
   let result = 1
   for (let i = 0; i < primes.length; i++){
      result *= primes[i] ** MaxArr[i]
   }
   return result
}
// console.log(smallestCommons([1,5]), '//60');
// console.log(smallestCommons([2,10]),'//2520');

// console.log(smallestCommons([1,13]), '//360360');
console.log(smallestCommons([23,18]),'6056820');
