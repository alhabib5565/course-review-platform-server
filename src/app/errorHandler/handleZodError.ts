import { ZodError } from "zod";
import { TErrorMessage } from "./errorConstant";


export const handleZodError = (err: ZodError): TErrorMessage => {
    let concatMessage = ''
    err.issues.forEach(errorDetails => concatMessage += " " + errorDetails.message)
    return {
        message: 'Validation Error',
        errorMessage: concatMessage
    }
}