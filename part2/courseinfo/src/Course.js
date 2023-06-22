
const Header = (props) => {
  return (<h2>{props.course.name}</h2>)
}

const Part = (props) => {
  
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
  
}

const Content = ({course}) => {
  return course.parts.map(p => <Part key={p.id} part={p.name} exercise={p.exercises}/>);
}

const Total = ({course}) => {
  return (
    <b>total of {course.parts.reduce((acc, p) => acc + p.exercises, 0)} exercises</b>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}


export default Course;