const express = require('express')
const morgan = require('morgan')
const app =express()
app.use(express.json())


morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
let person = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(request,response)=>{
  
    response.json(person)
})

app.get('/info',(request,response)=>{
    const count = person.length
    const date = new Date()

    response.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>`)

    })
app.get('/api/persons/:id',(request,response)=>{
    const id = request.params.id
    const newPersons = person.find((value) => value.id===id)
    if(newPersons){
        response.json(newPersons)
    }
    else{
    
        response.status(404).end()
    }
})
app.delete('/api/persons/:id',(request,response)=>{
  const id = request.params.id
  person = person.filter(value => value.id!==id)
  response.status(204).end()
})
app.post('/api/persons',(request,response)=>{
  const data =request.body
  const checker =()=>person.some(value=>value.name===data.name)

  if (!data.name || !data.number ){
     return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }
  else if(checker()){
   return response.status(400).json({ 
      error: 'name must be unique' 
    })

  }
  const generateId = () => String(Math.floor(Math.random() * 1000000))
  data.id = generateId()
  person =  person.concat(data)
  response.json(data)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})