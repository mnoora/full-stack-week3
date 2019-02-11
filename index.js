require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const Person = require('./models/person')

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
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
      });
    })

app.get('/info', (req, res) => {
    res.send(`<p>Puhelinluettelossa ${persons.length} henkilön tiedot</p> <p>${Date(req)} </p>`)
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person.toJSON())
        } else {
            response.status(404).end()
        }
      })
      .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
      })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
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

    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateId(),
    })

    person.save().then(savedPerson => {
        response.json(savedPerson.toJSON())
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })