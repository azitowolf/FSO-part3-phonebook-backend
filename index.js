const express = require('express')
const app = express()
const morgan = require('morgan')

morgan.token('RequestBodyToken', function (req, res) { return JSON.stringify(req.body) });
const morganConfig = morgan(':method :url :status :res[content-length] - :response-time ms :RequestBodyToken')

app.use(express.json())
app.use(morganConfig)


let persons = [
  {
    "name": "Arto Hellas",
    "number": "1234567",
    "id": 1
  },
  {
    "name": "Samuel Smith",
    "number": "21234",
    "id": 2
  },
  {
    "name": "Test Testerson",
    "number": "1234123123",
    "id": 4
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Nothing to see here!</h1>')
})

// exercise 3.1
app.get('/api/persons', (request, response) => {
  response.json(persons)
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

// exercise 3.5
const generateId = () => {
  const randomId = Math.floor(Math.random() * 1000)
  return randomId
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  // exercise 3.6
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }
  if (persons.find((person) => person.name === body.name)) {
    return response.status(409).json({ 
      error: 'duplicate record detected' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)
  
  response.json(persons)

})

// exercise 3.4
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  console.log(id)
  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
