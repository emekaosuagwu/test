const logger = (req, res, next) => {
  console.log(`Endpoint: ${req.url}`);
  next();
};

export default logger;
