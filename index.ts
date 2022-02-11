import express from 'express'
import cors from 'cors'
import { quotes } from './db'

const app = express()

const PORT = 1234

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.get('/quotes', (req, res) => {
    res.send(quotes)
})

app.get('/quotes/:id', (req, res) => {
    const id = Number(req.params.id)
    const match = quotes.find((quote) => quote.id === id)
    if (match) {
        res.send(match)
    } else {
        res.status(404).send({ error: 'We did not found the quote' })
    }
})

app.listen(PORT, () => {
    console.log(`Server is ready and running on: http://localhost:${PORT}/quotes`)
})