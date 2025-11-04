import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import configDB from './db/config.js'

dotenv.config()
const app = express()

const port = process.env.PORT || 8080;
app.use(cors())
app.use(express.json()) 

app.listen(port,()=>{
    configDB()
    console.log(`Server is Running on the PORT: ${port}`)
})