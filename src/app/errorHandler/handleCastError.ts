import mongoose from "mongoose";

const handleCastError = (err: mongoose.Error.CastError) => {
    const objectIdRegex = /"([^"]*)"/
    const extractValue = err.message.match(objectIdRegex);
    const extractedIds = extractValue && extractValue[0]

    return {
        message: "Invalid ID",
        errorMessage: `${extractedIds} is not a valid ID!`,
    }
}

export default handleCastError