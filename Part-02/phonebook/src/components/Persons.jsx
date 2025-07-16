const Persons = ({ persons, handleDelete }) => (
  <div>
    {persons.map((person) => (
      <span key={person.id}>
        <p>{person.name}: {person.number} <button onClick={() => handleDelete(person.id, person.name)}>delete</button></p> 
      </span>
    ))}
  </div>
)

export default Persons
