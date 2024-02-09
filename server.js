const http = require("http");
const fspromises = require("fs").promises
const fs = require("fs")
const path = require("path");
const { getMimeType,shouldStreamFile, resolveFilePath} = require("./src/utils/index");
 
let options = {
  fileDir: "/client",
  port: 8000,
  host: "localhost",
  ip: "192.168.100.7"
}

const server = http.createServer(async (req, res, next) => {
  let filePath = await resolveFilePath(options.fileDir, req.url)
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

  const file = (await fspromises.readFile(filePath)).toString();
  res.write(file);
  res.end()
});

server.listen(options.port, () => console.log("Running on port " + options.port));