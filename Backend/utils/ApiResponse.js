class ApiResponse {
  constructor(statusCode = 200, message = "success", data) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
    };
  }
}

module.exports = ApiResponse;
