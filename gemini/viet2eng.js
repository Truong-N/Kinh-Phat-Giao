const selectTag = document.querySelector(".select-element");
const elementContent = document.querySelector(".element-content")
const textareaEnglish = document.querySelector(".textarea-eng");
const textareaViet = document.querySelector(".textarea-viet");
const htmlContent = document.querySelector(".html-content")

let ctr = 0
if (typeof (Storage) !== "undefined") {
    if (localStorage.lineNum) {
        document.querySelector(".start").value = Number(localStorage.lineNum)
    } else {
        document.querySelector(".start").value = 0
    }
}
const result = document.querySelector(".result");
// let selectedTag;
// selectTag.addEventListener("change", (event) => {
//     selectedTag = event.target.value
//     if (selectedTag === "img") {
//         textareaEnglish.value += '<img src="" alt="" />\n'
//     }
// });

function handleCopyTextAreaEnglish() {
    let txt = textareaEnglish.value.trim()
    textareaEnglish.value = txt
    textareaEnglish.select();
    navigator.clipboard.writeText(textareaEnglish.value)
}

function handleCopyTextAreaHTMLContent() {
    htmlContent.select();
    let txt = htmlContent.value.trim()
    htmlContent.value = txt
    navigator.clipboard.writeText(htmlContent.value)
}
const textareaVietBtn = document.querySelector("#textarea-viet-btn")
const translateTA = document.querySelector(".textarea-viet")
textareaVietBtn.addEventListener("click", () => {
    let txt = translateTA.value
    let arr = txt.split('\n')
    let arr1 = arr.filter(e => e.length > 0)
    let txt1 = arr1.join('\n')
    translateTA.value = txt1
})
function handleHTMLContent() {
    ctr = Number(document.querySelector(".start").value)
    if (!selectTag.value) { alert("choose an html element"); return }
    switch (selectTag.value) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
            processHTMLHeader();
            break;
        case "p":
            handleMultiParagraphs();
            break;
        case "ul":
            handleUl();
            break;
        case "pre":
            handlePre();
            break;
        default:
            break;
    }
    document.getElementById("sel")[0].selected = true;
}

function handlePre() {
    textareaEnglish.value += "<pre class='english'>\n";
    textareaEnglish.value += elementContent.value.replaceAll("<", "&lt;");
    textareaEnglish.value += "\n</pre>\n";
    elementContent.value = "";
}

function getElementContentValue() {
    return elementContent.value.replaceAll("<", "&lt;").trim()
}

function increaseLineNo() {
    ctr++;
    document.querySelector(".start").value = ctr;
    localStorage.setItem("lineNum", ctr)
    elementContent.value = ""
}

function handleH1() {
    ctr = Number(document.querySelector(".start").value)

    const elCt = getElementContentValue()
    if (elCt.length > 0) {
        // textareaEnglish.value += `<h1> <span class="viet ${ctr}"> ${elCt} </span>\n`;
        textareaEnglish.value += `<h1> <span class="viet"> ${elCt} </span>\n`;
        increaseLineNo()
    } else {
        alert("Textarea above is empty!")
    }
}

function handleH2() {
    ctr = Number(document.querySelector(".start").value)

    const elCt = getElementContentValue()
    if (elCt.length > 0) {
        // textareaEnglish.value += `<h2> <span class="viet ${ctr}"> ${elCt} </span>\n`;
        textareaEnglish.value += `<h2> <span class="viet"> ${elCt} </span>\n`;
        increaseLineNo()
    } else {
        alert("Textarea above is empty!")
    }
}

function handleH3() {
    ctr = Number(document.querySelector(".start").value)

    const elCt = getElementContentValue()
    if (elCt.length > 0) {
        // textareaEnglish.value += `<h3> <span class="viet ${ctr}"> ${elCt} </span>\n`;
        textareaEnglish.value += `<h3> <span class="viet"> ${elCt} </span>\n`;
        increaseLineNo()
    } else {
        alert("Textarea above is empty!")
    }
}

function handleH4() {
    ctr = Number(document.querySelector(".start").value)

    const elCt = getElementContentValue()
    if (elCt.length > 0) {
        // textareaEnglish.value += `<h4> <span class="viet ${ctr}"> ${elCt} </span>\n`;
        textareaEnglish.value += `<h4> <span class="viet"> ${elCt} </span>\n`;
        increaseLineNo()
    } else {
        alert("Textarea above is empty!")
    }
}

function handleImg() {
    const elCt = getElementContentValue()
    if (elCt.length > 0) {
        textareaEnglish.value += `<img src="./images/${elCt}.png" alt="${elCt}">\n`;
        // increaseLineNo()
    } else {
        alert("Textarea above is empty!")
    }
}

function handleVideo() {
    const elCt = getElementContentValue()
    if (elCt.length > 0) {
        textareaEnglish.value += `<video width="600" controls> <source scr="./images/${elCt}.mp4" type="video/mp4"> </video>\n`;
        // increaseLineNo()
    } else {
        alert("Textarea above is empty!")
    }
}

function processHTMLHeader() {
    console.log(elementContent.value)
    // textareaEnglish.value += `<${selectedTag}> <span class="viet ${ctr}"> ${elementContent.value.replaceAll("<", "&lt;").trim()} </span>\n`;
    textareaEnglish.value += `<${selectedTag}> <span class="viet"> ${elementContent.value.replaceAll("<", "&lt;").trim()} </span>\n`;
    ctr++;
    document.querySelector(".start").value = ctr;
    localStorage.setItem("lineNum", ctr)
    elementContent.value = ""
}

function processParagraph(paragraph) {

    console.log(paragraph)
    // use '~' to seperate
    const arrayLines = paragraph
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
            // let txt = `<span class="viet ${ctr}"> ${item} </span>\n`;
            let txt = `<span class="viet"> ${item} </span>\n`;
            increaseLineNo()
            // return `<span class="viet"> ${item} </span>\n`;
            return txt
        })
    textareaEnglish.value += arrayLines
        .map((item, index) => {
            if (index === 0) {
                return "<p> " + item;
            }
            else if (index === arrayLines.length - 1) {
                return "<pend> " + item
            }
            else {
                return "<pmid> " + item
            }
        })
        .join("")

}
function handleMultiParagraphs() {
    ctr = Number(document.querySelector(".start").value)

    // handle multi paragraphs
    const arrayParagraphs = elementContent.value.replaceAll("<", "&lt;").split("\n")

    arrayParagraphs.forEach((paragraph) => {
        if (paragraph.length > 1) {
            processParagraph(paragraph)
        }
    })
    increaseLineNo()
}

function handleUl() {
    const arrayLi = elementContent.value.split("\n")
    arrayLi.forEach((liItem) => {
        if (liItem.length > 1) {
            // textareaEnglish.value += `<li> <span class="viet ${ctr}"> ${liItem} </span>\n`;
            textareaEnglish.value += `<li> <span class="viet"> ${liItem} </span>\n`;
            ctr++;
        }
    })
    increaseLineNo()
}

function handleCombine() {
    const textEng = document.querySelector(".textarea-eng")
    const textViet = document.querySelector(".textarea-viet")
    const arrEng = textEng.value.split("\n")
    const arrViet = textViet.value.split("\n")
    document.querySelector(".arrayenglish-len").textContent = arrEng.length
    document.querySelector(".arrayviet-len").textContent = arrViet.length

    if (arrEng.length === arrViet.length) {
        let str1 = ""
        for (let i = 0; i < arrEng.length; i++) {
            arrViet[i] = arrViet[i].replace( "viet","english")
            // arrViet[i] = arrViet[i].replace('">', ' hide">')

            if (arrEng[i].includes("<pre")) {
                str1 += `${arrEng[i]}\n`;
                i++;
                do {
                    console.log(arrEng[i])
                    str1 += `${arrEng[i]}\n`;
                    i++;
                } while (arrEng[i] !== "</pre>")
                str1 += `${arrEng[i]}\n`;
            } else if (arrEng[i].includes("<p>") && i === arrEng.length - 1) {
                str1 += `${arrEng[i]}${arrViet[i].slice(3)} </p>\n`
            } else if (arrEng[i].includes("<p>") && i < arrEng.length - 1) {
                if (arrEng[i + 1].includes("<pmid>") || arrEng[i + 1].includes("<pend>")) {
                    str1 += `${arrEng[i]} ${arrViet[i].slice(3)}\n`
                } else {
                    str1 += `${arrEng[i]} ${arrViet[i].slice(3)} </p>\n`
                }
            } else {
                console.log(arrEng[i].slice(0, 4) + "--------------")
                switch (arrEng[i].slice(0, 4)) {
                    case "<img":
                    case "<vid":
                        str1 += `${arrEng[i]}\n`
                        break;
                    case "<h1>":
                        str1 += `${arrEng[i]} ${arrViet[i].slice(4)} </h1>\n`
                        break;
                    case "<h2>":
                        str1 += `${arrEng[i]} ${arrViet[i].slice(4)} </h2>\n`
                        break;
                    case "<h3>":
                        str1 += `${arrEng[i]} ${arrViet[i].slice(4)} </h3>\n`
                        break;
                    case "<h4>":
                        str1 += `${arrEng[i]} ${arrViet[i].slice(4)} </h4>\n`
                        break;
                    case "<li>":
                        str1 += `${arrEng[i]} ${arrViet[i].slice(4)} </li>\n`
                        break;
                    case "<pmi":
                        str1 += `${arrEng[i].slice(6)} ${arrViet[i].slice(6)}\n`
                        break;
                    case "<pen":
                        str1 += `${arrEng[i].slice(6)} ${arrViet[i].slice(6)} </p>\n`
                        break;
                }
            }
        }

        result.innerHTML = str1
        const allEnglishElement = document.querySelectorAll(".english");
        const allVietElement = document.querySelectorAll(".viet");

        allEnglishElement.forEach((item, index) => {
            item.addEventListener("click", (event) => handleClick(event))
        })

        function handleClick(event) {
            if (event.target.classList.length > 1) {
                const index = Number(event.target.classList[1])
                allVietElement.forEach(e => {
                    if (e.classList[1] === event.target.classList[1]) {
                        e.classList.contains("hide")
                            ? e.classList.remove("hide")
                            : e.classList.add("hide")
                    }
                })
            }
        }
    }
}
function handleCombine1() {
    handleCombine()
    htmlContent.textContent = `
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
const viet = document.querySelectorAll(".viet")
const english = document.querySelectorAll(".english")
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
    htmlContent.textContent = `${result.innerHTML} `

}