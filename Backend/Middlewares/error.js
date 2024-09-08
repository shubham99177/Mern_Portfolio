class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const ErrorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    // Handle duplicate key errors (MongoDB specific)
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // Handle JWT errors
    if (err.name === "JsonWebTokenError") {
        const message = `Invalid JSON Web Token. Try again.`;
        err = new ErrorHandler(message, 400);
    }

    // Handle expired JWT errors
    if (err.name === "TokenExpiredError") {
        const message = `JSON Web Token has expired. Try again.`;
        err = new ErrorHandler(message, 400);
    }

    // Handle invalid Mongoose ObjectId errors
    if (err.name === "CastError") {
        const message = `Invalid ${err.path}.`;
        err = new ErrorHandler(message, 400);
    }

    // Handling Mongoose validation errors
    const errorMessage = err.errors 
        ? Object.values(err.errors).map((error) => error.message).join(', ') 
        : err.message;

    // Sending the response
    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage,
    });
};

export default ErrorHandler;
