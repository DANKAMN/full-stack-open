import Part from './Part'
import Total from './Total'

const CourseItem = ({ course }) => (
  <div>
    <h2>{course.name}</h2>
    {course.parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
    <Total parts={course.parts} />
  </div>
)

export default CourseItem
