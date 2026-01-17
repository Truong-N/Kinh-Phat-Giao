function write_File( w_fname, w_str){
    fs.writeFile(w_fname, w_str, err => {
        if (err){
            console.err;
            return;
        }
    });
}
// read text file
const fs = require("fs");
fname = "./txt/eng8_test.txt";
let f_content = fs.readFileSync( fname, "utf8").split(/\n/);
// console.log(f_content);
// get file length
let len = f_content.length;
console.log(len);
// divide in to group of 10
n_group10 = parseInt(len / 10);
console.log(n_group10);
remain = len % 10;
console.log(remain);
// change file name
let name_inc = 1;
let w_fname = "";
let w_str = "";
while( name_inc <= n_group10){
    w_fname = fname.replace(".txt", name_inc + ".txt");
    console.log(" ");
    console.log(w_fname);
    console.log(" ");
    for(let a= 0; a<10; a++){
        w_str += f_content[(name_inc-1)*10 + a] + "\n";
        // console.log(f_content[line_no + a]);
    }
    console.log(w_str);
    write_File(w_fname, w_str);
    w_str = "";
    name_inc++;
}
if( remain > 0){
    w_fname = fname.replace(".txt", name_inc + ".txt");
    console.log(" ");
    console.log(w_fname);
    console.log(" ");
    for(let a= 0; a<remain; a++){
        w_str += f_content[(name_inc-1)*10 + a] + "\n";
        // console.log(f_content[line_no + a]);
    }
    console.log(w_str);
    write_File(w_fname, w_str);
}