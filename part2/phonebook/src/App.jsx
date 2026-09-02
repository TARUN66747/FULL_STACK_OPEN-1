import { useState , useEffect} from 'react'
import personService from './services/person'
const Filterr = (props) =>{
  return (
  <div> filter shown with :<input value ={props.searchString} onChange={props.onChange}/></div>
)
}
const PersonForm = (props) =>{
  return(
    <form onSubmit={props.handleSubmit}>
        <div>
          name: <input   value = {props.newName} onChange={props.handleNameChange}/>
        </div>
        <div>number: <input value = {props.newNumber} onChange={props.handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
const PersonData =(props)=>{
  return (<>
    {((props.persons).filter(value => value.name.toLowerCase().includes((props.searchString).toLowerCase())).map(value=><p key ={value.id}> {value.name} {value.number}<button onClick={() => props.handleDeleteData(value.id,value.name)}>delete</button></p>) )}  
  </>)
}

const App = () => {
  const [persons, setPersons] = useState([
  
])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]= useState('')
  const [searchString,setSearchString]=useState('')
  const isDuplicate = (nama) => {
  return persons.some(person => person.name === nama)
}

  const handleSubmit = (event) =>{
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      // id : persons.length+1
    }
    
    
    if (isDuplicate(personObject.name)) {
  if (window.confirm(`${personObject.name} is already added to phone book, replace the old number with new one?`)) {
    const existingPerson = persons.find(p => p.name === personObject.name)
    const updatedPerson = { ...existingPerson, number: newNumber }

    personService
      .update(existingPerson.id, updatedPerson)
      .then(returnedPerson => {
        const updatedPersonsList = persons.map(p => {
          if (p.id === existingPerson.id) {
            return returnedPerson
          } else {
            return p
          }
        })

        setPersons(updatedPersonsList)
        setNewName('')
        setNewNumber('')
      })
  }
}
    else{
   personService
  .create(personObject)
  .then(returnedPerson => {
    setPersons(persons.concat(returnedPerson))
    console.log('addition completed')
    setNewName('')
    setNewNumber('')
  })
      }
    }
  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchStringChange = (event)=>{
    setSearchString(event.target.value)
  }
  const handleDeleteData=(id,name)=>{
    if(window.confirm(`Delete ${name}?`)){
    personService.deleteData(id)
    .then(() => {
      
       console.log("data deleted")
        setPersons(persons.filter(p => p.id !== id))
      })}
  }
  
  const hook = () =>{
    console.log("effect")
    personService.getAll()
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response)
    })
  }
  useEffect(hook,[])

  return (
    <div>
      <h2>Phonebook</h2>
       <Filterr searchString={searchString} onChange={handleSearchStringChange} />

      <h2> add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <PersonData persons={persons} searchString={searchString} handleDeleteData={handleDeleteData}/>
    </div>
  )
}
export default App