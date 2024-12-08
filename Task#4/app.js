/*written by  Ilia Hromchenko and Bar Pahima
class 48/6
*/

const fs = require("fs");
const path = require("path");
const dirPath = path.join(__dirname, "/text");
/*
The program gets 10 file names from an array and copies the content in new file by the following way,
one rows from first file
2 rows fron the second file
3 rows from the 3rd file

till n rows from n file.
**if the file don't have enough rows it will copy only the available rows
*/
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
  const linesToRead = i + 1; //row to read from file in the index

  const textIn = fs.readFileSync(filePath, "utf-8");
  const lines = textIn.split("\r\n"); // rows splitting

  // n lines in the file, n copies
  for (let j = 0; j < linesToRead && j < lines.length; j++) {
    textOut += lines[j] + "\n"; // saves the row
  }
}

const outputFilePath = path.join(dirPath, "output.txt");
fs.writeFileSync(outputFilePath, textOut.trim(), "utf-8"); //removing spaces in the ends of the rows
console.log(`Text written to: ${outputFilePath}`);
