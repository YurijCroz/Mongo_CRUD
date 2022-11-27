module.exports.ServerErrors = (err, req, res, next) => {
    if (res.headersSent) return;
    res
      .status(err.status || 500)
      .send({ errors: 
          [{ text: err.message || "Internal server error" }] });
  };