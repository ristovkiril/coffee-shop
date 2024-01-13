// logMiddleware.js
const logMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;

  console.log(`[${timestamp}] ${method} ${url}`);

  // Continue with the request-handling chain
  next();
};

export default logMiddleware;