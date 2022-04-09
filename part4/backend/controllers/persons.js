const personRouter = require('express').Router()
const Person = require('../models/person')

personRouter.get('/', (request, response) => {
    Person.find({})
    .then(persons => {
        response.json(persons)
    })
    .catch(error => next(error))
})

personRouter.get('/:id', (request, response, next) => {
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

personRouter.delete('/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            next(error)
        })
})

personRouter.post('/', (request, response, next) => {
    const body = request.body


    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
    .then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => {
        next(error)
    })
})

module.exports = personRouter