const body = document.body

let arr = document.querySelector(".arr")
// console.log(arr.textContent)
let arr1 = JSON.parse(arr.textContent)
console.log(arr1.length)
arr.remove()
arr = document.querySelector(".arr")
let arr2 = JSON.parse(arr.textContent)
console.log(arr2.length)
arr.remove()
let str = '<p>'
const vietEng = document.createElement("div")
vietEng.classList.add("vietEng")
body.appendChild(vietEng)
let vietReadArr = []
let englishReadArr = []

for (let i = 0; i < arr1.length; i++ ){
   
   for (let j = 0; j < arr1[i].length; j++){
      str += `<span> ${arr1[i][j]} </span><span style="color:blue;"> ${arr2[i][j]} </span>` 
      vietReadArr.push(arr1[i][j])
      englishReadArr.push(arr2[i][j])
   }
   str += "</p><p>"
}
vietEng.innerHTML = str

const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const readeng = document.querySelector("#readeng")
         
         let readEngOnly = false
         
         readeng.addEventListener("change", () => {
            readEngOnly = !readEngOnly
         })
         function speakMinutes_viet() {
            if (vietReadArr.length > 0){
               let txt = vietReadArr.shift(); // extract first item
               
               let utterance = new SpeechSynthesisUtterance(txt);
               // When the current utterance ends, speak the next one
               utterance.onend = function (event) {
               speakMinutes_eng(); // Recursively call the function for the next item
               };

               // Handle potential errors
               utterance.onerror = function (event) {
                  console.error('Speech synthesis error: ' + event.error);
               };
               utterance.lang = 'vi-VN'

               let txt1 = '<span style="color:red"> '+englishReadArr[0].trim()+' </span>'
               vietEng.querySelector("span").remove()
               vietEng.querySelector("span").remove()
               if(vietEng.querySelector("p").textContent === '') {
                  vietEng.querySelector("p").remove()
               }
               document.querySelector(".read").innerHTML = "<h2>"+txt+"<br>"+txt1+"</h2>"
               if( readEngOnly){
                  utterance.text = ' '
               }
               speechSynthesis.speak(utterance);

            }
         }
         const largeText = (txt, txt1) => {
            let txt2 = '<span style="color:red"> '+txt1+' </span>'
            document.querySelector(".read").innerHTML = ""
            document.querySelector(".read").innerHTML = "<h2>"+txt+"<br>"+txt2+"</h2>"
         }
         function speakMinutes_eng() {

            if (englishReadArr.length > 0) {
               let txt = englishReadArr.shift() // extract first item
               let utterance = new SpeechSynthesisUtterance(txt);
               // When the current utterance ends, speak the next one
               utterance.onend = function (event) {
               console.log('Speech ended, starting next minute.');
               speakMinutes_viet(); // Recursively call the function for the next item
               };

               // Handle potential errors
               utterance.onerror = function (event) {
                  console.error('Speech synthesis error: ' + event.error);
               };
               utterance.lang = 'en-US'
               speechSynthesis.speak(utterance);
            }
         }

function readEV(startOver = true) {
   speechSynthesis.cancel();
   if (startOver) {
      // when user click stop button two array length may not equal
      // continue reading should remove extra first element
      if (vietReadArr.length > englishReadArr.length){
         vietReadArr.shift()
      } else if (vietReadArr.length < englishReadArr.length){
         englishReadArr.shift()
      }
      speakMinutes_viet()
      
   }
}
speakButton.addEventListener('click', readEV);
stopButton.addEventListener('click', readEV.bind(null, false));