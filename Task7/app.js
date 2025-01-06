/**
 * written by:
 * ilia hromchenko
 * bar pahima
 * class:48/6
 */

const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const usersPath = path.join(__dirname, "/users.json");

const port = process.env.PORT || 3000;

//reading the json
function getUsers() {
  try {
    const data = fs.readFileSync(usersPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading users.json:", error);
    return [];
  }
}

// 1. returning all users
//try http://localhost:3000/api/users
app.get("/api/users", (req, res) => {
  const users = getUsers();
  res.json(users);
});

// 3. return users by age range
//http://localhost:3000/api/users/filter?minAge=25&maxAge=28
app.get("/api/users/filter", (req, res) => {
  const { minAge, maxAge } = req.query;

  const users = getUsers();
  const filteredUsers = users.filter((user) => {
    const age = user.age;
    return age >= minAge && age <= maxAge;
  });

  res.json(filteredUsers);
});

// 2. returning according to id request
//localhost:3000/api/users/1
http: app.get("/api/users/:userID", (req, res) => {
  const { userID } = req.params;
  const users = getUsers();
  const user = users.find((user) => user.id === Number(userID));
  if (!user) {
    return res.status(404).send("User Does Not Exist");
  }
  res.json(user);
});
//return[s user data in HTML page

app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  const users = getUsers();
  const user = users.find((user) => user.id === Number(userId));
  console.log({ user });
  if (user) {
    res.send(`
            <html>
            <head><title>User Details</title></head>
            <body>
                <h1>User Details</h1>
                <p><strong>ID:</strong> ${user.id}</p>
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Age:</strong> ${user.age}</p>
            </body>
            </html>
        `);
  } else {
    res.status(404).send("No user found");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
