const fs = require('fs');
const path = require('path');

// define the file path ( change 'example.txt to your file name)
const filePath = path.join(__dirname, 'kinhTrungBo9.html');

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
    
    let updateText = data.replace(/(,)(\w)/gi, (match, comm, letter) => {
        return comm + ' ' + letter
    })
    // output file content
    // console.log(data)
    fs.writeFile("kinhTrungBo9a.html", updateText, 'utf8',(err) =>{
        if (err) {
            console.error('Error writing to file: ', err.message);
            return;
        }
        console.log('File  has been saved successfully')
    })
})