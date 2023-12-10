require('dotenv').config()
const express = require('express')
const morgan = require('morgan');
const app = express()
const cors = require('cors')

const Person = require('./models/person')

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


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(p => {
    if(p){
      response.json(p)
    }else {
      response.status(404).end()
    } 
  })
})

app.get('/api/persons', async (request, response) => {
  try {
    const persons = await Person.find({});
    response.json(persons);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/api/persons', async (request, response) => {
  try {
    const { name, number } = request.body;

    if (!name || !number) {
      return response.status(400).json({ error: 'Name and number are required.' });
    }

    // Buscar si ya existe una persona con el mismo nombre
    const existingPerson = await Person.findOne({ name });

    if (existingPerson) {
      // Si existe, actualizar el número de teléfono
      existingPerson.number = number;
      const updatedPerson = await existingPerson.save();
      response.json(updatedPerson);
    } else {
      // Si no existe, crear una nueva persona
      const newPerson = new Person({
        name,
        number,
        date: new Date(),
      });

      const savedPerson = await newPerson.save();
      response.json(savedPerson);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/persons/:id', async (request, response) => {
  const id = request.params.id;
  const { name, number } = request.body;

  try {
    // Verificar si la persona con el ID proporcionado existe
    const existingPerson = await Person.findById(id);

    if (!existingPerson) {
      return response.status(404).json({ error: 'Person not found.' });
    }

    
    existingPerson.name = name || existingPerson.name;
    existingPerson.number = number || existingPerson.number;

    const updatedPerson = await existingPerson.save();

    response.json(updatedPerson);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

  app.delete('/api/persons/:id', async (request, response) => {
    const id = request.params.id;
  
    try {
      await Person.findByIdAndDelete(id);
      response.status(204).end(); // 204 significa "No Content" y se usa para indicar éxito en una operación de eliminación
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  });


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})