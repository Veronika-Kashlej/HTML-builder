const fs = require("fs");
const path = require("path");
fs.mkdir(path.join(__dirname, 'project-dist'), 
    {recursive: true}, 
    (err) => {
        if(err) throw err;
        fs.unlink(path.join(__dirname, 'project-dist', 'style.css'), (err) => {
            if(err && err.code !== "ENOENT") throw err;
            fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
                if(err) throw err;
                files.forEach((file) => {
                    fs.stat(path.join(__dirname, 'styles', file), (err, stats) => {
                        if(stats.isFile() && path.extname(path.join(__dirname, 'styles', file)) === ".css"){
                            fs.readFile(path.join(__dirname, 'styles', file), 'utf-8', (err, data) => {
                                if(err) throw err;
                                fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, (err) => {
                                    if(err) throw err
                                })
                            })
                        }
                    })
                })
            })
        })
        fs.rm(path.join(__dirname, 'project-dist', 'assets'), {recursive: true, force: true}, (err) => {
            if(err) throw err;
            fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), 
            {recursive: true}, 
            (err) => {
                if(err) throw err;
                
            })
            copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'))
        })
        
        fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
            if(err) throw err;
            fs.readdir(path.join(__dirname, 'components'), (err, files) => {
                if(err) throw err;
                files.forEach((file) => {
                    let patternName = `{{${file.split('.')[0]}}}`;
                    fs.readFile(path.join(__dirname, 'components', file), 'utf-8', (err, dataComponent) => {
                        if(err) throw err;
                        data = data.replace(patternName, dataComponent);
                        fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), data, 'utf-8', (err) => {
                            if(err) throw err
                        })
                    })
                })
                
            })
        })
        
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
    