const fs = require('fs');
const path = require('path');

const dir = "uploads"
const match = "8b523229eadbd9387d81c68301e4e70d";
const replace = "8b523229eadbd9387d81c68301e4e70d.jpg";
const files = fs.readdirSync(dir);

files
  .filter(file => file.match(match))
  .forEach(file => {
    const filePath = path.join(dir, file);
    const newFilePath = path.join(dir, file.replace(match, replace));

    fs.renameSync(filePath, newFilePath);
  });