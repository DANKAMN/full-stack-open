import CourseItem from './CourseItem'

const Course = ({ courses }) => (
  <div>
    <h1>Web development curriculum</h1>
    {courses.map(course => (
      <CourseItem key={course.id} course={course} />
    ))}
  </div>
)

export default Course
