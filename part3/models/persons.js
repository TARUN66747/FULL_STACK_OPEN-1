require('dotenv').config()
const  mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

console.log('connecting to ',url)

mongoose.connect(url,{family:4})
.then(result => {
    console.log('connected to MongoDB')
})
.catch(error =>{
    console.log('error connecting to MongoDB:',error.message)
})

const bookSchema = new mongoose.Schema({
    name : String,
    number : String,
})

bookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Record = mongoose.model('Record',bookSchema)



module.exports = Record
