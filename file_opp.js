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
    //rotected text
    data = data.replaceAll("Bạn đang đọc truyện tại rungtruyen.com. Chúc vui vẻ!!!", "")
    data = data.replaceAll("protected text", "")
    data = data.replaceAll("Kiến Lan", "Kien Lan")
    data = data.replaceAll("Lăng Cửu Xuyên", "Lang Cuu Xuyen")
    data = data.replaceAll("Thôi thị", "Thoi thị")
    data = data.replaceAll("Trình ma ma", "Trinh ma ma")
    data = data.replaceAll("Đại Mãn", "Dai Man")
    data = data.replaceAll("Tiểu Mãn", "Tieu Man")
    data = data.replaceAll("Hàn Lan", "Han Lan")
    data = data.replaceAll("Lương Y Phường", "Luong Y Phuong")
    data = data.replaceAll("Cửu cô nương", "Cuu cô nương")
    data = data.replaceAll("Tướng Xích", "Tuong Xich")
    // data = data.replaceAll("", "")
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