const express = require("express");
const logger = require("./logger1");
const authorize = require("./authorize");
const app = express();
const port = 3000;

// Middleware for processing JSON request bodies
app.use(express.json());

// Example of a list of users for checking authorization
const users = [
  { username: "admin123", password: "admin123", role: "admin" },
  { username: "admin234", password: "admin234", role: "admin" },
  { username: "user123", password: "user123", role: "user" },
  { username: "user678", password: "user678", role: "user" },
];

app.use(logger);

// Storage of the currently authorized user
let currentUser = null;

// Route for the home page
app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

// Route for login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists in the users array
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // If the user is found, set currentUser to this user
    currentUser = user;

    // Respond with a success message and user data
    res.json({
      message: "Login successful",
      user: {
        username: user.username,
        role: user.role,
      },
    });
  } else {
    // If the user is not found, respond with an error
    res.status(401).json({ message: "Invalid login or password" });
  }
});

// Logout route
app.post("/logout", (req, res) => {
  currentUser = null; // Set currentUser to null on logout
  res.json({
    message: "Logout successful",
  });
});

// Route for the admin page, only accessible by admin users
app.get(
  "/admin",
  (req, res, next) => {
    // Authorization check
    authorize(req, res, next, currentUser); // Pass currentUser to authorize middleware
  },
  (req, res) => {
    res.send("Welcome to the admin page!");
  }
);

// Route for the public page
app.get("/public", (req, res) => {
  res.send("Welcome to the public page!");
});

// Start the server
app.listen(port, () => {
  console.log(`The application is running on port ${port}`);
});
