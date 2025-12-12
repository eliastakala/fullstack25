const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.9zi8qr3.mongodb.net/?appName=Cluster0`

const name = process.argv[3]

const number = process.argv[4]

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 3) {
  Contact.find({}).then(result => {
    result.forEach(contact => {
        console.log(contact.name, contact.number)
    })
    mongoose.connection.close()
    process.exit(1)
})

} else {
    const contact = new Contact({
        name: name,
        number: number,
    })
    contact.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}
