const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

fs.readdir(path.resolve("inputFolder"), (err, files) => {
  files.forEach((fileName) => {
    convert("inputFolder", "outputFolder", fileName);
  });
});

const convert = (from, to, fileName) => {
  console.log(fileName);
  sharp(`./${from}/${fileName}`)
    // .sharpen()
    // .blur(20)
    .resize({ width: 500 })
    .toFile(`./${to}/${fileName}`)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
};
