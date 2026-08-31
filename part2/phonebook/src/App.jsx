import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const isDuplicate = (nama) => {
  return persons.some(person => person.name === nama)
}

  const handleSubmit = (event) =>{
    event.preventDefault()
    const personObject = {
      name: newName
    }
    if (isDuplicate(personObject.name)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
    setPersons(persons.concat(personObject))
    setNewName('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    }
  
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input   value = {newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(value => <p key={value.name}>{value.name} </p>)}
    </div>
  )
}

export default App