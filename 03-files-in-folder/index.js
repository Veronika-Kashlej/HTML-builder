const path = require("path");
const fs = require("fs");
function findFiles(dirPath){
    fs.readdir(dirPath, (err, files) => {
        if(err){
            console.log(err);
        }else{
            files.forEach((file) => {
                fs.stat(path.join(dirPath, file), (err, stats) => {
                    if(err) throw err
                    if(stats.isFile()){
                        const name = file.split('.')[0];
                        const extname = file.split('.')[1];
                        const size = stats.size;
                        console.log([name, extname, size].join(' - '));
                    } 
                })
            })
        }
    
    }) 
}
findFiles(path.join(__dirname, "secret-folder"))
