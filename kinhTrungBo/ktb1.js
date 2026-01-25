         let vietEng = document.querySelector(".vietEng");
         
         let engParagraphs = document.getElementById("engP").textContent.trim()
         let vietParagraphs = document.getElementById("vietP").textContent.trim()
         let sourceArr = vietParagraphs.split('\n')
         let translateArr = engParagraphs.split('\n')
         // remove paragraph number, remove paragraph length, remove sum length
         let vietReadArr = []
         let englishReadArr = []
         let i = 0
         let p = 1
         let str = '<p>';
         
         do {
            console.log(sourceArr[i].trim())
            console.log(translateArr[i].trim())
            if (sourceArr[i].trim() !== translateArr[i].trim() ) {
               vietReadArr.push(sourceArr[i])
               englishReadArr.push(translateArr[i])
               str += `<span> ${sourceArr[i]} </span>`
               str += `<span style="color: blue"> ${translateArr[i]} </span>`
            } else if (sourceArr[i].trim() === translateArr[i].trim() && !isFinite(sourceArr[i].trim())) {
               vietReadArr.push(' ')
               englishReadArr.push(translateArr[i])
               str += `<span> </span>`
               str += `<span style="color: blue"> ${translateArr[i]} </span>`
            }
            if (p == Number(sourceArr[i])){
               str += "</p>\n<p>"
               p++
            }
            i++
         } while (i < sourceArr.length-1)
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
