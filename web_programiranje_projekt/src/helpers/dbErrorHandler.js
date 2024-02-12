
exports.errorHandler = (error) => {
  let message = "Something went wrong";

  for (let errorName in error.errors)
    if (error.errors[errorName].message)
      message = error.errors[errorName].message;
  return message;
};
