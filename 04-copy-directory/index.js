const fs = require("fs");
const path = require("path");

fs.rm(path.join(__dirname, 'files-copy'), {recursive: true, force: true}, (err) => {
    if(err) throw err;
    fs.mkdir(path.join(__dirname, 'files-copy'), 
    {recursive: true}, 
    (err) => {
        if(err) throw err;
        
    })
    copyDir(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'))
})

function copyDir(pathDir, pathTarget){
    fs.readdir(pathDir, (err, files) => {
        if(err) throw err;
        files.forEach((file) => {
            fs.stat(path.join(pathDir, file), (err, stats)=> {
                if(err) throw err;
                if(stats.isFile()){
                    fs.copyFile(path.join(pathDir, file), path.join(pathTarget, file), 
                    (err) => {
                        if(err) throw err;
                    })
                }
                if(stats.isDirectory()){
                    fs.mkdir(path.join(pathTarget, file), 
                    {recursive: true}, 
                    (err) => {
                        if(err) throw err;
        
                    })
                    copyDir(path.join(pathDir, file), path.join(pathTarget, file))
                }
            })
        })
    })
}
