import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

export default function validateSchema(schema: ZodType<unknown>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      const errs = parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      console.log(errs)

      res.status(400).json({
        message: "Erro de validação no corpo da requisição",
        errors: errs,
        success: false,
      });
      return;
    }

    
    req.body = parsed.data;

    next();
  };
}
