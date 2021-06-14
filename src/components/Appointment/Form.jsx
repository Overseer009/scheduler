import React, { useState } from "react" 
import Button from "../Button"
import InterviewerList from "../InterviewerList"

export default function Form (props) {
  const {onSave, onCancel, interviewers} = props

  const [name, setName] = useState(props.student || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  
  const cancel = () => {
    reset()
    onCancel()
  }

  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form  autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => setName(event.target.value)}
            /*
              This must be a controlled component
            */
          />
          <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
        </form>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()} >Cancel</Button>
          <Button confirm onClick={() => onSave(name, interviewer)}>Save</Button>
        </section>
      </section>
    </main>    
  )

}
