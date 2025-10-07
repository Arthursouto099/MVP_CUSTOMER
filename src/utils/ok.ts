import { Response } from "express";

export default function Ok(res: Response, message: string, code = 200, data: unknown = null) {
    return res.status(code).json({message, data})
}