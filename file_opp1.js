const fs = require('fs');
const path = require('path');

// define the file path ( change 'example.txt to your file name)
const filePath = path.join(__dirname, 'majjhima104-test.html');

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
    let fstr = / \d*">/g
    data = data.replaceAll(fstr, '">')
    // output file content
    // console.log(data)
    fs.writeFile("majjhima104-test.txt", data, 'utf8',(err) =>{
        if (err) {
            console.error('Error writing to file: ', err.message);
            return;
        }
        console.log('File  has been saved successfully')
    })
})