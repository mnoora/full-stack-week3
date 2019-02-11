if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const Person = require('./models/person')
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))


morgan.token('body', (req) => { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
      }).catch(error => next(error))
    })

app.get('/info', (req, res, next) => {
    Person.find({}).then(persons => {
        res.send(`<p>Puhelinluettelossa ${persons.length} henkilön tiedot</p> <p>${Date(req)} </p>`)
    }).catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person.toJSON())
        } else {
            response.status(404).end()
        }
      })
      .catch(error => next(error))
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

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateId(),
    })

    person
        .save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedAndFormattedPerson => {
            response.json(savedAndFormattedPerson)
        }) 
        .catch(error => next(error)) 
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
      name: body.name,
      number: body.number,
    }
  
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson.toJSON())
      })
      .catch(error => next(error))
  })

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }
  
  app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })