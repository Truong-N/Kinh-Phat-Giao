const rawTA = document.getElementById("rawTA")
rawTA.focus()
const separateTA = document.getElementById("separateTA")
// const condenseTA = document.getElementById("condenseTA")
const translateTA = document.getElementById("translateTA")
// const condenseTranslateTA = document.getElementById("condenseTranslateTA")
const combineTA = document.getElementById("combineTA")
const htmlTA = document.getElementById("htmlTA")
const show = document.getElementById("show")
////////////////////////
const combineDiv = document.getElementById("combine-div")
const buttonListDiv = document.getElementById("btn-list-div")
const translateTAErrorDiv = document.getElementById("translate-ta-error-div")
////////////////////////
const paragraphLengthErrorP = document.getElementById("paragraph-length-error")
////////////////////////

const paragraphBtn = document.getElementById("paragraphBtn")
const saveRawBtn = document.getElementById("saveRawBtn")
const retrieveRawBtn = document.getElementById("retrieveRawBtn")
const separateBtn = document.getElementById("separateBtn")
const divideBtn = document.getElementById("divideBtn")
const removeEmptyLinesTranslateTABtn = document.getElementById("removeEmptyLinesTranslateTABtn")
const saveTranslateBtn = document.getElementById("saveTranslateBtn")
const retrieveTranslateBtn = document.getElementById("retrieveTranslateBtn")
const translate2ClipboardBtn = document.getElementById("translate2ClipboardBtn")
const pasteBtn = document.getElementById("paste-btn")
const combineBtn = document.getElementById("combineBtn")
const combine2ClipboardBtn = document.getElementById("combine2ClipboardBtn")
const output2FileBtn = document.getElementById("output2FileBtn")

// Regex to check if a line contains only digits
const isNumberLine = line => /^\d+$/.test(line);
////////////////////////
//////////////////////// Save Raw Button
if (!saveRawBtn){
   console.log("saveRawBtn not found");
}
saveRawBtn.addEventListener('click', function (){
   if (rawTA.value.length > 0){
      rawTA.select()
      localStorage.setItem("raw", rawTA.value)
   } else {console.log("Raw text area is empty")}
})

//////////////////////// Retrive Raw Button
if (!retrieveRawBtn){
   console.log("retrieveRawBtn not found");
}
retrieveRawBtn.addEventListener('click', function (){
   rawTA.value = ''
   rawTA.value = localStorage.getItem("raw")
})

//////////////////////// Check Paragraph Length Button
if (!paragraphBtn){
   console.log("paragraphBtn not found")
}
paragraphBtn.addEventListener("click", () =>{
   paragraphLengthErrorP.innerHTML = ''
   let txt = rawTA.value.trim()
   separateTA.value = ''
   let paragraphs = txt.split("\n")
   let i = 0;
   for(const paragraph of paragraphs){
      if(paragraph.length > 4200){
         paragraphLengthErrorP.innerHTML += `(${i}) ${paragraph.slice(0,20)} <br>`
      } 
      i++
   }
   if(paragraphLengthErrorP.innerHTML === ''){
      paragraphLengthErrorP.innerHTML = "Finished checking paragraph length"
   }
})
////////////////////////
/////////////////////// Separate Button
if (!separateBtn){
   console.log("separateBtn not found");
}
separateBtn.addEventListener('click', function () {
   let sumLength = 0
   let groupNumber = 0
   let txt = rawTA.value
      .replaceAll('. "', '."')
      .replaceAll(". ", ".. ")
      .replaceAll('." ', '.". ')
      .replaceAll(": ", ":: ")
      .replaceAll("; ", ";; ")
      .replaceAll("? ", "?? ")
      .replaceAll("! ", "!! ")
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
   let array = txt
      .split('\n') // split to array
      .filter(e => e.length>1) // remove empty lines
      .map((e,i) => { // each array is a paragraph, out put array number, total length
         if(sumLength+e.length>4200){
            sumLength=e.length
            groupNumber++
         }
         else sumLength += e.length
         return `${i}\n${groupNumber}\n${sumLength}\n`+e.trim()
      })
   array = array.map(e => e.split(/[.;:?!] /g).join("\n"))
   separateTA.value = array.join("\n")
   }
)
//////////////////////// Google translate can handle max 5000 / page, if text in separate
// textarea is too long, a list of buttons appears here in sequencial order
// eadh button contain up to 5000 characters, 
if (!buttonListDiv){
   console.log("btn-list-div not found");
}
/////////////////////// Divide Button 
if (!divideBtn){
   console.log("divideBtn not found");
}
let separateArr = []
let separateArrBtn = []
divideBtn.addEventListener('click', () => {
   let wholeTxt = separateTA.value.trim()
   let wholeTxtArr = wholeTxt.split('\n')
   let lineNumber = Number(wholeTxtArr[0])
   let groupNumber = Number(wholeTxtArr[1])
   let sumLength = Number(wholeTxtArr[2])
   let groupArr = [[]]
   let groupArrI = 0
   let isNewGroup = false
   do{
      
      if ( wholeTxtArr[lineNumber] && isNumberLine(wholeTxtArr[lineNumber].trim()) &&
         wholeTxtArr[lineNumber+1] && isNumberLine(wholeTxtArr[lineNumber+1].trim()) &&
         wholeTxtArr[lineNumber+2] && isNumberLine(wholeTxtArr[lineNumber+2].trim()) ){
         if (groupNumber < Number(wholeTxtArr[lineNumber+1])){
            groupArr.push([])
            groupArrI++
            groupNumber++
         }
         groupArr[groupArrI].push(wholeTxtArr[lineNumber])
         groupArr[groupArrI].push(wholeTxtArr[lineNumber+1])
         groupArr[groupArrI].push(wholeTxtArr[lineNumber+2])
         if (groupNumber < Number(wholeTxtArr[lineNumber+1])){
            isNewGroup = true
         }
         lineNumber++
         lineNumber++
      } else {
         groupArr[groupArrI].push(wholeTxtArr[lineNumber])
         
      }
      lineNumber++
   } while( lineNumber < wholeTxtArr.length)
   separateArr = groupArr
   for (let i = 0; i < separateArr.length; i++){
      separateArrBtn[i] = document.createElement("button")
      buttonListDiv.appendChild(separateArrBtn[i])
      separateArrBtn[i].textContent = `Group ${i}`
      separateArrBtn[i].addEventListener('click', () => {
         let groupTxt = separateArr[i].join('\n')
         navigator.clipboard.writeText(groupTxt)
         separateArrBtn[i].style.display = "none"
      })
   }
   // console.log(separateArr)
})
////////////////////////
// translate section
/////////////////////// Save content of translate text area to momory
if (!saveTranslateBtn){
   console.log("saveTranslateBtn not found");
}
saveTranslateBtn.addEventListener('click', function (){
   if (translateTA.value.length > 0){
      translateTA.select()
      localStorage.setItem("translate", translateTA.value)
   } else {console.log("translateTA is empty")}
})
//////////////////////// Retrieve Translate Textarea
if(!retrieveTranslateBtn){
   console.log("retrieveTranslateBtn not found");
}
retrieveTranslateBtn.addEventListener('click', () =>{
   translateTA.value = localStorage.getItem("translate")
})
//////////////////////// copy content of translate textarea to clipboard
if(!translate2ClipboardBtn){
   console.log("translate2ClipboardBtn not found");
}
translate2ClipboardBtn.addEventListener('click', () =>{
   translateTA.select()
   navigator.clipboard.writeText(translateTA.value)
})
///////////////////////
if (!translateTAErrorDiv){
   console.log("translateTAErrorDiv not found")
}
if(!removeEmptyLinesTranslateTABtn){
   console.log("removeEmptyLinesTranslateTABtn not found")
}        
removeEmptyLinesTranslateTABtn.addEventListener('click', () =>{
   let txt = translateTA.value
   let arr = txt.split('\n')
   let newArr = arr.filter(e => e.length > 0)
   let newTxt = newArr.join('\n')
   translateTA.value = newTxt
   let newArrI = 0
   let found3 = []
   do{
      if ( newArr[newArrI] && isNumberLine(newArr[newArrI].trim()) &&
      newArr[newArrI+1] && isNumberLine(newArr[newArrI+1].trim()) &&
      newArr[newArrI+2] && isNumberLine(newArr[newArrI+2].trim()) ){
         found3.push(Number(newArr[newArrI]))
         newArrI++
         newArrI++
      } 
      newArrI++
   } while (newArrI < newArr.length)
   combineTA.value = ''
   translateTAErrorDiv.innerHTML = ''
   for (let i = 1; i < found3.length; i++){
      if (found3[i] - found3[i-1] > 1){
         translateTAErrorDiv.innerHTML += `${found3[i-1]} to ${found3[i]}; `
      }
   }
})
//////////////////////// append clipboard to translate texteara
if (!pasteBtn){
   console.log("pasteBtn not found")
}
pasteBtn.addEventListener("click", async() => {
   if (!navigator.clipboard || !navigator.clipboard.readText) {
      alert("Clipboard API not supported in this browser.");
    
   } else {
      try {
        // Request clipboard text
        const text = await navigator.clipboard.readText();
        console.log("text:", text)
        translateTA.value += '\n' + text; // Paste into textarea
      } catch (err) {
        console.error("Failed to read clipboard: ", err);
        alert("Unable to access clipboard. Please allow permissions.");
      }
   }
})
////////////////////////
//////////////////////// Combine Button
if (!combineBtn){
   console.log("combineBtn not found")
}
combineBtn.addEventListener('click', () =>{
   let sourceTxt = separateTA.value.trim()
   let translateTxt = translateTA.value.trim()
   let sourceArr = sourceTxt.split('\n')
   let translateArr = translateTxt.split('\n')
   let smallArrLength = 0
   combineDiv.innerHTML = ''
   let txt = ''
   // compare source textarea and translate textarea   
   if (sourceArr.length !== translateArr.length){
      combineDiv.innerHTML = 'Array lenght are not equal'
      smallArrLength = Math.min(sourceArr.length, translateArr.length)
      let mismatch = false
      let i = 0 
      do {
         sourceLine = sourceArr[i].trim()
         translateLine = translateArr[i].trim()
         if( (isNumberLine(sourceLine) && !isNumberLine(translateLine)) ||
            (!isNumberLine(sourceLine) && isNumberLine(translateLine))){
            mismatch = !mismatch
            i = smallArrLength-1
         } else {
            txt += "s: "+sourceArr[i] + '\nt: ' + translateArr[i] + '\n'
         }
         i++
      } while(i < smallArrLength)
   } else {
      smallArrLength = sourceArr.length
      for (let i = 0; i < sourceArr.length; i++){
         sourceLine = sourceArr[i].trim()
         translateLine = translateArr[i].trim()
         if( (isNumberLine(sourceLine) && isNumberLine(translateLine)) &&
            (sourceLine != translateLine)){
            txt += "s: "+sourceArr[i] + '\nt: ' + translateArr[i] + '\n'
            combineDiv.innerHTML = 'Number mismatch'   
            i = sourceArr.length-1   
         } else {
            txt += "s: "+sourceArr[i] + '\nt: ' + translateArr[i] + '\n'
         }
      }
   }
   combineTA.value = txt
   
})
////////////////////////
if (!output2FileBtn){
   console.log("output2FileBtn not found")
}
output2FileBtn.addEventListener('click', () =>{
   let n = prompt("enter a number", "10")

   if (isNumberLine(n)){
      let fileNum = Number(n)
      let txt = `
&lt;!DOCTYPE html\>
&lt;html lang="en"\>
   &lt;head\>
      &lt;meta charset="UTF-8"\>
      &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"\>
      &lt;title\>KinhTrungBo${fileNum}&lt;/title\>
   &lt;/head\>
   &lt;body\>
      &lt;div\>
         &lt;div\>
            &lt;button id="stop"\>Stop!&lt;/button\>
            &lt;button id="speak"\>Speak&lt;/button\>
         &lt;/div\>
         &lt;label\>&lt;input type="checkbox" id="readeng" name="pencil" \>read English only&lt;/label\>&lt;br\>
         &lt;a href="./kinhTrungBo${fileNum-1}.html"\>Prev&lt;/a\>
         &lt;a href="./kinhTrungBo.html"\>Index&lt;/a\>
         &lt;a href="./kinhTrungBo${fileNum+1}.html"\>Next&lt;/a\>
      &lt;/div\>
      Source: //www.budsas.org/uni/u-kinh-trungbo/trung${fileNum}.htm and Google translate
      &lt;div style="font-size: larger;" class="read"\>&lt;/div\>
      &lt;div class="vietEng"\>
      &lt;/div\>
      &lt;div \>
         &lt;pre id="engP" style="display:none"\>
${combineTA.value}
         &lt;/pre\>
      &lt;/div\>
      &lt;script src="./ktb1.js"\>&lt;/script\>
   &lt;/body\>
&lt;/html\>`
   htmlTA.value = txt.replaceAll("&lt;", "<")
   } else {
      alert("please enter a number")
   }
})
////////////////////////
if (!combine2ClipboardBtn) {
   console.log("combine2ClipboardBtn not found")
}
combine2ClipboardBtn.addEventListener('click', ()=>{
   htmlTA.select()
   navigator.clipboard.writeText(htmlTA.value)
})
      

        