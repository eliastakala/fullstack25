require('dotenv').config()
const express = require('express')
const Contact = require('./models/contact')

const app = express()

const errorHandler = (error, request, response, next) => {
  console.log('Error: ', error.message)
  if (error === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

app.use(express.json())
app.use(express.static('dist'))

const morgan = require('morgan')
morgan.token('content', function (req, res) { return  JSON.stringify(req.body)});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content', {
    skip: function(req, res) { return req.method !== "POST" }
}))
app.use(morgan('tiny', {
    skip: function(req, res) { return req.method === "POST" }
}))

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date().toString()}</p>`
)
})

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Contact.find({}).then(persons => {
      response.json(persons)
    })
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

app.delete('/api/persons/:id', (request, response) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({ 
            error: 'name missing' 
        })
    }

    if (!body.number) {
        return response.status(400).json({ 
            error: 'number missing' 
        })
    }

    const contact = new Contact({
            name: body.name,
            number: body.number,
            // id: generateId()
        })
        contact.save().then(result => {
            console.log(`added ${body.name} number ${body.number} to phonebook`)
            response.json(result)
        })
      }
)

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