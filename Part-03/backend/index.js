require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const helmet = require('helmet')
const connectToDatabase = require('./utils/mongo')
const app = express()
const Person = require('./models/person')

app.use(helmet())
app.use(cors())

app.use(express.json())

connectToDatabase()

app.use(express.static(path.join(__dirname, '../frontend/dist')))

morgan.token('body', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '')

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  Person.countDocuments({})
    .then(count => {
      const current_date = new Date().toString()
      response.send(`
        <h1>Phonebook has info for ${count} people</h1>
        <h2>${current_date}</h2>
      `)
    })
})



app.get('/api/persons', (request, response) => {
    Person.find({})
      .then(persons => response.json(persons))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
      .then(person => {
        if (person) {
          response.json(person)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
})

const generateId = () => {
    const maxId = persons.length > 0 ? 
        Math.max(...persons.map(p => Number(p.id))) 
        : 0
        
    return String(maxId + 1)
}

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({ name, number })

  person.save()
    .then(savedPerson => response.json(savedPerson))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => response.json(updatedPerson))
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})

// Unknown endpoint
app.use((req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
})

// Error handler
app.use((error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})