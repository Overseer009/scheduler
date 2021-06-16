import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default function InterviewerList (props) {
  
  const { interviewers, value, onChange } = props;

  const parsedInterviewers = interviewers && interviewers.map(person => {
    return (<InterviewerListItem key={person.id}
      name={person.name}
      avatar={person.avatar}
      selected={person.id === value} 
      setInterviewer={() => onChange(person.id)}
    />);
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light"> Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
};