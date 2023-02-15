exports.CreateError = (message, StatusCode) => {
    const error = new Error()
    error.message = message
    error.status = StatusCode
    return error
}