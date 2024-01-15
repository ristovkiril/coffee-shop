const authenticateUser = (req, res, next) => {
  // Check if the user is authenticated
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // If authenticated, continue to the next middleware or route handler
  next();
};

export default authenticateUser;