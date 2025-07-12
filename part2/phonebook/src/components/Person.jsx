const Person = ({personName, personNumber, removing}) => {
    return (
        <div>
            {personName + " "}
            {personNumber + " "}
            <button onClick={removing}>Delete</button>
        </div>
    )
}

export default Person