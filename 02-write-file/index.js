const {stdin, stdout} = process;
const fs = require("fs");
const path = require("path");
const output = fs.createWriteStream(path.join(__dirname, "text.txt"));
stdout.write("Enter text:\n");
stdin.on("data", (data) => {
    output.write(data);
});
process.on("SIGINT", () => {
    stdout.write("\nGoodbye!");
    process.exit();
});

