import React from 'react'

const Total = ({ parts }) => {
  const totalExcercises = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <p>Number of exercises {totalExcercises}</p>
  )
}

export default Total