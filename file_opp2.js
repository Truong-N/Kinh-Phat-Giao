const fs = require('fs');
const path = require('path');

// define the file path ( change 'example.txt to your file name)
const filePath = path.join(__dirname, 'kinhTrungBo5.html');

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
    data_arr = data.split(' ')
    console.log(data_arr.length)

    data_arra1 = data_arr.filter( e => e.includes("ã")).join(", ")
    data_arra2 = data_arr.filter( e => e.includes("ẫ")).join(", ")
    data_arra3 = data_arr.filter( e => e.includes("ẵ")).join(", ")
    data_arre1 = data_arr.filter( e => e.includes("ẽ")).join(", ")
    data_arre2 = data_arr.filter( e => e.includes("ễ")).join(", ")
    data_arri1 = data_arr.filter( e => e.includes("ĩ")).join(", ")
    data_arro1 = data_arr.filter( e => e.includes("õ")).join(", ")
    data_arro2 = data_arr.filter( e => e.includes("ỗ")).join(", ")
    data_arro3 = data_arr.filter( e => e.includes("ỡ")).join(", ")
    data_arru1 = data_arr.filter( e => e.includes("ũ")).join(", ")
    data_arru2 = data_arr.filter( e => e.includes("ữ")).join(", ")
    data1 = data_arra1 
    data1 += data_arra2 
    data1 += data_arra3 
    data1 += data_arre1 
    data1 += data_arre2 
    data1 += data_arri1 
    data1 += data_arro1 
    data1 += data_arro2 
    data1 += data_arro3
    data1 += data_arru1 
    data1 += data_arru2 
    console.log(data1)
    // output file content
    // console.log(data)
    // fs.writeFile("majjhima104-test.txt", data, 'utf8',(err) =>{
    //     if (err) {
    //         console.error('Error writing to file: ', err.message);
    //         return;
    //     }
    //     console.log('File  has been saved successfully')
    // })
})