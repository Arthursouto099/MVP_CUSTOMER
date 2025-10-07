import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";



export default class ErrorHandler extends Error {

    constructor(public readonly message: string, public readonly code?: string, public readonly fault?: unknown, public readonly codeHttp: number = 500) {
        super(message)
        this.name = this.constructor.name
        

    }

    static validation(message = 'Erro de validação', fault?: unknown) {
        return new this(message, 'VALIDATION_ERROR', fault, 400);
    }

    // 💡 Erro de autenticação
    static unauthorized(message = 'Não autorizado', error?: unknown) {
        return new this(message, 'UNAUTHORIZED', error, 401);
    }

    // 💡 Erro de permissão
    static forbidden(message = 'Acesso proibido', error?: unknown) {
        return new this(message, 'FORBIDDEN', error, 401);
    }

    // 💡 Erro de recurso não encontrado
    static notFound(message = 'Recurso não encontrado', error?: unknown) {
        return new this(message, 'NOT_FOUND', error, 404);
    }

    // 💡 Erro interno genérico
    static internal(message = 'Erro interno do servidor', fault?: unknown) {
        return new this(message, 'INTERNAL_ERROR', fault, 500)
    }

    static fromPrismaError(this: new (message: string, code?: string, fault?: any, codeHttp?: number) => ErrorHandler,  err: PrismaClientKnownRequestError): ErrorHandler {
        switch (err.code) {
            case "P2002":
                // return new this("Registro duplicado (unique violation).", 409)
                return new this("Registro duplicado (unique violation)", "PRISMA_ERROR", err, 409)
            case "P2025":
                return new this("Registro não encontrado.", "NOT_FOUND", err, 404)
            default:
                return new this("Erro no banco de dados.", "INTERNAL_ERROR_PRISMA", err, 500)
        }
    }

    toJSON() {
    return {
        error: this.name,
        message: this.message,
        code: this.code,
        fault: this.fault,
    };
}
 
}


