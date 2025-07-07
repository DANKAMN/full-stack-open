import React from 'react'

const Total = ({ exercises1, exercises2, exercises3 }) => {
  return (
    <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
  )
}

export default Total