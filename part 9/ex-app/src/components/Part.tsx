import React from 'react'
import {assertNever} from './../helpers'
import {CoursePart} from './../App'

interface PartProps {
  part: CoursePart
}

const Part = (props: PartProps) => {
  const {part} = props;

  switch(part.type) {
    case 'normal':
      return (
        <div>
          <h3 key={part.name}>{part.name} {part.exerciseCount}</h3>
          <p>{part.description}</p>
        </div>
      )
    case 'groupProject':
      return (
        <div>
          <h3 key={part.name}>{part.name} {part.exerciseCount}</h3>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      )
    case 'submission':
      return (
        <div>
          <h3 key={part.name}>{part.name}  {part.exerciseCount}</h3>
          <p>{part.description}</p>
          <a>submit to{part.exerciseSubmissionLink}</a>
        </div>
      )
    case 'special':
      return (
        <div>
          <h3 key={part.name}>{part.name}  {part.exerciseCount}</h3>
          <p>{part.description}</p>
          <p>required skils {part.requirements.map((r: string) => r)}</p>
        </div>
      )
    default:
      return assertNever(part);
  }
}

export default Part
