import React from 'react'
import Part from './Part'

const Content = ({ part1, part2, part3 }) => {
  return (
    <div>
        <Part part={part1} />
        <Part part={part2} />
        <Part part={part3} />
    </div>
  )
}

export default Content