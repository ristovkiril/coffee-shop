import jwt from "jsonwebtoken";

function getClientIp(req) {
  const ipAddress =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  // Extract the first IP address from the list if x-forwarded-for header is present
  return ipAddress ? ipAddress.split(',')[0].trim() : null;
}

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  req.ipAddress = getClientIp(req);

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
