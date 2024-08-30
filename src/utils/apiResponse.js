class ApiResponse {
    constructor(statusCode, data, message = "Success" ){
        this.statusCode = statusCode,
        this.data = data
        this.message = message
        this.success = statusCode < 400 // else it should be addressed by apierror
    }
}