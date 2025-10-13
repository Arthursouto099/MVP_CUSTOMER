import { Request, Response, NextFunction } from "express";
import { RequestLogged } from "../types/RequestLogged";
import jwt from "jsonwebtoken"
import { Customer } from "../../generated/prisma";

export default function authMiddleware (req: RequestLogged, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    
    
    // trocar para um erro mais especializado
    if(!authHeader) {
         res.status(401).json({message: "Não autorizado"})
        return
    }

    const token = authHeader.split(" ")[1]
    const payload =   jwt.verify(token, process.env.JWT_SECRET ?? "") as {
        data: Customer
    }

    if(!payload) {
         res.status(401).json({message: "Não autorizado"})
        return
    }
    
    
    
     
    req.customer = payload.data

    next()
}