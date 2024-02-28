#!/usr/bin/env node
let localServer = require("../lib/server");

let args = process.argv.slice(2);

let defaultOptions = { port: 8000, dir: "." };
let userOptions = {};

args.forEach(arg => {
  let opt = arg.split("=");

  if(opt[0] === "--port") {
    userOptions.port = opt[1];
  } else  if(opt[0] === "--dir") {
    console.log(opt[1][0])
    if (opt[1][0] === "/") {
      opt[1] = opt[0].replace(opt[1][0], "");
    }

    userOptions.dir = opt[1];
  }  else {
    console.log("wrong option (?_?)");
    return;
  }
});

userOptions = Object.assign(defaultOptions, userOptions);

localServer(userOptions);



