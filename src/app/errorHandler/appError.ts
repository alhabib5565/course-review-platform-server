export class AppError extends Error {
    public statusCode: number

    constructor(message: string, statusCD: number,) {
        super(message)
        this.statusCode = statusCD
        Error.captureStackTrace(this, this.constructor);
    }
}