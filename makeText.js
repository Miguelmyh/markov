/** Command-line tool to generate Markov text. */
const axios = require("axios");
const markov = require("./markov");
const fs = require("fs");
const process = require("process");

function generateMarkov(text) {
  let ew = new markov.MarkovMachine(text);
}

function makeText(path) {
  fs.readFile(path, "utf-8", function (err, data) {
    if (err) {
      console.log(`Error reading', ${path}: ${err}`);
      process.exit(1);
    } else {
      generateMarkov(data);
    }
  });
}

async function URLText(url) {
  try {
    let resp = await axios({
      url: url,
      method: "get",
    });
    console.log(resp.data);
  } catch (e) {
    console.log(`Error:${url}`);
    console.log("error:", e.code);
    console.log("404 not found");
    process.exit(1);
  }
}

let [method, path] = process.argv.slice(2);
console.log(method, path);
console.log(process.argv.slice(2));

if (method === "url") {
  URLText(path);
} else if (method === "file") {
  makeText(path);
} else {
  console.log("error:", method);
  process.exit(1);
}
