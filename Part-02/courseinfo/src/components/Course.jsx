import React from 'react'

const Course = ({ course }) => {
  let totalExcercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <>
        <h1>{course.name}</h1>
        <div>
            {
                course["parts"].map((part) => (
                    <p key={part.id}>
                        {part.name}
                    </p>
                ))
            }
        </div>
        <h4>Total of {totalExcercises} exercises</h4>
    </>
  )
}

export default Course