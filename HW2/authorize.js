// Middleware for authorization
const authorize = (req, res, next, currentUser) => {
  // Check if currentUser is logged in and has the 'admin' role
  if (currentUser && currentUser.role === "admin") {
    next(); // Allow access if user is admin
  } else {
    res.status(403).send("Access Denied");
  }
};

module.exports = authorize;
