import React from 'react'

const Course = ({ course }) => {
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
    </>
  )
}

export default Course