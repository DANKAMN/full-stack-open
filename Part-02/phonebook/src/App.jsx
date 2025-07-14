import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [newName, setNewName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const newPerson = { name: newName}
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {
          persons.map((person, i) => (
            <li key={i}>{person.name}</li>
          ))
        }
      </ul>
    </div>
  )

}

export default App