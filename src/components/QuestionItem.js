import React from "react";

function QuestionItem({ question, onUpdateQuestion, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleChangeCorrectAnswer(event) {
    const updatedQuestion = {
      ...question,
      correctIndex: parseInt(event.target.value),
    };

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: updatedQuestion.correctIndex }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((updatedQuestion) => onUpdateQuestion(updatedQuestion))
    .catch((error) => {
      console.error('Error:', error);
      // Optionally, you can display an error message to the user here
    });
  }

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this question?")) {
      fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      })
      .then(() => onDeleteQuestion(question))
      .catch((error) => {
        console.error('Error:', error);
        // Optionally, you can display an error message to the user here
      });
    }
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleChangeCorrectAnswer}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
