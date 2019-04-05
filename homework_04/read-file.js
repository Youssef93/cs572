const fs = require("fs");
const path = require("path");

const fileName = process.argv[process.argv.length - 1];

const filePath = path.join(__dirname, fileName);

if (fs.existsSync(filePath)) {
  fs.createReadStream(filePath, { encoding: "utf8" })
    .on("data", chunk => {
      process.send(chunk);
    })
    .on("end", () => {
      process.send("end");
      process.exit(0);
    });
} else {
  process.send("file not found");
  process.send("end");
}
