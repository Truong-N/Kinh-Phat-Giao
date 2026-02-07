const selectTag = document.querySelector(".select-element");
const rawTA = document.querySelector(".raw-ta")
const sourceTA = document.querySelector(".source-ta");
const translateTA = document.querySelector(".translate-ta");
const htmlTA = document.querySelector(".html-ta")
const removeEmptyLinesTranslateTABtn = document.querySelector("#remove-empty-lines-translate-ta-btn")
const result = document.querySelector(".result");

// do not delete
// let ctr = 0
// if (typeof (Storage) !== "undefined") {
//     if (localStorage.lineNum) {
//         document.querySelector(".start").value = Number(localStorage.lineNum)
//     } else {
//         document.querySelector(".start").value = 0
//     }
// }

function getRawTAValue() {
    return rawTA.value.replaceAll("<", "&lt;").trim()
}

// function increaseLineNo() {
//     ctr++;
//     document.querySelector(".start").value = ctr;
//     localStorage.setItem("lineNum", ctr)
//     rawTA.value = ""
// }

function handleH1() {
   // ctr = Number(document.querySelector(".start").value)

   const rawText = getRawTAValue()
   if (rawText.length > 0) {
      // sourceTA.value += `<h1> <span class="source ${ctr}"> ${rawText} </span>\n`;
      sourceTA.value += `<h1> <span class="source"> ${rawText} </span>\n`;
      // increaseLineNo()
   } else {
      alert("Textarea above is empty!")
   }
   rawTA.value = ""
}

function handleH2() {
   // ctr = Number(document.querySelector(".start").value)

   const rawText = getRawTAValue()
   if (rawText.length > 0) {
      // sourceTA.value += `<h2> <span class="source ${ctr}"> ${rawText} </span>\n`;
      sourceTA.value += `<h2> <span class="source"> ${rawText} </span>\n`;
      // increaseLineNo()
   } else {
      alert("Textarea above is empty!")
   }
   rawTA.value = ""
}

function handleH3() {
   // ctr = Number(document.querySelector(".start").value)

   const rawText = getRawTAValue()
   if (rawText.length > 0) {
      // sourceTA.value += `<h3> <span class="source ${ctr}"> ${rawText} </span>\n`;
      sourceTA.value += `<h3> <span class="source"> ${rawText} </span>\n`;
      // increaseLineNo()
   } else {
      alert("Textarea above is empty!")
   }
   rawTA.value = ""
}

function handleH4() {
   // ctr = Number(document.querySelector(".start").value)

   const rawText = getRawTAValue()
   if (rawText.length > 0) {
      // sourceTA.value += `<h4> <span class="source ${ctr}"> ${rawText} </span>\n`;
      sourceTA.value += `<h4> <span class="source"> ${rawText} </span>\n`;
      // increaseLineNo()
   } else {
      alert("Textarea above is empty!")
   }
   rawTA.value = ""
}

function handleImg() {
   const rawText = getRawTAValue()
   if (rawText.length > 0) {
      sourceTA.value += `<img src="./images/${rawText}.png" alt="${rawText}">\n`;
      // increaseLineNo()
   } else {
      alert("Textarea above is empty!")
   }
   rawTA.value = ""
}

function handleVideo() {
   const rawText = getRawTAValue()
   if (rawText.length > 0) {
      sourceTA.value += `<video width="600" controls> <source scr="./images/${rawText}.mp4" type="video/mp4"> </video>\n`;
      // increaseLineNo()
   } else {
      alert("Textarea above is empty!")
   }
   rawTA.value = ""
}

function handleUl() {
   const rawTextArr = rawTA.value.split("\n")
   rawTextArr.forEach((liText) => {
      if (liText.length > 1) {
         // sourceTA.value += `<li> <span class="source ${ctr}"> ${liText} </span>\n`;
         sourceTA.value += `<li> <span class="source"> ${liText} </span>\n`;
         // increaseLineNo()
      }
   })
   // increaseLineNo()
   rawTA.value = ""
}

function handlePre() {
   sourceTA.value += "<pre class='english'>\n";
   sourceTA.value += rawTA.value.replaceAll("<", "&lt;");
   sourceTA.value += "\n</pre>\n";
   rawTA.value = "";
}

// function processHTMLHeader() {
//     console.log(rawTA.value)
//     // sourceTA.value += `<${selectedTag}> <span class="source ${ctr}"> ${rawTA.value.replaceAll("<", "&lt;").trim()} </span>\n`;
//     sourceTA.value += `<${selectedTag}> <span class="source"> ${rawTA.value.replaceAll("<", "&lt;").trim()} </span>\n`;
//     ctr++;
//     document.querySelector(".start").value = ctr;
//     localStorage.setItem("lineNum", ctr)
//     rawTA.value = ""
// }

function processParagraph(paragraph) {

   //  console.log(paragraph)
    // use '~' to seperate
    const paragraphArr = paragraph
        .replaceAll("ñ", "n")
        .replaceAll("û", "u")
        .replaceAll("? ", "?~ ")
        // .replaceAll(", ", ",~ ")
        .replaceAll("; ", ";~ ")
        .replaceAll(": ", ":~ ")
        .replaceAll(".” ", ".”~ ")
        .replaceAll(".’ ", ".’~ ")
        .replaceAll('." ', '."~ ')
        .replaceAll(".' ", ".'~ ")
        .replaceAll(",' ", ",'~ ")
        .replaceAll("\"' ", "\"'~ ")
        .replaceAll("?’ ", "?’~ ")
        .replaceAll("?” ", "?”~ ")
        .replaceAll("! ", "!~ ")
        .replaceAll("!” ", "!”~ ")
        .replaceAll("St.", "St ")
        .replace("e.g.", "example ")
        .replaceAll("i.e.", "example ")
        .replace("code .", "vscodedot ")
        .replaceAll(". ", ".~ ")
        .split("~")
        .map(item => {
            // let txt = `<span class="source ${ctr}"> ${item} </span>\n`;
            let txt = `<span class="source"> ${item} </span>\n`;
            // increaseLineNo()
            // return `<span class="source"> ${item} </span>\n`;
            return txt
        })
    sourceTA.value += paragraphArr
        .map((item, index) => {
            if (index === 0) {
                return "<p> " + item;
            }
            else if (index === paragraphArr.length - 1) {
                return "<pend> " + item
            }
            else {
                return "<pmid> " + item
            }
        })
        .join("")

}

function handleMultiParagraphs() {
   // ctr = Number(document.querySelector(".start").value)

   // handle multi paragraphs
   const paragraphs = rawTA.value.replaceAll("<", "&lt;").split("\n")

   paragraphs.forEach((paragraph) => {
      if (paragraph.length > 1) {
         processParagraph(paragraph)
      }
   })
   // increaseLineNo()
   rawTA.value = ""
}

function handleCopySource2Clipboard() {
    let txt = sourceTA.value.trim()
    sourceTA.value = txt
    sourceTA.select();
    navigator.clipboard.writeText(sourceTA.value)
}
const divideSourceTABtn = document.querySelector("#divide-source-ta-btn")
const divideBtnGroup = document.querySelector("#divide-btn-group")
divideSourceTABtn.addEventListener("click", () => {
   let txt = sourceTA.value.trim()
   let arr = txt.split('\n')
   // start with line number i = 0
   // get each line length, add to total length
   // if total length > 5000, save line number (i) to divide array (divideArr)
   // set total length = line (i) length
   let totalLength = 0
   let divideArr = [0]
   let i = 0
   let groupNum = 0
   do {
      totalLength += arr[i].length
      if (totalLength > 5000){
         divideArr.push(i)
         totalLength = arr[i].length
         addBtn2DivideBtnGroup(arr, divideArr[divideArr.length-2], divideArr[divideArr.length-1], groupNum)
         groupNum++
         // console.log("total length: ", totalLength)
      }
      // console.log("total length: ", totalLength)
      i++
   } while( i < arr.length)
   divideArr.push(arr.length)
   addBtn2DivideBtnGroup(arr, divideArr[divideArr.length-2], divideArr[divideArr.length-1], groupNum)
   console.log("arr length: ", arr.length)
   console.log("divide array: ", divideArr)
})
let divideBtnGroupArr = []
function addBtn2DivideBtnGroup(arr, startIndex, endIndex, groupNum){
   divideBtnGroupArr.push([])
   divideBtnGroupArr[groupNum] = document.createElement("button")
   divideBtnGroup.appendChild(divideBtnGroupArr[groupNum])
   divideBtnGroupArr[groupNum].textContent = "Group " + groupNum
   
   divideBtnGroupArr[groupNum].addEventListener("click", () => {
      let arr1 = arr.slice(startIndex,endIndex)
      let txt1 = arr1.join('\n')
      navigator.clipboard.writeText(txt1)
      // console.log(txt1)
      divideBtnGroupArr[groupNum].style.display = "none"
   })
   console.log("startIndex: ", startIndex)
   console.log("endIndex: ", endIndex)
   console.log("groupNum: ", groupNum)
}

const paste2TranslateBtn = document.querySelector("#paste2translate-btn")
paste2TranslateBtn.addEventListener("click", async ()=>{
   if (!navigator.clipboard || !navigator.clipboard.readText) {
      alert("clipboard API not support in this browser")
   } else {
      try {
         // request clipboard text
         let text = await navigator.clipboard.readText();
         translateTA.value += '\n' + text
      } catch (err) {
         alert("unable to access clipboard");
      }
      translateTA.focus()
      removeEmptyLinesTranslateTABtn.click()
   }
})
function handleCopyHTMLTA2Clipboard() {
    htmlTA.select();
    let txt = htmlTA.value.trim()
    htmlTA.value = txt
    navigator.clipboard.writeText(htmlTA.value)
}

removeEmptyLinesTranslateTABtn.addEventListener("click", () => {
    let txt = translateTA.value
    let arr = txt.split('\n')
    let arr1 = arr.filter(e => e.length > 0)
    let txt1 = arr1.join('\n')
    translateTA.value = txt1
})


function handleCombine() {
   //  const sourceTA = document.querySelector(".source-ta")
   //  const translateTA = document.querySelector(".translate-ta")
    const sourceArr = sourceTA.value.split("\n")
    const translateArr = translateTA.value.split("\n")
    document.querySelector(".arrayenglish-len").textContent = sourceArr.length
    document.querySelector(".arrayviet-len").textContent = translateArr.length

    if (sourceArr.length === translateArr.length) {
        let str1 = ""
        for (let i = 0; i < sourceArr.length; i++) {
            translateArr[i] = translateArr[i].replace( "source","translate")
            // translateArr[i] = translateArr[i].replace('">', ' hide">')

            if (sourceArr[i].includes("<pre")) {
                str1 += `${sourceArr[i]}\n`;
                i++;
                do {
                  //   console.log(sourceArr[i])
                    str1 += `${sourceArr[i]}\n`;
                    i++;
                } while (sourceArr[i] !== "</pre>")
                str1 += `${sourceArr[i]}\n`;
            } else if (sourceArr[i].includes("<p>") && i === sourceArr.length - 1) {
                str1 += `${sourceArr[i]}${translateArr[i].slice(3)} </p>\n`
            } else if (sourceArr[i].includes("<p>") && i < sourceArr.length - 1) {
                if (sourceArr[i + 1].includes("<pmid>") || sourceArr[i + 1].includes("<pend>")) {
                    str1 += `${sourceArr[i]} ${translateArr[i].slice(3)}\n`
                } else {
                    str1 += `${sourceArr[i]} ${translateArr[i].slice(3)} </p>\n`
                }
            } else {
               //  console.log(sourceArr[i].slice(0, 4) + "--------------")
                switch (sourceArr[i].slice(0, 4)) {
                    case "<img":
                    case "<vid":
                        str1 += `${sourceArr[i]}\n`
                        break;
                    case "<h1>":
                        str1 += `${sourceArr[i]} ${translateArr[i].slice(4)} </h1>\n`
                        break;
                    case "<h2>":
                        str1 += `${sourceArr[i]} ${translateArr[i].slice(4)} </h2>\n`
                        break;
                    case "<h3>":
                        str1 += `${sourceArr[i]} ${translateArr[i].slice(4)} </h3>\n`
                        break;
                    case "<h4>":
                        str1 += `${sourceArr[i]} ${translateArr[i].slice(4)} </h4>\n`
                        break;
                    case "<li>":
                        str1 += `${sourceArr[i]} ${translateArr[i].slice(4)} </li>\n`
                        break;
                    case "<pmi":
                        str1 += `${sourceArr[i].slice(6)} ${translateArr[i].slice(6)}\n`
                        break;
                    case "<pen":
                        str1 += `${sourceArr[i].slice(6)} ${translateArr[i].slice(6)} </p>\n`
                        break;
                }
            }
        }

        result.innerHTML = str1
      //   const allEnglishElement = document.querySelectorAll(".english");
      //   const allVietElement = document.querySelectorAll(".viet");

      //   allEnglishElement.forEach((item, index) => {
      //       item.addEventListener("click", (event) => handleClick(event))
      //   })

      //   function handleClick(event) {
      //       if (event.target.classList.length > 1) {
      //           const index = Number(event.target.classList[1])
      //           allVietElement.forEach(e => {
      //               if (e.classList[1] === event.target.classList[1]) {
      //                   e.classList.contains("hide")
      //                       ? e.classList.remove("hide")
      //                       : e.classList.add("hide")
      //               }
      //           })
      //       }
      //   }
    }
}
function handleCombine1() {
    handleCombine()
    htmlTA.textContent = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gemini</title>
</head>
<style>
* {
    cursor: pointer;
}

.english {
    color: blue;
}
img { width: 75%;}
.floating-checkbox {
      position: fixed; /* Keeps it fixed to the viewport */
      top: 20px; /* Distance from the top of the viewport */
      right: 20px; /* Distance from the right of the viewport */
      z-index: 1000; /* Ensures it stays above other elements */
    }

</style>
<body>
<div>
       <button id="stop">Stop!</button>
       <button id="speak">Speak</button>
      <label> <input type="checkbox" id="showviet" name="pencil" >show Vietnamese</label>
      'control +' to enlarge font size, bấm 2 key Control và + cho chữ lớn.
</div>
    ${result.innerHTML}
<a href="./index.htm">Index</a>
<a href="./">Next</a>
</body>
<script>
const showVietOnly = document.querySelector("#showviet")
const viet = document.querySelectorAll(".souce")
const english = document.querySelectorAll(".translate")
showVietOnly.checked = false
showVietOnly.addEventListener("change", () => {
	if (showVietOnly.checked ){
		english.forEach(v => v.style.display = "none")
	} else {
		english.forEach(v => v.style.display = "inline")
	}
})


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
   }else {
      refreshPage(true)
   }
}
function refreshPage(forceReload = false) {
   try {
         // forceReload = true will reload from the server, bypassing cache
         location.reload(forceReload);
   } catch (error) {
         console.error("Error reloading page:", error);
   }
}
let vietReadArr = []
viet.forEach(e => vietReadArr.push(e.textContent))
let englishReadArr = []
english.forEach(e => englishReadArr.push(e.textContent))

let cnt = 0
function speakMinutes_viet() {
   if (vietReadArr.length > 0){
      let txt = vietReadArr.shift(); // extract first item
      
      let utterance = new SpeechSynthesisUtterance(txt);

      utterance.onstart = () => {
         viet[cnt].style.backgroundColor = "yellow"
      }
      // When the current utterance ends, speak the next one
      utterance.onend = function (event) {
         viet[cnt].style.backgroundColor = "white"
      speakMinutes_eng(); // Recursively call the function for the next item
      };

      // Handle potential errors
      utterance.onerror = function (event) {
         console.error('Speech synthesis error: ' + event.error);
      };
      utterance.lang = 'vi-VN'

      let txt1 = '<span style="color:red"> '+englishReadArr[0].trim()+' </span>'
      speechSynthesis.speak(utterance);
   }
}
function speakMinutes_eng() {

   if (englishReadArr.length > 0) {
      let txt = englishReadArr.shift() // extract first item
      let utterance = new SpeechSynthesisUtterance(txt);
      utterance.onstart = () => {
         english[cnt].style.backgroundColor = "yellow"
      }
      // When the current utterance ends, speak the next one
      utterance.onend = function (event) {
         english[cnt].style.backgroundColor = "white"
         cnt++
      console.log('Speech ended, starting next minute.');
      document.querySelector(".viet").remove()
      document.querySelector(".english").remove()
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
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

speakButton.addEventListener('click', readEV);
stopButton.addEventListener('click', readEV.bind(null, false));
</script>
</html>
`
}

function handleCombine2() {
    handleCombine()
    htmlTA.textContent = `${result.innerHTML} `

}