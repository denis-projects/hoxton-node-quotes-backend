import express from 'express'
import cors from 'cors'
import { quotes } from './db'

const app = express()

const PORT = 1234

app.use(cors())

app.get('/', (req, res) => {
    res.send(`
    <h1>Welcome to our quotes API!</h1>
    <p>Here are endpoints:</p>
    <ul>
      <li><a href="/quotes">/quotes</a></li>
      <li><a href="/randomQuote">/randomQuote</a></li>
    </ul>
   `)
})

app.get('/quotes', (req, res) => {
    res.send(quotes)
})

app.get('/randomQuote', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    const quote = quotes[randomIndex]
    res.send(quote)
})


app.listen(PORT, () => {
    console.log(`Server is ready and running on: http://localhost:${PORT}/quotes`)
})