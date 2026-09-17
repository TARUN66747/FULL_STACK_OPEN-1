require('dotenv').config()
const Record = require('./models/persons')
const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.static('dist'))
app.use(express.json())


morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons',(request,response)=>{
  
    Record.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info',(request,response)=>{
    
    Record.find({}).then(record=>record.length)
    .then(count =>{
      const date = new Date()

    response.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>`)
    })

    })
app.get('/api/persons/:id',(request,response)=>{
    const id = request.params.id
    Record.find({}).then(data => data.find(person =>person.id === id)).then(
      (newPerson)=>{
        if(newPerson){
        response.json(newPerson)
    }
    else{
    
        response.status(404).end()
    }
    })
    // Record.find((value) => value.id===id).then(newPersons =>{
    //   if(newPersons){
    //     response.json(newPersons)
    // }
    // else{
    
    //     response.status(404).end()
    // }
    // })
    
})

app.delete('/api/persons/:id',(request,response,next)=>{
  const id = request.params.id
  Record.findByIdAndDelete(id)
  .then(result => {
    if(result){
      response.status(204).end()
    }
    else{
      response.status(404).json({error:'person not found'})
    }
    
  })
  .catch(error => next(error))
})

app.post('/api/persons',(request,response,next)=>{
  const data =request.body
  
  if (!data.name || !data.number ){
     return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }
  Record.find({name:data.name})
  .then(existingPersons => {
    if(existingPersons.length > 0){
      return response.status(400).json({
        error : 'name must be unique'
      })
    }
    const person = new Record({
    name :data.name,
    number : data.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
  })
  
  .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}


app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})