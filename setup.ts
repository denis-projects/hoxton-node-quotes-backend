import Database from 'better-sqlite3'
// import { Router } from 'express'


const db = new Database('./data.db', {
    verbose: console.log
})

// const router = Router()

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


const dropTable = db.prepare('DROP TABLE IF EXISTS quotes;');
dropTable.run();

const createQuotesTable = db.prepare(`
CREATE TABLE IF NOT EXISTS quotes (
    id INTEGER,
    philosopy TEXT NOT NULL,
    philosopher TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    age INTEGER,
    image TEXT NOT NULL,
    PRIMARY KEY (id)
    
);
`);

createQuotesTable.run()


const createQuote = db.prepare(`
INSERT INTO quotes (philosopy, philosopher, firstName, lastName, age, image ) VALUES  (?, ?, ?, ?, ?, ?);
`);

for (const quote of quotes) {
    createQuote.run(quote.philosopy, quote.philosopher, quote.firstName, quote.lastName, quote.age, quote.image)
}





// export default router