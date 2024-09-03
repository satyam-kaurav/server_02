const success = (res, message, data = null) => {
  res.status(200).json({
    res_type: "success",
    message,
    data,
  });
};

const badRequest = (res, message, isData = false, data = null) => {
  res.status(400).json({
    res_type: "bad_request",
    message,
    isData,
    data,
  });
};

const serverError = (res, error) => {
  console.error("!>>", error);
  res.status(500).json({
    res_type: "server_error",
    message: error.message ?? error,
    data: null,
  });
};

module.exports = { success, badRequest, serverError };
