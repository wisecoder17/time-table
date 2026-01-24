export class ApiError extends Error {
  constructor(message, status, originalError) {
    super(message);
    this.status = status;
    this.originalError = originalError;
    this.name = "ApiError";
  }
}

export const handleApiError = (error) => {
  let message = "An error occurred";
  let status = -1;

  if (error.response) {
    // Server responded with error status
    status = error.response.status;
    message = error.response.data?.message || `Server error (${status})`;
  } else if (error.request) {
    // Request was made but no response
    status = 0;
    if (error.message?.includes("timeout")) {
      message =
        "Request timeout - server is not responding. Is the backend running?";
    } else if (error.code === "ECONNREFUSED") {
      message = "Connection refused - backend server is not running";
    } else if (error.message?.includes("Network")) {
      message = "Network error - check your internet connection and server URL";
    } else {
      message = error.message || "No response from server";
    }
  } else if (error.message) {
    // Error in request setup
    status = -1;
    message = error.message;
  }

  return new ApiError(message, status, error);
};

export const getErrorMessage = (error) => {
  if (error instanceof ApiError) {
    return error.message;
  }
  if (error.message) {
    return error.message;
  }
  return "An unexpected error occurred";
};
