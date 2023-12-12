import mongoose from "mongoose";

export const handleValidationError = (err: mongoose.Error.ValidationError) => {
    let messageConcat = ''
    Object.values(err.errors).forEach((errorDetails, index) => {
        messageConcat += (index === 0 ? "" : ". ") + errorDetails.message
    })

    return {
        message: "Validation Error",
        errorMessage: messageConcat,
    }
}