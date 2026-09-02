import { useState , useEffect} from 'react'
import axios from 'axios'
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
    {((props.persons).filter(value => value.name.toLowerCase().includes((props.searchString).toLowerCase())).map(value=><p key ={value.id}> {value.name} {value.number}</p>) )}  
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
    
    
    if (isDuplicate(personObject.name)){
      alert(`${newName} is already added to phonebook`)
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
      <PersonData persons={persons} searchString={searchString}/>
    </div>
  )
}

export default App