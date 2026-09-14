const mongoose = require('mongoose') 
if(process.argv.length < 3){
    console.log('give password as a argument')
    process.exit(1)
}

const password =process.argv[2]


const url = `mongodb+srv://tarunsingh0168_db_user:${password}@cluster0.32krdu1.mongodb.net/phonebookApp?appName=Cluster0`


mongoose.set('strictQuery',false)

mongoose.connect(url,{family :4})

const bookSchema = new mongoose.Schema({
    name : String,
    number : String,
})

const Record = mongoose.model('Record',bookSchema)

if(process.argv.length ===3){
    Record.find({}).then(result=>{
        console.log('phonebook:')
        result.forEach(person=>{
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })

}else if(process.argv.length >=5){

const name = process.argv[3]
const numbers = process.argv[4]

  const data  = new Record({
    name : name,
    number : numbers,
}
)
data.save().then(result => {
  console.log(`added ${name} number ${numbers} to phonebook`)
  mongoose.connection.close()
})

}
 else {
  console.log('please provide both name and number as arguments')
  mongoose.connection.close()
}
