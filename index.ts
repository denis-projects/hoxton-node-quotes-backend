import express from 'express'
import cors from 'cors'
import { quotes } from './db'

const app = express()

const PORT = 1234

app.use(cors({
    origin: 'http://localhost:1234'
}))

app.get('/quotes', (req, res) => {
    res.send(quotes)
})

app.listen(PORT, () => {
    console.log(`Server is ready and running on: http://localhost:${PORT}/quotes`)
})