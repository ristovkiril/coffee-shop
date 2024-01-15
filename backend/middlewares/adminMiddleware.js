const adminMiddleware = (req, res, next) => {
  // Check if the user is authenticated
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check if the user's role is "admin"
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden - You do not have the necessary permissions." });
  }

  // If the user is authenticated and has the "admin" role, continue to the next middleware or route handler
  next();
};

export default adminMiddleware;