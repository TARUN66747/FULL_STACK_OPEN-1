const Part=({perts})=>{
     return (
    
    <li> {perts.name}  {perts.exercises}</li>
    
  )
  }

  const Content = ({parts})=>{
    return(
      <ul>
        {parts.map((value)=> <Part key={value.id}  perts={value} /> )}
      </ul>
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
       </>
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
      }
    ]
  }

  return <Course course={course} />
}

export default App