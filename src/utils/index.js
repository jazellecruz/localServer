const path = require("path");
const fs = require("fs");
const mimeTypes = require("./mimeTypes");
const os = require("os");

// let yadda = path.join(__dirname, "..", "..", "..", "..", "..");

// const checkIfFileExists = async (filePath) => { 
//   try{
//     let file = await fs.promises.access(filePath);
//     return true
//   } catch(err) {
//     return false
//   }
// }

const getMimeType = (ext_name) => {
  let mimeType = mimeTypes[ext_name];
  if(!mimeType) return null;
  return mimeType
}


const shouldStreamFile = (ext_name) => {
  const filesToStream = ["jpeg", "jpg", "png", "webp", "gif", "tiff", "tif", "mp4", "ogg", "mpeg", "mov", "mp3", "webm", "mpeg", "wav", "mid", "midi", "zip", "gzip", "tar", "rar", "sql"] 
  return filesToStream.includes(ext_name);
}

const getIpAddress = () => {
  let networks = os.networkInterfaces()

  return networks['Wi-Fi'][0].address;
}

const resolveFilePath = async (dir, reqUrl) => {
  let basePath = decodeURIComponent(path.join(__dirname, "..", ".."));
  let url = decodeURIComponent(reqUrl);
  let fileDir = decodeURIComponent(dir);

  let filePath;

  if( url === "/") {
    let htmlPath = path.join(basePath, fileDir, "index.html");

    // you can use 
    if(!fs.existsSync(htmlPath)) {
      htmlPath = path.join(basePath, fileDir);
      let contents = await fs.promises.readdir(htmlPath);
      let htmlFileName = contents.filter(content => path.extname(content) === ".html");

      filePath = path.join(basePath, dir, decodeURIComponent(htmlFileName[0]));
    } else {
      filePath = htmlPath;
    }

  } else {
    filePath = path.join(basePath, dir, url);
  }

  return filePath;
}

module.exports = { getMimeType, shouldStreamFile, getIpAddress, resolveFilePath}