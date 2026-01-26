let vietEng = document.querySelector(".vietEng");

let paragraphs = document.getElementById("engP").textContent.trim()
paragraphs = paragraphs.split("\n")

// Regex to check if a line contains only digits
const isNumberLine = line => /^\d+$/.test(line);


         // remove paragraph number, remove paragraph length, remove sum length
         let vietReadArr = []
         let englishReadArr = []
         let ind = 0
         let paragraphNum = 1
         let str = '<p>';
         let sourceLine = ''
         let translateLine = ''
         do {
            sourceLine = paragraphs[ind].slice(3).trim()
            translateLine = paragraphs[ind+1].slice(3).trim()

            console.log(sourceLine)
            console.log(translateLine)
            
            // if (sourceArr[i].trim() !== translateArr[i].trim() ) {
            if (sourceLine != translateLine){
               // vietReadArr.push(sourceArr[i])
               vietReadArr.push(sourceLine)
               englishReadArr.push(translateLine)
               // str += `<span> ${sourceArr[i]} </span>`
               str += `<span> ${sourceLine} </span>`
               // str += `<span style="color: blue"> ${translateArr[i]} </span>`
               str += `<span style="color: blue"> ${translateLine} </span>`
            // } else if (sourceArr[i].trim() === translateArr[i].trim() && !isFinite(sourceArr[i].trim())) {
            } else if (sourceLine === translateLine && !isFinite(sourceLine)) { // if text both s and d are the same 
               // diplay and read only one
               vietReadArr.push(' ')
               // englishReadArr.push(translateArr[i])
               englishReadArr.push(translateLine)
               str += `<span> </span>`
               // str += `<span style="color: blue"> ${translateArr[i]} </span>`
               str += `<span style="color: blue"> ${translateLine} </span>`
            }
            // if (p == Number(sourceArr[i])){
            if (paragraphNum == Number(sourceLine)){
               str += "</p>\n<p>"
               paragraphNum++
            }
            ind+=2
         } while (ind < paragraphs.length)
         str += "</p>"
         vietEng.innerHTML = str

         const readeng = document.querySelector("#readeng")
         let pre_txt = ' '
         let readEngOnly = false
         
         readeng.addEventListener("change", () => {
            readEngOnly = !readEngOnly
         })

         const msg = new SpeechSynthesisUtterance();
         let voice = [];
         const speakButton = document.querySelector('#speak');
         const stopButton = document.querySelector('#stop');
         
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
