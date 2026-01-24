const rawTA = document.getElementById("rawTA")
rawTA.focus()
const separateTA = document.getElementById("separateTA")
// const condenseTA = document.getElementById("condenseTA")
const translateTA = document.getElementById("translateTA")
// const condenseTranslateTA = document.getElementById("condenseTranslateTA")
const combineTA = document.getElementById("combineTA")
const show = document.getElementById("show")
////////////////////////
const saveRawBtn = document.getElementById("saveRawBtn")
const retrieveRawBtn = document.getElementById("retrieveRawBtn")
const separateBtn = document.getElementById("separateBtn")
const separate2ClipboardBtn = document.getElementById("separate2ClipboardBtn")
const removeEmptyLinesTranslateTABtn = document.getElementById("removeEmptyLinesTranslateTABtn")
const saveTranslateBtn = document.getElementById("saveTranslateBtn")
const retrieveTranslateBtn = document.getElementById("retrieveTranslateBtn")
const translate2ClipboardBtn = document.getElementById("translate2ClipboardBtn")
const combineBtn = document.getElementById("combineBtn")
const combine2ClipboardBtn = document.getElementById("combine2ClipboardBtn")
const output2FileBtn = document.getElementById("output2FileBtn")

// Regex to check if a line contains only digits
const isNumberLine = line => /^\d+$/.test(line);
////////////////////////
////////////////////////
if (!saveRawBtn){
   console.log("saveRawBtn not found");
}
saveRawBtn.addEventListener('click', function (){
   if (rawTA.value.length > 0){
      rawTA.select()
      localStorage.setItem("raw", rawTA.value)
   } else {console.log("Raw text area is empty")}
})
////////////////////////
if (!retrieveRawBtn){
   console.log("retrieveRawBtn not found");
}
retrieveRawBtn.addEventListener('click', function (){
   rawTA.value = localStorage.getItem("raw")
})
////////////////////////
///////////////////////
if (!separateBtn){
   console.log("separateBtn not found");
}
separateBtn.addEventListener('click', function () {
   let sumLength = 0
   let txt = rawTA.value
      .replaceAll(". ", ".. ")
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
         if(sumLength+e.length>4200)sumLength=e.length
         else sumLength += e.length
         return `${i}\n${e.length}\n${sumLength}\n`+e.trim()
      })
   array = array.map(e => e.split(/[.;:?!] /g).join("\n"))
   separateTA.value = array.join("\n")
   }
)
////////////////////////
if (!separate2ClipboardBtn){
   console.log("separate2ClipboardBtn not found");
}

separate2ClipboardBtn.addEventListener('click', ()=>{
   separateTA.select()
   navigator.clipboard.writeText(separateTA.value)
})
////////////////////////
// translate section
///////////////////////
if (!saveTranslateBtn){
   console.log("saveTranslateBtn not found");
}
saveTranslateBtn.addEventListener('click', function (){
   if (translateTA.value.length > 0){
      translateTA.select()
      localStorage.setItem("translate", translateTA.value)
   } else {console.log("translateTA is empty")}
})
////////////////////////
if(!retrieveTranslateBtn){
   console.log("retrieveTranslateBtn not found");
}
retrieveTranslateBtn.addEventListener('click', () =>{
   translateTA.value = localStorage.getItem("translate")
})
////////////////////////
if(!translate2ClipboardBtn){
   console.log("translate2ClipboardBtn not found");
}
translate2ClipboardBtn.addEventListener('click', () =>{
   translateTA.select()
   navigator.clipboard.writeText(translateTA.value)
})
///////////////////////
if(!removeEmptyLinesTranslateTABtn){
   console.log("removeEmptyLinesTranslateTABtn not found")
}        
removeEmptyLinesTranslateTABtn.addEventListener('click', () =>{
   let txt = translateTA.value
   let arr = txt.split('\n')
   let newArr = arr.filter(e => e.length > 0)
   let newTxt = newArr.join('\n')
   translateTA.value = newTxt
})
////////////////////////
////////////////////////
if (!combine2ClipboardBtn) {
   console.log("combine2ClipboardBtn not found")
}
combine2ClipboardBtn.addEventListener('click', ()=>{
   combineTA.select()
   navigator.clipboard.writeText(combineTA.value)
})
      
if (!combineBtn){
   console.log("combineBtn not found")
}
combineBtn.addEventListener('click', () =>{
   let sourceTxt = separateTA.value.trim()
   let translateTxt = translateTA.value.trim()
   let sourceArr = sourceTxt.split('\n')
   let translateArr = translateTxt.split('\n')
   // compare source textarea and translate textarea   
   if (sourceArr.length === translateArr.length){
      // clear combine text area
      combineTA.value = ''
      // keep track paragraph number, remove paragraph length, remove sum length
      let lineNumber= 0
      let paragraphNumber = 1
      let str = '<p>';
      do {
         // clean source line
         let sourceLine = sourceArr[lineNumber].trim()
         // clean translate line
         let translateLine = translateArr[lineNumber].trim()
         if (sourceLine !== translateLine ) {
            str += `<span> ${sourceLine} </span>`
            str += `<span style="color: blue"> ${translateLine} </span>`
         }
         if (isNumberLine(sourceLine) && paragraphNumber === Number(sourceLine)){
            str += `</p>\n<p> paragraph: ${paragraphNumber} `
            paragraphNumber++
         }
         lineNumber++
      } while (lineNumber < sourceArr.length)
      str += "</p>"
      show.innerHTML = str
   } else {
      alert("difference length: sourceArr.length: "+sourceArr.length+", translateArr.length: "+translateArr.length)
      show.innerHTML = ''
      let smallArrLength = Math.min(sourceArr.length, translateArr.length)
      let txt = ""
      for (let i = 0; i < smallArrLength; i++){
         txt += sourceArr[i] + '\n' + translateArr[i] + '\n-------\n'
      }
      combineTA.value = txt
   }
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
${translateTA.value}
         &lt;/pre\>
         &lt;pre id="vietP" style="display:none"\>
${separateTA.value}
         &lt;/pre\>
      &lt;/div\>
      &lt;script src="./ktb.js"\>&lt;/script\>
   &lt;/body\>
&lt;/html\>`
   combineTA.value = txt.replaceAll("&lt;", "<")
   } else {
      alert("please enter a number")
   }
})

        