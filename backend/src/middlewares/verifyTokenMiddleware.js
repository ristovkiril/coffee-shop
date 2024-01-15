import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    // If no token is provided, set req.user to null
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded; // Attach user information to the request object
    next();
  } catch (err) {
    req.user = null; // Set req.user to null in case of an invalid token
    next();
  }
};

export default verifyToken;
