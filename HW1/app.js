const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;
const path = require("path");

const productFilePath = path.join(__dirname, "./json/products.json");
const usersFilePath = path.join(__dirname, "./json/users.json");

const readUsersFile = () => {
  const userData = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(userData);
};
const readProductFile = () => {
  const data = fs.readFileSync(productFilePath, "utf-8");
  return JSON.parse(data);
};
//all users
app.get("/users", (req, res) => {
  const users = readUsersFile();
  return res.json(users);
});
//route users by age
app.get("/users/:age", (req, res) => {
  const { age } = req.params; //Destructure "age" from req.params
  const users = readUsersFile(); // Read all users from the file
  const ageNum = Number(age);

  //filter all users that their age greater that the parameter
  const filteredUsers = users.filter((user) => user.age > ageNum);
  if (filteredUsers.length === 0) {
    return res.status(404).send(`User older than ${age} Does Not Exist`);
  }

  res.json(filteredUsers); //return filtered users
});
//route all products
app.get("/products", (req, res) => {
  const products = readProductFile();
  res.json(products);
});
//route products by id
app.get("/products/:proID", (req, res) => {
  const { proID } = req.params; //Destructure "proID" from req.params
  const products = readProductFile(); // Read all products from the file
  //finds the product by id
  const product = products.find((product) => product.id === Number(proID));
  //if not exist, return error
  if (!product) {
    return res.status(404).send(`Product with ${proID} Does Not Exist`);
  }
  res.json(product);
});
//static files from assets
app.use(express.static(path.join(__dirname, "assets")));

app.use((req, res, next) => {
  //404 errors
  res.status(404).send("<h1>File Not Found</h1>");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
