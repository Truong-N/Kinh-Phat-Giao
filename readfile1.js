function read_content(fcnt){
    let f_content = fcnt.split("\n");
    console.log(f_content);
    let txt = "";
    for( let i=f_content.length-2; i>0; i--){
        let j = Math.floor(Math.random() * i);
        let k = f_content[i];
        f_content[i] = f_content[j];
        f_content[j] = k
    }
    for( let i=0; i<f_content.length; i++){
      txt += `${i+1}. ${f_content[i]} <br />`;
    }
    // console.log(txt);
    document.getElementById("demo").innerHTML = txt;
}
function readFile(input) {
    let file = input.files[0]; 
    let fileReader = new FileReader(); 
    fileReader.readAsText(file); 
    fileReader.onload = function() {
        let f_content = fileReader.result;
        read_content(f_content);
        
    }; 
    fileReader.onerror = function() {
        alert(fileReader.error);
    }; 
}