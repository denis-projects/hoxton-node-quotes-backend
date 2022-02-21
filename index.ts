import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'

const app = express()

app.use(cors())
app.use(express.json());

const PORT = 1234

// import quoteRouter from './resorces/quotes'

// app.use('/quotes', quoteRouter)


const db = new Database('./data.db', {
    verbose: console.log
})

const getAllQuotes = db.prepare(`
SELECT * FROM quotes;
`)

const getQuotesById = db.prepare(`
SELECT * FROM quotes WHERE Id=? ;
`)

const createQuote = db.prepare(`
INSERT INTO quotes (philosopy, philosopher, firstName, lastName, age, image ) VALUES (?, ?, ?, ?, ?. ? );
`)


const updateQuote = db.prepare(`
UPDATE quotes SET philosopy=?, philosopher=?, firstName=?, lastName=?, age=?, image=?, WHERE id=?
`)

const deleteQuote = db.prepare(`
DELETE FROM quotes WHERE id=?;
`)

// Get all quotes

app.get('/quotes', (req, res) => {
    const allQuotes = getAllQuotes.all()
    res.send(allQuotes)
})



// Get a random Quote

app.get('/randomQuote', (req, res) => {
    const allQuotes = getAllQuotes.all()
    const randomIndex = Math.floor(Math.random() * allQuotes.length)
    res.send(allQuotes[randomIndex])
})



// Get a quote by ID

app.get('/quotes/:id', (req, res) => {
    const id = req.params.id;
    const match = getQuotesById.get(id);

    if (match) {
        res.send(match);
    } else {
        res.status(404).send({ error: 'Quote not found.' });
    }
});



// Add another philospy (POST)

app.post('/quotes', (req, res) => {

    const philosopy = req.body.philosopy;
    const philosopher = req.body.philosopher;
    const age = req.body.age;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const image = req.body.image;


    const errors = [];

    if (typeof philosopy !== 'string') {
        errors.push('Check the typeof philosopy')
    }
    if (typeof philosopher !== 'string') {
        errors.push('Check the typeof philosopher')
    }
    if (typeof firstName !== 'string') {
        errors.push('Check the typeof firstName')
    }
    if (typeof lastName !== 'string') {
        errors.push('Check the typeof lastName')
    }
    if (typeof image !== 'string') {
        errors.push('Check the typeof image')
    }
    if (typeof age !== 'number') {
        errors.push('Check the typeof image')
    }



    if (errors.length === 0) {
        const create = createQuote.run(philosopher, philosopy, firstName, lastName, age, image)

        res.status(201).send(create);
    } else {
        res.status(400).send({ errors: errors });
    }
});


// Update the qutote

app.patch('/:id', (req, res) => {
    const id = Number(req.params.id);

    // happy path: every key given exists and is the right type // ✅
    // sad path: wrong keys or wrong types provided by user // ❌

    const quotesToChange = quotes.find((quote) => quote.id === id);

    if (quotesToChange) {

        if (typeof req.body.philosopher === 'string') quotesToChange.philosopher = req.body.philosopher;
        if (typeof req.body.philosopy === 'string') quotesToChange.philosopy = req.body.philosopy;
        if (typeof req.body.image === 'string') quotesToChange.image = req.body.image;
        if (typeof req.body.firstName === 'string') quotesToChange.firstName = req.body.firstName;
        if (typeof req.body.lastName === 'string') quotesToChange.lastName = req.body.lastNames;
        if (typeof req.body.age === 'number') quotesToChange.age = req.body.age;

        res.send(quotesToChange);
    } else {
        res.status(404).send({ error: 'Philosopy not found.' });
    }
});


// Delete a quote

app.delete('/quotes/:id', (req, res) => {

    // get id
    const id = req.params.id;
    const result = deleteQuote.run(id)



    // delete if it exists
    if (result.changes !== 0) {
        res.send({ message: 'Quote deleted successfully.' });
    } else {
        res.status(404).send({ error: 'Quote not found.' });
    }
});

// Listen the server 

app.listen(PORT, () => {
    console.log(`Server is ready and running on: http://localhost:${PORT}/quotes`)
})