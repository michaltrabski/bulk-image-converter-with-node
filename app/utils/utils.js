const createJsonFile = (name, fileContent) => {
  fs.writeFile(name, JSON.stringify(fileContent), (err) => {
    if (err) throw err;
    console.log(`${name} created.`);
  });
};
