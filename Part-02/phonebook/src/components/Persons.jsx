const Persons = ({ persons }) => (
  <ul>
    {persons.map((person, i) => (
      <li key={i}>{person.name}: {person.number}</li>
    ))}
  </ul>
)

export default Persons
