const logger = (req, res, next) => {
  const date = new Date().toLocaleString();
  const { method, url } = req;

  // Create a wrapper around the res.send method to log the response type
  const originalSend = res.send;

  // Store the log information in a variable
  let logInfo = `>> ${date} | ${method} @ ${url}`;

  res.send = function (body) {
    try {
      const bodyS = JSON.parse(body);
      const res_type = bodyS["res_type"];
      logInfo += ` | << ${res_type}`;
    } catch (err) {
      logInfo += ` | << (unable to parse body)`;
    }

    // Log the combined information after response
    console.log(logInfo);

    // Call the original send method
    return originalSend.apply(this, arguments);
  };

  next();
};

module.exports = logger;
