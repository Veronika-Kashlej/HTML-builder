const fs = require('fs').promises;
const path = require('path');

async function fileInfo(){
try{
const files = await fs.readdir('03-files-in-folder/secret-folder', {withFileTypes: true});
// console.log(files);
for (file of files) {
    if (file.isFile()) {
        const fileStat = await fs.stat(path.join('03-files-in-folder/secret-folder', file.name));
        const fileName = path.parse(file.name).name;
        const fileFormat = path.parse(file.name).ext.slice(1);
        const fileSize = (fileStat.size / 1024).toFixed(3);
        console.log(`${fileName} - ${fileFormat} - ${fileSize}kb`);
    }
}
} catch(err){
    console.log(err);
}
}
fileInfo();