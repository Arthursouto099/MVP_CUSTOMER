import express, { Application, urlencoded } from "express";  
import "dotenv/config"
import v1Router from "./routes/v1/router";
import prisma from "./client.prisma";
import GlobalErrorHandler from "./handlers/GlobalErrorHandler";
import cors from "cors"


const app: Application = express()



app.use(cors({ origin: "http://localhost:5173"
}))

app.use(express.json())
app.use(urlencoded({extended: true}))


// running in first version of router api :: v1
app.use("/api/v1", v1Router)
app.use(GlobalErrorHandler)



const port: string | number = process.env.PORT ?? 3000

app.listen( port ,(err: Error | undefined) => {
    if(err) console.log(err.message)
    

    console.log(`running in http://localhost:${port}/api`)
})