const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <h4>Total of {total} exercises</h4>
}

export default Total
