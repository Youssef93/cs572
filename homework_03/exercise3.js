const http = require('http');
const server = http.createServer();
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

const fileName = 'test'; // not really there
const fileLocation = path.join(__dirname, fileName);

// method 1
server.on('request', function(req, res) {
  const buffer = fs.readFileSync(fileLocation);
  res.write(buffer);
});

// // method 2
// server.on('request', async function(req, res) {
//   const buffer = await readFile(fileLocation);
//   res.write(buffer);
// });

// // method 3
// server.on('request', async function(req, res) {
//   fs.createReadStream(fileLocation).pipe(res);
// });

server.listen(3000);