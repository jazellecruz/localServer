const http = require("http");
const fs = require("fs")
const path = require("path");
const { getMimeType,shouldStreamFile, resolveFilePath, getIpAddress} = require("./utils/index");
 


// const server = http.createServer(async (req, res, next) => {
//   let filePath = await resolveFilePath(defaultOptions.fileDir, req.url)
//   const baseName = path.extname(path.basename(req.url));
//   const ext_name = baseName.slice(1);
//   const mime = getMimeType(ext_name);

//   res.writeHead(200, {"Content-Type" : mime});

//   if(req.url == "/favicon.ico") {
//     return;
//   }

//   if(shouldStreamFile(ext_name)) {
//     const file = fs.createReadStream(filePath);
//     file.pipe(res);
//     file.on("end", () => res.end())
//     return;
//   }

//   const file = (await fs.promises.readFile(filePath)).toString();
//   res.write(file);
//   res.end()
// });


const initialize = (options) => {
  let opts = options;

  opts.ip = getIpAddress();

  const server = http.createServer(async (req, res, next) => {
    let filePath = await resolveFilePath(opts.dir, req.url)
    const baseName = path.extname(path.basename(req.url));
    const ext_name = baseName.slice(1);
    const mime = getMimeType(ext_name);
  
    res.writeHead(200, {"Content-Type" : mime});
  
    if(req.url == "/favicon.ico") {
      return;
    }
  
    if(shouldStreamFile(ext_name)) {
      const file = fs.createReadStream(filePath);
      file.pipe(res);
      file.on("end", () => res.end())
      return;
    }
  
    const file = (await fs.promises.readFile(filePath)).toString();
    res.write(file);
    res.end()
  });

  server.listen(opts.port, () => {
    console.log(`LOCAL: http://localhost:${opts.port}/`);
    console.log(`NETWORK: http://${opts.ip}:${opts.port}/`);
  });


}

module.exports = initialize;



// server.listen(defaultOptions.port, () => console.log("Running on port " + defaultOptions.port));