const Header = ({course}) => {
  return (
    <>
    <h1>{course.name}</h1>
    </>
  )
}

const Part = ({part}) => {
  return (
    <>
    <p>{part.name} {part.exercises}</p>
    </>
  )
}

const Content = ({course}) => {

  return (
    <div>
      {course.parts.map(part =>
        <Part key = {part.id} part = {part} />
        )}
    </div>
  )
}

const Total = ({course}) => {
  const sum = course.parts.reduce((partialSum, a) => partialSum + a.exercises, 0);
  return (
    <div>
      <b>total of {sum} exercises</b>
    </div>
  )
}

const Course = ({courses}) => {
  return (
    <div>
      {courses.map(course =>
      <div key = {course.id}>
        <Header course = {course}/>
        <Content course = {course}/>
        <Total course = {course}/>
      </div>
      )}
    </div>
  )
}

export default Course