const str = "This house is a nice big house";
const badWords = ["house", "big"];

const { from } = require('rxjs');

function method1() {
  String.prototype.filterWords = function(badWords) {
    return this.split(" ")
      .map(word => {
        if (badWords.includes(word)) return "***";
        return word;
      })
      .join(" ");
  };

  console.log(str.filterWords(badWords));
}

function method2() {
  String.prototype.filterWords = function(badWords) {
    return new Promise((resolve, reject) => {
      resolve(
        this.split(" ")
          .map(word => {
            if (badWords.includes(word)) return "***";
            return word;
          })
          .join(" ")
      );
    });
  };

  str.filterWords(badWords).then(console.log);
}

async function method3() {
  String.prototype.filterWords = async function(badWords) {
    return this.split(" ")
      .map(word => {
        if (badWords.includes(word)) return "***";
        return word;
      })
      .join(" ");
  };

  const result = await str.filterWords(badWords);
  console.log(result);
}

function method4() {
  String.prototype.filterWords = function(badWords) {
    return new Promise((resolve, reject) => {
      resolve(
        this.split(" ")
          .map(word => {
            if (badWords.includes(word)) return "***";
            return word;
          })
          .join(" ")
      );
    });
  };

  from(str.filterWords(badWords)).subscribe(console.log);
}

method1();
method2();
method3();
method4();
