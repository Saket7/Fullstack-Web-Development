import React from 'react'
import Part from './Part'
import {CoursePart} from './../App'

// interface CoursePart {
//   name: string
//   exerciseCount: number
// }

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = ({courseParts}: ContentProps) => {
  return (
    <div>
      {courseParts.map(part => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  )
}

export default Content
