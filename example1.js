const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);

let inFile = args[0]
let outFile = args[1]

// read example.txt file
// split data into paragraphs
// remove left right space and /r new line
// remove empty lines
// save file to example2.txt
// manual split file example2.txt into example2a.txt, example2b.txt each file under 5000 characters
// define the file path ( change 'example.txt to your file name)
const filePath = path.join(__dirname, inFile);

// read the file asynchronously (none-blocking)
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        // handle common errors
        if (err.code === 'ENOENT') {
            console.error(`Error: File not found at ${filePath}`);
        } else {
            console.error(`Error reading file: `, err.message);
        }
        return
    }
    
    data = add_split_sign(data)
    // .join("paragraph\n")
    // output file content
    // console.log(data)
    fs.writeFile(outFile, data, 'utf8',(err) =>{
        if (err) {
            console.error('Error writing to file: ', err.message);
            return;
        }
        console.log('File  has been saved successfully')
    })
})
function add_split_sign(str) {
    // split paragraphs
    let str1 = str.split('\n')
    let str2 = str.split('\n').filter(e => e.length > 1).map(e => e.trim())
    console.log(str2)
    // remove empty lines
    str1 = str1.filter(e => e.length > 2)
    // remove spaces left and right
    str1 = str1.map(e => e.trim())
    
    // join arrays back to strings
    str1 = str1.join('\n')
   return str1
   
}