const fs = require('fs').promises;
const path = require('path');
fs.copyFile(path.join(__dirname, 'test-files', 'styles', '04-about.css'), path.join(__dirname, 'styles', '04-about.css'));
fs.copyFile(path.join(__dirname, 'test-files', 'components/about.html'), path.join(__dirname, 'components/about.html'));
fs.copyFile(path.join(__dirname, 'test-files', 'images/squirrel-2.jpg'), path.join(__dirname, 'assets/img/squirrel-2.jpg'));

const templateFilePath = path.join(__dirname, 'template.html');
const distDir = path.join(__dirname, 'project-dist');
const indexFilePath = path.join(distDir, 'index.html');

async function templateFile() {
  try {
    const data = await fs.readFile(templateFilePath, 'utf-8');
    let result = data;
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = data.match(regex);
    if (matches) {
      for (const match of matches) {
        const componentName = match.slice(2, -2); 
        const componentPath = path.join(__dirname, 'components', `${componentName}.html`);
        const componentData = await fs.readFile(componentPath, 'utf8');
        result = result.replace(match, componentData);
      }
    }
    await fs.writeFile(indexFilePath, result, 'utf8');
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}


async function copyFolderRecursive(source, target) {
  try {
    await fs.mkdir(target, { recursive: true });
    const files = await fs.readdir(source, { withFileTypes: true });

    for (const file of files) {
      const sourcePath = path.join(source, file.name);
      const targetPath = path.join(target, file.name);
      
      if (file.isDirectory()) {
        await copyFolderRecursive(sourcePath, targetPath);
      } else {
        await fs.copyFile(sourcePath, targetPath);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
async function bundleFile(){
    const styles = path.join(__dirname, 'styles');
    const bundleStylesFile = path.join(__dirname, 'project-dist', 'style.css');
    const cssFiles = [];
    try{
        const files = await fs.readdir(styles);
        for (const file of files) {
            if(path.extname(file) === '.css'){
                const filePath = path.join(styles, file);
                cssFiles.push(await fs.readFile(filePath, 'utf-8'))
            }
        }
        await fs.writeFile(bundleStylesFile, cssFiles.join('\n'));
    } catch (error) {
        console.log("Произошла ошибка:", error);
    }
}
bundleFile();
copyFolderRecursive(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
templateFile();