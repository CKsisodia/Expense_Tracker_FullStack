class ApiError extends Error {
  constructor(statusCode = 500, message = "Internal server error", data = {}) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
      timestamp: new Date().toISOString(),
    };
  }
}

module.exports = ApiError;
