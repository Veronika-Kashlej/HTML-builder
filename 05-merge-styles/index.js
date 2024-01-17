const fs = require('fs');
const path = require('path');

async function bundleFile(){
    const styles = path.join(__dirname, 'styles');
    const bundleStylesFile = path.join(__dirname, 'project-dist', 'bundle.css');
    const cssFiles = [];
    try{
        const files = await fs.promises.readdir(styles);
        for (const file of files) {
            if(path.extname(file) === '.css'){
                const filePath = path.join(styles, file);
                cssFiles.push(await fs.promises.readFile(filePath, 'utf-8'))
            }
        }
        await fs.promises.writeFile(bundleStylesFile, cssFiles.join('\n'));
        console.log('Файл создан')
    } catch (error) {
        console.log("Произошла ошибка:", error);
    }
}
bundleFile();