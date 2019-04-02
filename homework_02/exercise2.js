Array.prototype.even = async function() {
  return this.filter(e => e % 2 === 0);
}

Array.prototype.odd = async function() {
  return this.filter(e => e % 2 === 1);
}

const arr = [1,2,3,4,5,6,7,8,9];

console.log("started");
arr.even().then(console.log);
arr.odd().then(console.log);
console.log("done");