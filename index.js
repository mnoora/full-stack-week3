const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
      {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
      },
      {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
      },
      {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
      },
      {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
      }
    ]

app.get('/api/persons', (req, res) => {
    res.json(persons)
    })

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    person = persons.filter(person => person.id !== id);
      
    response.status(204).end();
    });

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
    }

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({ 
        error: 'content missing' 
        })
    }

    const person = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }

    persons = persons.concat(person)
      
    response.json(person)
    })

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })