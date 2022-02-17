import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json());

const PORT = 1234

import quoteRouter from './resorces/quotes'

app.use('/quotes', quoteRouter)


// Listen the server 

app.listen(PORT, () => {
    console.log(`Server is ready and running on: http://localhost:${PORT}/quotes`)
})