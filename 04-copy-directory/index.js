const fs = require('fs');
const path = require('path');

async function copyDir() {
  const currentFolder = path.join(__dirname, 'files');
  const futureFolder = path.join(__dirname, 'files-copy');
  try {
    await fs.promises.mkdir(futureFolder, { recursive: true });
    const files = await fs.promises.readdir(currentFolder);
    for (const file of files) {
      const currentFile = path.join(currentFolder, file);
      const futureFile = path.join(futureFolder, file);

      await fs.promises.copyFile(currentFile, futureFile);
    }
    console.log("Скопировано");
  } catch (error) {
    console.log('Произошла ошибка:', error);
  }
}
copyDir();