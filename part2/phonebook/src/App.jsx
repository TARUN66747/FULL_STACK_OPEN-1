import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number :'39-44-5323523'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]= useState('')
  const isDuplicate = (nama) => {
  return persons.some(person => person.name === nama)
}

  const handleSubmit = (event) =>{
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (isDuplicate(personObject.name)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input   value = {newName} onChange={handleNameChange}/>
        </div>
        <div>number: <input value = {newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(value => <p key={value.name}>{value.name} {value.number}</p>)}
    </div>
  )
}

export default App