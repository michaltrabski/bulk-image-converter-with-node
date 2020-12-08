const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

fs.readdir(path.resolve("inputFolder"), (err, files) => {
  const mediaArr = [];
  files.forEach((file) => {
    convert("inputFolder", "outputFolder", file);
    mediaArr.push({ media: file, type: getMediaType(file) });
  });
  createJsonFile("media.json", { mediaArr });
});

const createJsonFile = (name, fileContent) => {
  fs.writeFile(name, JSON.stringify(fileContent), (err) => {
    if (err) throw err;
    console.log(`${name} created.`);
  });
};

const getMediaType = (file) => {
  let type = "unnown";
  const types = [".jpg", ".mp4", ".wmv"];

  for (let item of types) {
    if (file.includes(item)) type = item;
  }

  return type;
};

const convert = (from, to, fileName) => {
  console.log(fileName);
  sharp(`./${from}/${fileName}`)
    // .sharpen()
    .blur(5)
    .resize({ width: 720 })
    .toFile(`./${to}/blur-${fileName}`)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
};
