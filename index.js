const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('build'))
const Person = require('./models/person')

const morgan = require('morgan')
morgan.token('RequestBodyToken', function (req, res) { return JSON.stringify(req.body) });
const morganConfig = morgan(':method :url :status :res[content-length] - :response-time ms :RequestBodyToken')

app.use(morganConfig)

// exercise 3.1
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
})

// exercise 3.2
app.get('/info', (request, response) => {
  let responseHTML = 
  `<h2>
    Phonebook has info for ${persons.length} people
  </h2>
  <p>
    ${new Date()}
  </p>` 
  response.send(responseHTML)
})

// exercise 3.3
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const personToAdd = new Person({
    name: body.name,
    number: body.number
  })

  personToAdd.save()
  .then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
  .catch((err) => {
    next(err)
  })
  
})

// TODO: Front End handles update optimistically, without a refresh
app.put('/api/persons/:id', (request, response) => {
  const body = request.body
  const filter = { name: body.name}
  const update = {number: body.number}

  Person.findOneAndUpdate(filter, update)
  .then((updatedPerson) => {
    response.json(updatedPerson.toJSON())
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  
  Person.deleteOne({ _id: id })
  .then(() => {
    response.status(204).end()
  })
  .catch((err) => {
    next(err)
  })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } 
  next(error)
}

// handler of other error types
// TODO: add more error types https://expressjs.com/en/guide/error-handling.html
app.use(errorHandler)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
