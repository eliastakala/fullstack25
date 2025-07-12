const Add = ({action, nameValue, nameChange, numberValue, numberChange}) => {
  return (
    <form onSubmit={action}>
      <div>
        name: <input 
          value = {nameValue}
          onChange = {nameChange}
        />
      </div>
      <div>
        number: <input 
          value = {numberValue}
          onChange = {numberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default Add