import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";
import ErrorHandler from "../errors/ErrorHandler";



type ErrorHandlerConstructor = {
    new (message: string, code?: string, fault?: unknown, codeHttp?: number): ErrorHandler
    fromPrismaError(err: PrismaClientKnownRequestError): ErrorHandler
    internal(message?: string, fault?: unknown): ErrorHandler
}

export default function errorHandlerReturn(errorAsAny: any, typeError: ErrorHandlerConstructor) {
    if(errorAsAny instanceof typeError) {
        return errorAsAny
    }

    if(errorAsAny instanceof PrismaClientKnownRequestError) {
        return  typeError.fromPrismaError(errorAsAny)
    }

    return typeError.internal(errorAsAny.message, errorAsAny)

}