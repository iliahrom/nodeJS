/*written by  Ilia Hromchenko and Bar Pahima
class 48/6
*/

const fs = require("fs");
const path = require("path");
const dirPath = path.join(__dirname, "/text");

const textFiles = [
  "text1.txt",
  "text2.txt",
  "text3.txt",
  "text4.txt",
  "text5.txt",
  "text6.txt",
  "text7.txt",
  "text8.txt",
  "text9.txt",
  "text10.txt",
];
let textOut = "";

for (let i = 0; i < textFiles.length; i++) {
  const filePath = path.join(dirPath, textFiles[i]);
  const linesToRead = i + 1; //line to read from file in the index
  if (fs.existsSync(filePath)) {
    const textIn = fs.readFileSync(filePath, "utf-8");
    const lines = textIn.split("\r\n"); // lines splitting

    // n lines in the file, n copies
    for (let j = 0; j < linesToRead && j < lines.length; j++) {
      textOut += lines[j] + "\n"; // saves the line
    }
  } else {
    console.log(`File not found: ${textFiles[i]}`);
  }
}

const outputFilePath = path.join(dirPath, "output.txt");
fs.writeFileSync(outputFilePath, textOut.trim(), "utf-8"); //removing spaces in the ends
console.log(`Processed text written to: ${outputFilePath}`);
