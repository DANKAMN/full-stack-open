import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: '', type: '' })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => console.error(error))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook. Would you like to replace the number with a new one?`
      )

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            showNotification(`Updated ${returnedPerson.name}'s number`)
            
          })
          .catch(error => {
            alert(`Failed to update ${newName}. They may have been removed from the server.`)
            showNotification(`Information of ${newName} has already been removed from the server`, 'error')
            setPersons(persons.filter(p => p.id !== existingPerson.id))
            console.error('Error updating person:', error)
          })
      }

      return
    }

    const newPerson = { name: newName, number: newNumber }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${returnedPerson.name}`)
      })
      .catch(error => {
        console.log(error)
        showNotification(`Failed to add ${newName}`, 'error')
      })
 }


  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterChange = (e) => setFilter(e.target.value)

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          showNotification(`Deleted ${name}`)
        })
        .catch(error => {
          console.error('Error deleting:', error)
          showNotification(`The person '${name}' was already removed from server`, 'error')
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: '', type: '' })
    }, 5000)
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification.message} type={notification.type} />

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
