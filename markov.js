/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    console.log(this.words);
    let chains = new Map();
    for (let word in this.words) {
      word = parseInt(word);
      let curr = this.words[word];
      let nextCurr = this.words[word + 1] || null;
      if (chains.has(curr)) {
        chains.get(curr).push(nextCurr);
      } else {
        chains.set(curr, [nextCurr]);
      }
    }
    this.chains = chains;
  }

  static choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];
    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }
    console.log(out.join(" "));
  }
}

module.exports = {
  MarkovMachine,
};
