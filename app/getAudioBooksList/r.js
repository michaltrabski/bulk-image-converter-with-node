const path = require("path");
const fs = require("fs");
const { getAudioDurationInSeconds } = require("get-audio-duration");

const folder = "audiobooks/";
const myJson = { url: "www.alsjkfdsldjkf.pl/asdasd", audioBooks: [] };

fs.readdir(path.resolve(folder), (err, items) => {
  if (err) console.log("err = ", err);

  items.forEach((item) => {
    // item is a directory or a file
    const isDirectory = fs.statSync(folder + item).isDirectory();
    if (!isDirectory) return;

    // here I'm inside subfolder
    const audioBook = {
      title: item,
      id: `id${Math.floor(Math.random() * 1000000)}`,
      available: true,
      author: "",
      image: "",
      allFilesDuration: 0,
      files: [],
    };
    fs.readdir(path.resolve(folder + item), (err, files) => {
      if (err) console.log("err = ", err);

      // here is file list
      let sum = 0;
      files.forEach((file) => {
        if (file.endsWith(".mp3")) {
          // console.log("file = ", file);
          getAudioDurationInSeconds(folder + item + "/" + file).then(
            (duration) => {
              sum += duration;
              audioBook.allFilesDuration = sum;
              audioBook.files.push({
                name: file.replace(".mp3", ""),
                mp3: file,
                duration,
              });
            }
          );
        }
        if (file.endsWith(".jpg")) audioBook.image = file;
        if (file.endsWith(".png")) audioBook.image = file;
        if (file.endsWith(".author"))
          audioBook.author = file.replace(".author", "");
      });
      myJson.audioBooks.push(audioBook);
    });
  });
  setTimeout(() => {
    createJsonFile("audioBooks.json", myJson);
  }, 1000);
  setTimeout(() => {
    createJsonFile("audioBooks.json", myJson);
  }, 5000);
});

const createJsonFile = (name, fileContent) => {
  fs.writeFile(name, JSON.stringify(fileContent), (err) => {
    if (err) throw err;
    console.log(`${name} created.`);
  });
};
