import { NextFunction, Request, Response } from "express";

import ErrorHandler from "../errors/ErrorHandler";

export default function GlobalErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {

    if (error) {


        if (error instanceof ErrorHandler) {
            return res.status(error.codeHttp).json(error.toJSON());
        }




        res.status(500).json({ message: "internal error", error: error})
        return
    }


    next()
}