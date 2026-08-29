const Part=({perts})=>{
     return (
    
    <p> {perts.name}  {perts.exercises}</p>
    
  )
  }

  const Content = ({parts})=>{
    return(
      <div>
        {parts.map((value)=> <Part key={value.id}  perts={value} /> )}
      </div>
    )
  }
  const Header =({name})=>{ 
    return (
    <h1>{name}</h1>
          )
  }
  const Course =({course})=>{
    return (
      <>
      <Header name = {course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
       </>
    )
  }
const Total =({parts})=>{
  const sum = parts.reduce((acc, curr) =>  acc + curr['exercises'], 0);
  console.log(sum)
  return(
    <p>
    <b>
      total  of  {sum} exercises
    </b>
    </p>
  )
}

const App = () => {
  
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
      name: 'Redux',
      exercises: 11,
      id: 4
    }
    ]
  }

  return <Course course={course} />
}

export default App