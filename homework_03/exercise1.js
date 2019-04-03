const dns = require('dns');
const { promisify } = require('util');

const url = 'www.mum.edu';

dns.resolve4(url, function(err, result) {
  if(err) console.log(err);
  else console.log(result)
});

const resolve = promisify(dns.resolve4);
resolve(url).then(console.log);

const asyncFun = async function() {
  const result = await resolve(url);
  console.log(result);
};

asyncFun();