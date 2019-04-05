const os = require('os');

console.log('Checking System ...');

let isValid = true;

if(os.totalmem() < 4294967296) {
  isValid = false;
  console.log('This app needs at least 4 GB of ram');
}

if(os.cpus() < 2) {
  isValid = false;
  console.log('Processor is not supported');
}

if(isValid) {
  console.log('System is supported');
}