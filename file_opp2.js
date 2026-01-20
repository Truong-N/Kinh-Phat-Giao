const fs = require('fs');
const path = require('path');

// define the file path ( change 'example.txt to your file name)
const filePath = path.join(__dirname, 'exampleV.txt');

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
    data = data.replaceAll("abcd", "~ ")
                .replaceAll("hgfedcba", "~~ ")
                .replaceAll("\n", "")

    
    // output file content
    
    fs.writeFile("exampleV1.txt", data, 'utf8',(err) =>{
        if (err) {
            console.error('Error writing to file: ', err.message);
            return;
        }
        console.log('File  has been saved successfully')
    })
})