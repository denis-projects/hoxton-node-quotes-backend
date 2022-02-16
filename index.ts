import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json());


const PORT = 1234


type Quotes = {
    id: number
    philosopher: string
    philosopy: string
    age: number
    firstName: string
    lastName: string
    image: string
}

let quotes: Quotes[] = [
    {
        id: 1,
        philosopher: 'Nico',
        philosopy: 'Learn all the modules.',
        age: 34,
        firstName: "Nicolas",
        lastName: "Marcora",
        image: "nicolas.jpg"
    },
    {
        id: 2,
        philosopher: 'Ed',
        philosopy: 'Do not forget to push your work on time.',
        age: 28,
        firstName: "Edgar",
        lastName: "Putans",
        image: "ed.jpg"
    },
    {
        id: 3,
        philosopher: 'Denis',
        philosopy: 'How to learn faster, without pratice too much :P.',
        age: 28,
        firstName: "Denis",
        lastName: "Mimini",
        image: "denis.jpg"
    },
    {
        id: 4,
        philosopher: 'React',
        philosopy: 'If you learn me well, you will be a good developer.',
        age: 11,
        firstName: "React",
        lastName: "Facebook",
        image: "denis.jpg"
    },
    {
        id: 5,
        philosopher: 'JavaScript',
        philosopy: ' If you think you are done with me, you are wrong. i will chase you even in your dreams.',
        age: 27,
        firstName: "JavaScript",
        lastName: "Language",
        image: "denis.jpg"
    },
    {
        id: 6,
        philosopher: 'TypeScript',
        philosopy: 'If you did not give me the type i want, i will push the button that will destroy all code.',
        age: 3,
        firstName: "TypeScript",
        lastName: "JavaScript",
        image: "denis.jpg"
    }
]



// Get Homepage

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



// Get all quotes

app.get('/quotes', (req, res) => {
    res.send(quotes)
})


// Get a random Quote

app.get('/randomQuote', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    const quote = quotes[randomIndex]
    res.send(quote)
})



// Get a quote by ID

app.get('/quotes/:id', (req, res) => {
    const id = Number(req.params.id);
    const match = quotes.find((quote) => quote.id === id);
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
    const image = req.body.img;


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



    if (errors.length === 0) {

        const newPhilosopy: Quotes = {
            id: Math.random(),
            philosopher: philosopher,
            philosopy: philosopy,
            firstName: firstName,
            lastName: lastName,
            age: age,
            image: image
        };

        quotes.push(newPhilosopy);
        res.status(201).send(newPhilosopy);
    } else {
        res.status(400).send({ errors: errors });
    }
});


// Update the qutote

app.patch('/quotes/:id', (req, res) => {
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

        res.send(quotesToChange);
    } else {
        res.status(404).send({ error: 'Philosopy not found.' });
    }
});


// Delete a quote

app.delete('/quotes/:id', (req, res) => {

    // get id
    const id = Number(req.params.id);

    // find quote to delete
    const match = quotes.find((quote) => quote.id === id);

    // delete if it exists
    if (match) {
        quotes = quotes.filter((quote) => quote.id !== id);
        res.send({ message: 'Quote deleted successfully.' });
    } else {
        res.status(404).send({ error: 'Quote not found.' });
    }
});


// Listen the server 

app.listen(PORT, () => {
    console.log(`Server is ready and running on: http://localhost:${PORT}/quotes`)
})