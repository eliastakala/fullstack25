require('dotenv').config()
const express = require('express')
const Contact = require('./models/contact')

const app = express()

const errorHandler = (error, request, response, next) => {
  console.log('Error: ', error.message)
  if (error === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(express.json())
app.use(express.static('dist'))

const morgan = require('morgan')
morgan.token('content', function (req) { return  JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content', {
  skip: function(req) { return req.method !== 'POST' }
}))
app.use(morgan('tiny', {
  skip: function(req) { return req.method === 'POST'}
}))

app.get('/info', (request, response, next) => {
  Contact.countDocuments({}).then(result => {
    response.send(
      `<p>Phonebook has info for ${result} people</p>
      <p>${new Date().toString()}</p>`
    )
  })
    .catch((error) => next(error))
})

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response, next) => {
  Contact.find({})
    .then(persons => response.json(persons))
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(contact => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })
  contact.save()
    .then(() => {
      response.json(contact)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  Contact.findById(request.params.id)
    .then(contact => {
      if (!contact) {
        return response.status(404).end()
      }
      contact.name = name
      contact.number = number
      return contact.save().then((updatedContact) => {
        response.json(updatedContact)
      })
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})