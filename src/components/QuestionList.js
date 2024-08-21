import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
        // Optionally, display an error message to the user
      });
  }, []);

  function handleUpdateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map((question) =>
      question.id === updatedQuestion.id ? updatedQuestion : question
    );
    setQuestions(updatedQuestions);
  }

  function handleDeleteQuestion(deletedQuestion) {
    // Optimistic UI update
    const updatedQuestions = questions.filter(
      (question) => question.id !== deletedQuestion.id
    );
    setQuestions(updatedQuestions);

    fetch(`http://localhost:4000/questions/${deletedQuestion.id}`, {
      method: "DELETE",
    })
    .catch((error) => {
      console.error('Delete error:', error);
      // Optionally, revert the optimistic update if needed
    });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      {loading ? <p>Loading questions...</p> : (
        <ul>
          {questions.map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
              onUpdateQuestion={handleUpdateQuestion}
              onDeleteQuestion={handleDeleteQuestion}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default QuestionList;
