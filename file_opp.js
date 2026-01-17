const fs = require('fs');
const path = require('path');

// define the file path ( change 'example.txt to your file name)
const filePath = path.join(__dirname, 'example.txt');

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
    data = data.replaceAll("t.h.u.ố.c", "thuốc")
    data = data.replaceAll("c.h.ế.t", "chết")
    data = data.replaceAll("đ.ấ.m", "đấm")
    data = data.replaceAll("đ.á.n.h", "đánh")
    data = data.replaceAll("t.h.a.i", "thai")
    data = data.replaceAll("T.ử", "Tử")
    data = data.replaceAll("</p><p>", "\n")
    // output file content
    // console.log(data)
    fs.writeFile("example1.txt", data, 'utf8',(err) =>{
        if (err) {
            console.error('Error writing to file: ', err.message);
            return;
        }
        console.log('File  has been saved successfully')
    })
})