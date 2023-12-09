const express = require('express')
const morgan = require('morgan');
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())

app.use(express.static('build'))

app.use(
    morgan((tokens, req, res) => {
      const method = tokens.method(req, res);
      const url = tokens.url(req, res);
      const status = tokens.status(req, res);
      const contentLength = tokens.res(req, res, 'content-length');
      const responseTime = tokens['response-time'](req, res);
      const postData = req.method === 'POST' ? JSON.stringify(req.body) : '-';
  
      return `${method} ${url} ${status} ${contentLength} - ${responseTime} ms ${postData}`;
    })
  );

    let persons= [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
    ]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        console.log(person)
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  app.get('/api/persons', (request, response) => {
    response.json(persons);
  });

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.post('/api/persons', (request, response) => {
    const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({ error: 'Name and number are required.' });
  }

  const existingEntry = persons.find((entry) => entry.name === name);
  if (existingEntry) {
    return response.status(400).json({ error: 'Name already exists in the agenda.' });
  }
  
    const person = {
      name,
      number,
      date: new Date(),
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
  
    response.status(204).end()
  })

  app.get('/info', (request, response) => {
    const currentDate = new Date();
    const numberOfEntries = persons.length;
  
    const info = {
      timestamp: currentDate.toString(),
      entriesCount: numberOfEntries,
    };
  
    const infoHTML = `
      <p>Timestamp: ${info.timestamp}</p>
      <p>phonebook has info for ${info.entriesCount} persons</p>
    `;
  
    response.send(infoHTML);
  });

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})