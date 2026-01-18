// Scroll down by the height of the visible window
// window.scrollBy({
//  top: window.innerHeight,
//  left: 0,
//  behavior: 'smooth' // smooth animation
// });
function add_split_sign(arr) {
   return arr.replaceAll("? ", "?~ ")
    //   .replaceAll(`," `, `,"~ `)
    //   .replaceAll(`,” `, `,”~ `)
    //   .replaceAll(`, `, `,~ `)
      .replaceAll(', “', ': “').replaceAll(', "',': "')
      .replaceAll(`: `, `:~ `)
      .replaceAll(`.'" `, `.'"~ `)
      .replaceAll("; ", ";~ ")
      .replaceAll(".” ", ".”~ ")
      .replaceAll(".’ ", ".’~ ")
      .replaceAll('." ', '."~ ')
      .replaceAll(".' ", ".'~ ")
    //   .replaceAll(",' ", ",'~ ")
      .replaceAll("\"' ", "\"'~ ")
      .replaceAll("?’ ", "?’~ ")
      .replaceAll("?” ", "?”~ ")
      .replaceAll("?\" ", "?\"~ ")
      .replaceAll("?'\"", "?'\"~")

      .replaceAll("! ", "!~ ")
      .replaceAll("!' ", "!'~ ")
      .replaceAll("!” ", "!”~ ")
      .replaceAll("!\" ", "!\"~ ")
      .replaceAll('." ', '."~ ')
      .replaceAll('. ', '.~ ')
}
function saveViet(){
   localStorage.setItem("viet", vietValue.value)
}
function getViet(){
   vietValue.value = localStorage.getItem("viet")
}
function saveEng(){
   localStorage.setItem("eng", engValue.value)
}
function getEng(){
   engValue.value = localStorage.getItem("eng")
}
function handleCopyTextAreaHTMLContent() {
    combineValue.select();
    let txt = combineValue.value
    navigator.clipboard.writeText(txt)
   //  const blob = new Blob([combineValue.value], {type: "text/plain"});
   //  // create a temporary link element
   //  const link = document.createElement("a");
   //  link.href = URL.createObjectURL(blob);
   //  link.download = 
}
function show_arr(viet_arr, eng_arr) {
   let txt = "<p>"
   
   for (let ind_snt = 0; ind_snt < viet_arr.length; ind_snt++) {
      let e_txt = eng_arr[ind_snt].replaceAll(',,', ', ').replaceAll('.?', '. ').replaceAll('??','? ')
      let v_txt = viet_arr[ind_snt].replaceAll(',,', ', ').replaceAll('.?', '. ').replaceAll('??','? ')
      txt += `<span class="viet"> ${v_txt} </span><span class="eng"> ${e_txt} </span>`
      cnt++
   }
   txt += "</p>\n"
//    console.log(txt)
   return txt
}
function clear_output() {
   console.log("clear output() called.")
   // clear combine text area
   document.querySelector('.combinetxtarea').value = " "
   // shown
   document.querySelector('.showndiv').innerHTML = ""
   document.querySelector('.statusdiv').innerHTML = ""
   document.querySelector(".read").innerHTML = ""
}
function setFocusEng(){
   document.querySelector(".engtxtarea").focus()
   engValue.scrollTop = engValue.scrollHeight;
}
function setFocusViet(){
   document.querySelector(".viettxtarea").focus()
   window.scrollBy(0, 0);
}
function setFocusStatus(){
   
   window.scrollBy(0, 500);
}

function combine() {
   clear_output()
   engParagraphs = ""
   vietParagraphs = ""

   // store paragraphs in to arrays
   let eng_paragraphs_arr = engValue.value.split("\n")
   let viet_paragraphs_arr = vietValue.value.split("\n")
   // remove empty lines
   eng_paragraphs_arr = eng_paragraphs_arr.filter(paragraph => paragraph.length > 1)
   viet_paragraphs_arr = viet_paragraphs_arr.filter(paragraph => paragraph.length > 1)
   // if numbers of viet paragraphs array = numbers of eng paragraphs array
   if (viet_paragraphs_arr.length === eng_paragraphs_arr.length) {
      let combine_txt = ''
      // loop through both arrays 
      for (let ind_para = 0; ind_para < viet_paragraphs_arr.length; ind_para++) {
         // add ~ to locations I want to plit in each paragraph
         eng_paragraphs_arr[ind_para] = add_split_sign(eng_paragraphs_arr[ind_para])
         viet_paragraphs_arr[ind_para] = add_split_sign(viet_paragraphs_arr[ind_para])
         
         // split each paragraph and each paragraph change into array
         eng_paragraphs_arr[ind_para] = eng_paragraphs_arr[ind_para].split("~ ")
         // console.log("eng: " , eng_paragraphs_arr[ind_para].length)
         viet_paragraphs_arr[ind_para] = viet_paragraphs_arr[ind_para].split("~ ")
         // console.log("viet: ", viet_paragraphs_arr[ind_para].length)
         // if numbers of sections in each paragraph are equal
         if (eng_paragraphs_arr[ind_para].length === viet_paragraphs_arr[ind_para].length) {
            // console.log("viet:" + viet_paragraphs_arr[ind_para].length + " eng:" + eng_paragraphs_arr[ind_para].length)
            combine_txt += show_arr(viet_paragraphs_arr[ind_para], eng_paragraphs_arr[ind_para])
            engParagraphs += eng_paragraphs_arr[ind_para].join("~ ") + '~~ '
            vietParagraphs += viet_paragraphs_arr[ind_para].join("~") + '~~ '
            engParagraphs = engParagraphs.replaceAll(',,', ', ').replaceAll('.?', '. ').replaceAll('??','? ')
            vietParagraphs = vietParagraphs.replaceAll(',,', ', ').replaceAll('.?', '. ').replaceAll('??','? ')
            combine_txtarea_shown(combine_txt)

         } else {
            clear_output()
            statusInnerHTML.innerHTML = `paragraph ${ind_para}`
            let smll_arr_len = viet_paragraphs_arr[ind_para].length
            if (smll_arr_len > eng_paragraphs_arr[ind_para].length) smll_arr_len = eng_paragraphs_arr[ind_para].length
            for (let i = 0; i < smll_arr_len; i++) {
               statusInnerHTML.innerHTML += `<br>${viet_paragraphs_arr[ind_para][i]}<br>${eng_paragraphs_arr[ind_para][i]}<br>`
         
               // combineValue.value += viet_paragraphs_arr[ind_para][i] + '\n'
               // combineValue.value += eng_paragraphs_arr[ind_para][i] + '\n'
            }
            break;
         }

      }
      
   } else {
      let status_txt = "Vietnamese: no. of paragraph(s) "
      status_txt += viet_paragraphs_arr.length
      status_txt += ", English: no. of paragraph(s) "
      status_txt += eng_paragraphs_arr.length
      statusInnerHTML.innerHTML = status_txt
      let smll_arr_len = viet_paragraphs_arr.length
      if (smll_arr_len > eng_paragraphs_arr.length) smll_arr_len = eng_paragraphs_arr.length
      for (let i = 0; i < smll_arr_len; i++) {
         statusInnerHTML.innerHTML += `<br>${viet_paragraphs_arr[i]}<br>${eng_paragraphs_arr[i]}<br>`
         combineValue.value += viet_paragraphs_arr[i] + '\n'
         combineValue.value += eng_paragraphs_arr[i] + '\n\n'
      }

   }
}
function combine_txtarea_shown(txt) {

   combineValue.value = `
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
   </head>
   <style>
      * {
      cursor: pointer;
      }
      .viet {
      color: red;
      }
      img { width: 75%;}
      
   </style>
   <body>
      <div>
         <div>
            <button id="stop">Stop!</button>
            <button id="speak">Speak</button>
         </div>
         <label><input type="checkbox" id="readeng" name="pencil" >read English only</label><br>
         <a href="./">Prev</a>
         <a href="./index.html">Index</a>
         <a href="./">Next</a>
      </div>
      <div style="font-size: larger;" class="read"></div>
      <div class="vietEng">
      
      </div>
      <script>
        let vietEng = document.querySelector(".vietEng");
        let engParagraphs = \`${engParagraphs}\`
        let vietParagraphs = \`${vietParagraphs}\`
        let englishParagraphsArray = engParagraphs.split("~~")
        let vietParagraphsArray = vietParagraphs.split("~~")
        let eng_arr = []
        let viet_arr = []
        function show_arr(vietArr, engArr) {
           vietEng.innerHTML += "<p>"
           for (let i = 0; i < vietArr.length; i++) {
             vietEng.innerHTML += "<span> " + vietArr[i].trim() + ' </span><span style="color:red"> ' + engArr[i].trim() + " </span>"
             eng_arr.push(engArr[i])
             viet_arr.push(vietArr[i])
           }
           vietEng.innerHTML += "</p>"
        }
        for (let i = 0; i < vietParagraphsArray.length; i++){
           englishParagraph = englishParagraphsArray[i].split("~")
           vietParagraph = vietParagraphsArray[i].split("~")
           show_arr(vietParagraph, englishParagraph)
        }
         const readeng = document.querySelector("#readeng")
         const eng = document.querySelectorAll(".eng")
         let pre_txt = ' '
         let readEngOnly = false
         
         readeng.addEventListener("change", () => {
            readEngOnly = !readEngOnly
            
         })
         const msg = new SpeechSynthesisUtterance();
         let voice = [];
         const speakButton = document.querySelector('#speak');
         const stopButton = document.querySelector('#stop');

         
         function speakMinutes_viet(minutesArray) {
            if (minutesArray.length > 0) {

               let txt = minutesArray.shift(); // extract first item
               
               let utterance = new SpeechSynthesisUtterance(txt);
               // When the current utterance ends, speak the next one
               utterance.onend = function (event) {
               speakMinutes_eng(minutesArray); // Recursively call the function for the next item
               };

               // Handle potential errors
               utterance.onerror = function (event) {
                  console.error('Speech synthesis error: ' + event.error);
               };
               utterance.lang = 'vi-VN'
               let txt1 = '<span style="color:red"> '+minutesArray[0].trim()+' </span>'
               let v_txt = '<span> '+txt.trim()+' </span>'
               vietEng.innerHTML = vietEng.innerHTML.replace(v_txt, "");
               vietEng.innerHTML = vietEng.innerHTML.replace(txt1, "");
               document.querySelector(".read").innerHTML = "<h2>"+txt+"<br>"+txt1+"</h2>"
               if( readEngOnly){
                  utterance.text = ' '
               }
               speechSynthesis.speak(utterance);

            }
         }
         function speakMinutes_eng(minutesArray) {
            if (minutesArray.length > 0) {

               let txt = minutesArray.shift(); // extract first item
               
               let utterance = new SpeechSynthesisUtterance(txt);
               // When the current utterance ends, speak the next one
               utterance.onend = function (event) {
               console.log('Speech ended, starting next minute.');
               speakMinutes_viet(minutesArray); // Recursively call the function for the next item
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
               let combine_arr = []
               
               for (let i = 0; i < eng_arr.length; i++) {
                 combine_arr.push(viet_arr[i])
                 combine_arr.push(eng_arr[i])
               }
               speakMinutes_viet(combine_arr)
            }
         }
         speakButton.addEventListener('click', readEV);
         stopButton.addEventListener('click', readEV.bind(null, false));
      </script>
   </body>
</html>

`
   shownInnerHTML.innerHTML = txt
}

const vietValue = document.querySelector(".viettxtarea")
const engValue = document.querySelector(".engtxtarea")
const combineValue = document.querySelector(".combinetxtarea")
const statusInnerHTML = document.querySelector(".statusdiv")
const shownInnerHTML = document.querySelector(".showndiv")
let cnt = 0
vietValue.focus()
let engParagraphs = ''
let vietParagraphs = ''
 const readeng = document.querySelector("#readeng")
         const eng = document.querySelectorAll(".eng")
         let pre_txt = ' '
         let readEngOnly = false
         
         readeng.addEventListener("change", () => {
            readEngOnly = !readEngOnly
            
         })
         const msg = new SpeechSynthesisUtterance();
         let voice = [];
         const speakButton = document.querySelector('#speak');
         const stopButton = document.querySelector('#stop');

         
         function speakMinutes_viet(minutesArray) {
            if (minutesArray.length > 0) {

               let txt = minutesArray.shift(); // extract first item
               
               let utterance = new SpeechSynthesisUtterance(txt);
               // When the current utterance ends, speak the next one
               utterance.onend = function (event) {
               speakMinutes_eng(minutesArray); // Recursively call the function for the next item
               };

               // Handle potential errors
               utterance.onerror = function (event) {
                  console.error('Speech synthesis error: ' + event.error);
               };
               utterance.lang = 'vi-VN'
               let txt1 = '<span class="eng"> '+minutesArray[0].trim()+' </span>'
               let l_txt = '<span class="viet"> '+txt.trim()+' </span>'
               document.querySelector(".vietEng").innerHTML = document.querySelector(".vietEng").innerHTML.replace(l_txt, "")
               document.querySelector(".vietEng").innerHTML = document.querySelector(".vietEng").innerHTML.replace(txt1, "")
               document.querySelector(".read").innerHTML = "<h2><span class='viet'>"+txt+"</span><br>"+txt1+"</h2>"
               if( readEngOnly){
                  utterance.text = ' '
               }
               speechSynthesis.speak(utterance);

            }
         }
         function speakMinutes_eng(minutesArray) {
            if (minutesArray.length > 0) {

               let txt = minutesArray.shift(); // extract first item
               
               let utterance = new SpeechSynthesisUtterance(txt);
               // When the current utterance ends, speak the next one
               utterance.onend = function (event) {
               console.log('Speech ended, starting next minute.');
               speakMinutes_viet(minutesArray); // Recursively call the function for the next item
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
               let arr_len = document.getElementsByClassName('eng').length;
               let eng_txt1 = '';
               let viet_txt1 = '';
               let eng_arr = document.getElementsByClassName('eng')
               let viet_arr = document.getElementsByClassName('viet')
               let combine_arr = []
               
               for (let i = 0; i < arr_len; i++) {
                  
               
                  let eng_txt =eng_arr[i].textContent;
                  let viet_txt = viet_arr[i].textContent;
                  
                  // remove vscode format
                  // split eng_txt by "\n"
                  if (viet_txt.length > 2) {
                     eng_txt_arr = eng_txt.split("\n")
                     viet_txt_arr = viet_txt.split("\n")
                     // remove extra spaces cause by vscode 
                     eng_txt_arr = eng_txt_arr.map(e => e.trim())
                     viet_txt_arr = viet_txt_arr.map(e => e.trim())
                     // convert array back into text
                     eng_txt = eng_txt_arr.join(" ")
                     viet_txt = viet_txt_arr.join(" ")
                     combine_arr.push(viet_txt)
                     combine_arr.push(eng_txt)
                  }
               }
               // console.log(eng_arr)
               speakMinutes_viet(combine_arr)
            }
         }
         speakButton.addEventListener('click', readEV);
         stopButton.addEventListener('click', readEV.bind(null, false));