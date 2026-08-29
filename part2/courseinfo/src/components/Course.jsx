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
 const Course =({course})=>{
    return (
      <>
      <Header name = {course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
       </>
    )
  }


export default Course