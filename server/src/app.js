import express from 'express'
import cors from 'cors'
import cookieparser from 'cookie-parser'
import userRouter from './routes/user.route.js'
import fileRouter from './routes/file.route.js'

const app = express()

app.use(
    cors()
)

app.use(express.json())
app.use(cookieparser())

app.use('/api', userRouter)
app.use('/api', fileRouter)

app.get("/", (req, res)=>{
    res.send("Hi Its Akash")
})


export default app