import Person from './Person'

const Display = ({persons, handleDelete}) => {
  return(
    <div>
      {persons.map(person =>
        <div key = {person.id}>
          <Person personName={person.name} personNumber={person.number} removing={() => handleDelete(person.id, person.name)}/>
        </div>
      )}
    </div>
  )
}

export default Display