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
// app.get('/api/persons/:id',(request,response)=>{
//     const id = request.params.id
//     const newPersons = person.find((value) => value.id===id)
//     if(newPersons){
//         response.json(newPersons)
//     }
//     else{
    
//         response.status(404).end()
//     }
// })
// app.delete('/api/persons/:id',(request,response)=>{
//   const id = request.params.id
//   person = person.filter(value => value.id!==id)
//   response.status(204).end()
// })
// app.post('/api/persons',(request,response)=>{
//   const data =request.body
//   const checker =()=>person.some(value=>value.name===data.name)

//   if (!data.name || !data.number ){
//      return response.status(400).json({ 
//       error: 'name or number missing' 
//     })
//   }
//   else if(checker()){
//    return response.status(400).json({ 
//       error: 'name must be unique' 
//     })

//   }
//   const generateId = () => String(Math.floor(Math.random() * 1000000))
//   data.id = generateId()
//   person =  person.concat(data)
//   response.json(data)
// })

/*
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})*/ 
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})