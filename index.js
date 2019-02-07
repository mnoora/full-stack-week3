const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

morgan.token('body', (req) => { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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
app.get('/info', (req, res) => {
    res.send(`<p>Puhelinluettelossa ${persons.length} henkilön tiedot</p> <p>${Date(req)} </p>`)
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
    const id = Math.floor(Math.random() * 1000) + 1 
    return id
    }

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({ 
        error: 'name missing' 
        })
    }else if (body.number === undefined) {
        return response.status(400).json({ 
        error: 'number missing' 
        })
    }else if (persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())) {
        return response.status(400).json({ 
        error: 'number missing' 
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)
      
    response.json(person)
    })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })