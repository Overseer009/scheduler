import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form (props) {
  const {onSave, onCancel, interviewers} = props;

  const [error, setError] = useState("");
  const [name, setName] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  
  //Used on cancel & reset, if fields are filled, but user decides to cancel, it clears said fields
  const cancel = () => {
    reset();
    onCancel();
  };

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  // Used on save, if either of the fields are empty, returns Error
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Please select an Interviewer");
      return;
    }
  
    setError("");
    onSave(name, interviewer);
  };

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
            data-testid="student-name-input"  
          />
          <section className="appointment__validation">{error}</section>
          <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
        </form>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>    
  )
};
