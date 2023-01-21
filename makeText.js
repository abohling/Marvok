/** Command-line tool to generate Markov text. */
const fs = require("fs");
const axios = require("axios");
const process = require("process");
const markov = require("./markov");

function generateText(text) {
  let newMar = new markov.MarkovMachine(text);
  console.log(newMar.makeText());
}

function makeText(path) {
  fs.readFile(path, "utf8", function cb(err, data) {
    if (err) {
      console.error(`Canot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });
}

async function makeUrlText() {
  let resp;

  try {
    resp = await axios.get(url);
  } catch (err) {
    console.log(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
  generateText(resp.data);
}

let [method, path] = process.argv.slice(2);

if (method === "file") {
    makeText(path)
} else if (method === "url"){
    makeUrlText(path)
} else {
    console.error(`Unkown method: ${method}`);
    process.exit(1)
}